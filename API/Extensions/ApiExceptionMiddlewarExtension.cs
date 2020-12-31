using API.Errors.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApiExceptionMiddlewarExtension
    {       
        public static void AddApiExceptionMiddleware(this IApplicationBuilder app) 
        {
            app.UseMiddleware<ApiExceptionMiddleware>();
        }

    }
}