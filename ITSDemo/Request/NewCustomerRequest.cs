using ITSDemo.Dtos;

namespace ITSDemo.Request
{
    public class NewCustomerRequest
    {
        public CustomerDto Data { get; set; } = new CustomerDto();
    }
}
