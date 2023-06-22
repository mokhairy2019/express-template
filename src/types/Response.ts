export default interface IResponse {
  success: boolean;
  message?: string; // message to be displayed to the user (used mostly in case of error)
  data?: any;
  devMessage?: string; // error message in case of error (only sent if NODE_ENV is development)
  stack?: string; // error stack in case of error (only sent if NODE_ENV is development)
  metaData?: any; // used send data like pagination (page number , total pages, total items per page, etc)
}
