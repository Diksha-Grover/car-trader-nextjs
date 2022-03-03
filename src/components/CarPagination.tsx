import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
// querystring module provides utilities for parsing and formatting URL query strings
import { forwardRef } from 'react';
// forwardRef in React gives the child component a reference to a DOM element created by its parent component
import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from '@material-ui/lab';
import { useRouter } from 'next/router';
import { getAsString } from '../getAsString';

export function CarPagination({ totalPages }: { totalPages: number }) {
  const { query } = useRouter();
  // useRoute is a hook which gives access to route object.

  return (
    <Pagination
      color="primary"
      page={parseInt(getAsString(query.page) || '1')}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}

export interface MaterialUiLinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

export const MaterialUiLink = forwardRef<
  HTMLAnchorElement,
  MaterialUiLinkProps
>(({ query, item, ...props }, ref) => (
  <Link
    href={{
      pathname: '/cars',
      query: { ...query, page: item.page },
    }}
    shallow
    // shallow routing allows you to change the URL without running data fetching methods again, that includes getServerSideProps , getStaticProps etc
  >
    <a ref={ref} {...props}></a>
  </Link>
));
// Pagination page prop starts at 1 to match the requirement of including the value in the URL, while the TablePagination page prop starts at 0 