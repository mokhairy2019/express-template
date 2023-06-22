export default class ApiError extends Error {
  statusCode;
  isOperational;
  userMessage;
  constructor(
    statusCode: number,
    userMessage: string, //messages array that can be shown to the end user
    devMessage: string, //message to be shown to the developer
    isOperational = true,
    stack = ""
  ) {
    super(devMessage);
    Object.setPrototypeOf(this, ApiError.prototype); // <------- to fix a bug in typescript https://stackoverflow.com/questions/51229574/why-instanceof-returns-false-for-a-child-object-in-javascript
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.userMessage = userMessage; //array of messages that can be shown to the end user
    if (stack) {
      this.stack = stack; // used in case of turning native Error into ApiError. the stack of the native error is passed to the ApiError constructor.
    } else {
      Error.captureStackTrace(this, this.constructor); //capture the stacktrace then remove the constructor from it
    }
  }
}
