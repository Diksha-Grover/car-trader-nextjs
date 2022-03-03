import { openDB } from '../openDB';

export interface Make {
  make: string;
  count: number;
}

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all<Make[]>(
    'SELECT make, count(*) AS count FROM Car GROUP BY make',
    // so here we are counting the numbers of cars we have inside make
    // make is the brand of car
  );

  return makes;
}
