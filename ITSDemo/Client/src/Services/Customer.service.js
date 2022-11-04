import http from "../http-common";
var CustomerDataService = /** @class */ (function () {
    function CustomerDataService() {
    }
    CustomerDataService.prototype.GetCustomers = function (SortBy, SortDir) {
        if (SortBy === void 0) { SortBy = null; }
        if (SortDir === void 0) { SortDir = null; }
        return http.post("/GetCustomers?SortBy=" + SortBy + "&SortDir=" + SortDir);
    };
    CustomerDataService.prototype.AddCustomer = function (request) {
        return http.post("/Create", request);
    };
    CustomerDataService.prototype.GetCustomerId = function (Id) {
        return http.get("/Details?Id=" + Id);
    };
    CustomerDataService.prototype.UpdateCustomer = function (request) {
        return http.post("/Edit", request);
    };
    CustomerDataService.prototype.DeleteCustomerById = function (Id) {
        return http.get("/Delete?Id=" + Id);
    };
    return CustomerDataService;
}());
export default new CustomerDataService();
