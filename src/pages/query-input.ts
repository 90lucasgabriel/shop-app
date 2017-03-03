export interface QueryInput {
  page     : number;
  perPage?  : number;
  include?  : string
  dateFrom? : string;
  dateTo?   : string;
  isRead?   : string;
}