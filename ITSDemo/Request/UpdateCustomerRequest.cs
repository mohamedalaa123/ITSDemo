using ITSDemo.Dtos;

namespace ITSDemo.Request
{
    public class UpdateCustomerRequest
    {
        public CustomerDto Data { get; set; } = new CustomerDto();
    }
}
