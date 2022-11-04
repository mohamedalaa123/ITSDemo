using AutoMapper;
using ITSDemo.Base;
using ITSDemo.Controllers;
using ITSDemo.Dtos;
using ITSDemo.Enums;
using ITSDemo.Models;
using ITSDemo.Repository;
using ITSDemo.Request;
using ITSDemo.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ITSDemo.Services
{
    public class CustomerService : ICustomerService
    {
        private IRepository<Customer> CustomerRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CustomerService> _logger;

        public CustomerService(
            ILogger<CustomerService> logger,
            IRepository<Customer> _CustomerRepository,
            IMapper mapper
            )
        {
            CustomerRepository = _CustomerRepository;
            _mapper = mapper;
            _logger = logger;

        }

        public async Task<GenericResponse<CustomerViwModel>> AddCustomer(NewCustomerRequest request)
        {
            GenericResponse<CustomerViwModel> response = new GenericResponse<CustomerViwModel>();

            Customer? data = _mapper.Map<Customer>(request.Data);
            try
            {
                var result = CustomerRepository.Create(data);
                CustomerRepository.save();
                var MappedData = _mapper.Map<CustomerViwModel>(result);

                response.Data = MappedData;
                response.StatusCode = (int)BusinessCodes.Successfully;
                response.StatusMessage = BusinessCodes.Successfully.ToString();
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                _logger.LogError(ex, "GetAll");
            }
            return await Task.FromResult(response);
        }

        public async Task<GenericResponse<List<CustomerViwModel>>> GetAll(string SortBy, string SortDir)
        {
            GenericResponse<List<CustomerViwModel>> response = new GenericResponse<List<CustomerViwModel>>();

            var result = CustomerRepository.FindAll();
            try
            {
                switch (SortBy)
                {
                    case "ID":
                        result = (SortDir == "ASC") ? result.OrderBy(a => a.Id) : result.OrderByDescending(a => a.Id);
                        break;

                    case "Name":
                        result = (SortDir == "ASC") ? result.OrderBy(a => a.Name) : result.OrderByDescending(a => a.Name);
                        break;

                    case "Class":
                        result = (SortDir == "ASC") ? result.OrderBy(a => a.Class) : result.OrderByDescending(a => a.Class);
                        break;
                    case "Phone":
                        result = (SortDir == "ASC") ? result.OrderBy(a => a.Phone) : result.OrderByDescending(a => a.Phone);
                        break;

                    case "Email":
                        result = (SortDir == "ASC") ? result.OrderBy(a => a.Email) : result.OrderByDescending(a => a.Email);
                        break;
                    case "Comment":
                        result = (SortDir == "ASC") ? result.OrderBy(a => a.Comment) : result.OrderByDescending(a => a.Comment);
                        break;
                }


                var data = _mapper.Map<List<CustomerViwModel>>(result.ToList());

                response.Data = data;
                response.StatusCode = (int)BusinessCodes.Successfully;
                response.StatusMessage = BusinessCodes.Successfully.ToString();

            }
            catch (Exception ex)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                _logger.LogError(ex, "GetAll");
            }
            return await Task.FromResult(response);
        }

        public async Task<GenericResponse<CustomerViwModel>> GetCustomer(int Id)
        {
            GenericResponse<CustomerViwModel> response = new GenericResponse<CustomerViwModel>();

            var result = CustomerRepository.FindByCondition(a => a.Id == Id).FirstOrDefault();
            if (result == null)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                return response;

            }

            try
            {
                var data = _mapper.Map<CustomerViwModel>(result);
                response.Data = data;
                response.StatusCode = (int)BusinessCodes.Successfully;
                response.StatusMessage = BusinessCodes.Successfully.ToString();

            }
            catch (Exception ex)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                _logger.LogError(ex, "GetCustomer");
            }
            return response;

        }

        public async Task<GenericResponse<CustomerViwModel>> UpdateCustomer(UpdateCustomerRequest customer)
        {
            GenericResponse<CustomerViwModel> response = new GenericResponse<CustomerViwModel>();

            Customer? result = CustomerRepository.FindByCondition(a => a.Id == customer.Data.Id).FirstOrDefault();
            if (result == null)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                return response;

            }

            try
            {
                result = _mapper.Map<Customer>(customer.Data);
                CustomerRepository.Update(result);


                var data = _mapper.Map<CustomerViwModel>(result);
                response.Data = data;
                response.StatusCode = (int)BusinessCodes.Successfully;
                response.StatusMessage = BusinessCodes.Successfully.ToString();

            }
            catch (Exception ex)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                _logger.LogError(ex, "GetAll");
            }
            return response;
        }

        public async Task<BaseResponse> DeleteCustomer(int Id)
        {
            BaseResponse response = new BaseResponse();

            Customer? result = CustomerRepository.FindByCondition(a => a.Id == Id).FirstOrDefault();
            if (result == null)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                return response;

            }

            try
            {
                CustomerRepository.Delete(result);

                response.StatusCode = (int)BusinessCodes.Successfully;
                response.StatusMessage = BusinessCodes.Successfully.ToString();
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)BusinessCodes.Failed;
                response.StatusMessage = BusinessCodes.Failed.ToString();
                _logger.LogError(ex, "DeleteCustomer");
            }
            return response;
        }
    }
}
