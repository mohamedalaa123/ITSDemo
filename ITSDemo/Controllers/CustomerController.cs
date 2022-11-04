using ITSDemo.Base;
using ITSDemo.Dtos;
using ITSDemo.Enums;
using ITSDemo.Models;
using ITSDemo.Request;
using ITSDemo.Services;
using ITSDemo.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;

namespace ITSDemo.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;
        private ICustomerService customerService;
        public CustomerController(
            ILogger<CustomerController> logger,
            ICustomerService _customerService
            )
        {
            _logger = logger;
            customerService = _customerService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> GetCustomers(string SortBy, string SortDir)
        {
            var result = await customerService.GetAll(SortBy, SortDir);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewCustomerRequest request)
        {
            GenericResponse<CustomerViwModel> result = new GenericResponse<CustomerViwModel>();

            if (!ModelState.IsValid)
            {
                result.StatusCode = (int)BusinessCodes.Failed;
                result.StatusMessage = BusinessCodes.Failed.ToString();
                return Json(result);
            }
            result = await customerService.AddCustomer(request);
            return Json(result);
        }


        [HttpGet]
        public async Task<IActionResult> Details([FromQuery] int Id)
        {
            var result = await customerService.GetCustomer(Id);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] UpdateCustomerRequest request)
        {
            GenericResponse<CustomerViwModel> result = new GenericResponse<CustomerViwModel>();

            if (!ModelState.IsValid)
            {
                result.StatusCode = (int)BusinessCodes.Failed;
                result.StatusMessage = BusinessCodes.Failed.ToString();
                return Json(result);
            }

            result = await customerService.UpdateCustomer(request);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> Delete([FromQuery] int Id)
        {
            BaseResponse result = await customerService.DeleteCustomer(Id);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}