
export class HttpError extends Error {
  public readonly statusCode: number;
  public override readonly message: string;
  public readonly response?: any;
  public readonly errorCode?: string | number;

  constructor(
    statusCode: number,
    message: string,
    response?: any,
    errorCode?: string | number
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.response = response;
    this.errorCode = errorCode;
    this.name = 'HttpError';
  }
}
