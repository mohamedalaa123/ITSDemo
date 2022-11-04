import BaseResponse from "../Base/BaseResponse";
import Customer from "./Customer";

export default interface CustomerResponse extends BaseResponse {

    Data: Customer

}