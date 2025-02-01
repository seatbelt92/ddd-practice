import { constants } from "http2";
import { BaseError } from "../common/base.error";

export class CircleCapacityExceededError extends BaseError {
    constructor() {
        super(constants.HTTP_STATUS_CONFLICT, "CIRCLE_CAPACITY_EXCEEDED");
    }
}
