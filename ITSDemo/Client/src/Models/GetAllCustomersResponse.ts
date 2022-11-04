import BaseResponse from "../Base/BaseResponse";
import Customer from "./Customer";

export default interface GetAllCustomersResponse extends BaseResponse {

    Data: Array<Customer>

}