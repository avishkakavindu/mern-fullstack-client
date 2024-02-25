export interface IErrorResponse {
  message: string;
  userMessage?: string;
  context: {
    [key: string]: any;
  };
}

export interface IAPIErrorResponse {
  response: {
    data: IErrorResponse;
  };
  message: string;
}
