class ApiError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super();
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message)
  }

}

export default ApiError;
