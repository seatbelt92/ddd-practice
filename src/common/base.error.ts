import { constants } from "http2";

export abstract class BaseError extends Error {
    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    readonly statusCode: number;
    readonly message: string;
}

export class ResourceNotFoundError extends BaseError {
    constructor() {
        super(constants.HTTP_STATUS_NOT_FOUND, "NOT_FOUND");
    }
}

export class InvalidRequestError extends BaseError {
    constructor() {
        super(constants.HTTP_STATUS_BAD_REQUEST, "INVALID_REQUEST");
    }
}

export class AlreadyExistError extends BaseError {
    constructor() {
        super(constants.HTTP_STATUS_CONFLICT, "ALREADY_EXIST");
    }
}

export class UnknownError extends BaseError {
    constructor() {
        super(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "UNKNOWN_ERROR");
    }
}
