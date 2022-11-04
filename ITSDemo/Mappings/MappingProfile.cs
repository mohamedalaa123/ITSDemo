using AutoMapper;
using ITSDemo.Dtos;
using ITSDemo.Models;
using ITSDemo.ViewModels;

namespace ITSDemo.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerDto, Customer>();
            CreateMap<Customer, CustomerViwModel>();
            CreateMap<List<CustomerViwModel>, Customer>();
            CreateMap<Customer, CustomerDto>();

        }
    }
}
