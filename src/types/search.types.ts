/** Any string — built-in values are 'all' | 'account' | 'customer' | 'transaction' */
export type SearchCategory = string;

export interface SearchCategory_Option {
  value: string;
  label: string;
  /** Optional emoji/icon shown next to results of this category */
  icon?: string;
}

export interface SearchResult {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle?: string;
  meta?: string;
}

export interface SearchEventDetail {
  query: string;
  category: SearchCategory;
}
