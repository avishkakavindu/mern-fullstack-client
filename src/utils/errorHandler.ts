import { toast } from 'react-toastify';

import { IAPIErrorResponse, IErrorResponse } from '../types/error.interface';

/**
 * Type guard function to check if the error is of ErrorResponse type
 */
function isAPIErrorResponse(error: unknown): error is IAPIErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    Object.prototype.hasOwnProperty.call(error, 'response') &&
    typeof (error as IAPIErrorResponse).response === 'object' &&
    (error as IAPIErrorResponse).response !== null &&
    Object.prototype.hasOwnProperty.call((error as IAPIErrorResponse).response, 'data')
  );
}

/**
 * Handles API errors uniformly across the application.
 * If the error is of a known error response type, it is shown.
 * Otherwise, an unknown error message is logged.
 * @param error The error object to handle.
 * @returns void
 */
export function handleApiError(error: unknown): void {
  if (isAPIErrorResponse(error)) {
    const err = error as IAPIErrorResponse;
    if (err.response.data) {
      const errorResponse: IErrorResponse = err.response.data;
      console.error('API Error:', errorResponse.message);
      if (errorResponse.userMessage && errorResponse.userMessage.trim() !== '') {
        toast.error(errorResponse.userMessage);
      }
    }
  } else {
    console.error('Error::', error);
    toast.error('An unexpected error occurred. Please try again later.');
  }
}
