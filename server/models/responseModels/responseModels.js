export class BaseResponse {
  constructor(status) {
    this.status = status;
  }
}

export class Response extends BaseResponse {
  constructor(status, response) {
    super(status);
    this.response = response;
  }
}

export class ResponseX extends BaseResponse {
  constructor(status, message) {
    super(status);
    this.response = { message };
  }
}