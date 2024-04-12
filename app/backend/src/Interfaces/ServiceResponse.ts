export type ServiceMessage = { message:string };
type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND' | 'CONFLICT' | 'UNAUTHORIZED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage,
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESS',
  data: T,
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
