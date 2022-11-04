using ITSDemo.Base;
using ITSDemo.Request;
using ITSDemo.ViewModels;

namespace ITSDemo.Services
{
    public interface ICustomerService
    {
        Task<GenericResponse<List<CustomerViwModel>>> GetAll(string SortBy, string SortDir);

        Task<GenericResponse<CustomerViwModel>> AddCustomer(NewCustomerRequest request);
        Task<GenericResponse<CustomerViwModel>> GetCustomer(int Id);
        Task<BaseResponse> DeleteCustomer(int Id);


        Task<GenericResponse<CustomerViwModel>> UpdateCustomer(UpdateCustomerRequest request);

    }
}
