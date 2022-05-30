export type ApiResponseModel<T> = {
  data: T;
  message: string;
  success: boolean;
};
