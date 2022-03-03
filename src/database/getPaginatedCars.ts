import { ParsedUrlQuery } from 'querystring';
// querystring module provides utilities for parsing and formatting URL query strings
import { openDB } from '../openDB';
import { CarModel } from '../../api/Car';
import { getAsString } from '../getAsString';

const mainQuery = `
FROM Car
WHERE (@make IS NULL OR @make = make)
AND (@model IS NULL OR @model = model)
AND (@minPrice IS NULL OR @minPrice <= price)
AND (@maxPrice IS NULL OR @maxPrice >= price)
`;

function getValueStr(value: string | string[]) {
// String[] means String type array 
// so here value can be string or string type array
  const str = getAsString(value);

  return !str || str.toLowerCase() === 'all' ? null : str;
  // if str is not defined or str.toLowerCase() === 'all' then say it's null or str
}

function getValueNumber(value: string | string[]) {
  const str = getValueStr(value);
  const number = parseInt(str);

  return isNaN(number) ? null : number;
  // isNaN() function determines whether a value is NaN or not. NaN means not a number.
}

export async function getPaginatedCars(query: ParsedUrlQuery) {
  const db = await openDB();
  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  // here 4 means 4 cars per page
  const offset = (page - 1) * rowsPerPage;
  // suppose we are on page no 3 then 3-1=2, 2*4=8 so we are starting with car no 9 , 10 , 11 , 12 on page no 3.

  const dbParams = {
    // these are sql parameters
    '@make': getValueStr(query.make),
    '@model': getValueStr(query.model),
    '@minPrice': getValueNumber(query.minPrice),
    '@maxPrice': getValueNumber(query.maxPrice),
  };

  const carsPromise = db.all<CarModel[]>(
    ` SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset `,
    {
      ...dbParams,
      '@rowsPerPage': rowsPerPage,
      '@offset': offset,
    },
  );

  const totalRowsPromise = db.get<{ count: number }>(
    ` SELECT COUNT(*) as count ${mainQuery} `,
    dbParams,
  );

  const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);
  // Promise. all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array
  // basically we are running cars and totalRows together rather then running cars and waiting till it completes 
  // const cars = await;
  // const totalRows = await totalRowsPromise(cars); 

  return {
    cars,
    totalPages: Math.ceil(totalRows.count / rowsPerPage),
    // for example: we have rowsperpage (means cars per page) = 4, totalRows.count(means basically 6 cars satisfy the condition)= 6(6 rows satisfy the condition) , then totalPages = 6/4 = 1.5 but totalPages should not be 1.5 it should be 2 that is why we used Math.ceil    
  };
}
