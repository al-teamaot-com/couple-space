// Create a new file: types.ts
export interface CreateQuestionRequest {
    content: string;
  }
  
  export interface ErrorResponse {
    error: string;
  }
  
  export interface SuccessResponse<T> {
    data: T;
  }