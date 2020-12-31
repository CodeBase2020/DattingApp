using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Errors.Middleware
{
    public class ApiExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ApiExceptionMiddleware> _logger;
        private readonly IHostEnvironment _envi;
        public ApiExceptionMiddleware(RequestDelegate next, ILogger<ApiExceptionMiddleware> logger, IHostEnvironment envi)
        {
            _envi = envi;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                await HandleExceptionAsyn(context, ex,_envi);
            }
        }
  

        public static Task HandleExceptionAsyn(HttpContext context, Exception ex
        , IHostEnvironment env)
        {
            
            context.Response.ContentType = "appication/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var result = env.IsDevelopment() ?
                         new ApiExceptions() { StatusCode = (int)HttpStatusCode.InternalServerError,
                          Message = ex.Message, Details = ex.StackTrace?.ToString()  } :
                          new ApiExceptions() { StatusCode = (int)HttpStatusCode.InternalServerError, Message =  "internal Server Error" };

            var jsonResult = JsonSerializer.Serialize(
             result,new JsonSerializerOptions() {  PropertyNamingPolicy = JsonNamingPolicy.CamelCase  }

            );

            return context.Response.WriteAsync(jsonResult);
        }
    }
}