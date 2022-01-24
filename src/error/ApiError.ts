class ApiError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super();
    this.code = code;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static unauthorized(message: string) {
    return new ApiError(401, message)
  }

}

export default ApiError;
