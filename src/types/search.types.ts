/** Any string — built-in values are 'all' | 'account' | 'customer' | 'transaction' */
export type SearchCategory = string;

export interface SearchCategory_Option {
  value: string;
  label: string;
}

export interface SearchResult {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle?: string;
  meta?: string;
  [key: string]: any;        // Makes it flexible as required
}

export interface SearchEventDetail {
  query: string;
  category: SearchCategory;
}
