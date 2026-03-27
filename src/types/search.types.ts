export type SearchCategory = 'all' | 'account' | 'customer' | 'transaction';

export interface SearchResult {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  meta?: string;
}

export interface SearchEventDetail {
  query: string;
  category: SearchCategory;
}
