import BaseResponse from "../Base/BaseResponse";
import http from "../http-common";
import Customer from "../Models/Customer";
import CustomerRequest from "../Models/CustomerRequest";
import CustomerResponse from "../Models/CustomerResponse";
import GetAllCustomersResponse from "../Models/GetAllCustomersResponse";

class CustomerDataService {

    GetCustomers(SortBy: string = null, SortDir: string = null) {
        return http.post<GetAllCustomersResponse>(`/GetCustomers?SortBy=${SortBy}&SortDir=${SortDir}`);
    }

    AddCustomer(request: CustomerRequest) {
        return http.post<CustomerResponse>(`/Create`, request);
    }

    GetCustomerId(Id: number) {
        return http.get<CustomerResponse>(`/Details?Id=${Id}`);
    }

    UpdateCustomer(request: CustomerRequest) {
        return http.post<CustomerResponse>(`/Edit`, request);
    }


    DeleteCustomerById(Id: number) {
        return http.get<BaseResponse>(`/Delete?Id=${Id}`);
    }

}

export default new CustomerDataService();