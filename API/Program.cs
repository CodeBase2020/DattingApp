using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();

            try
            {
                var services = scope.ServiceProvider;
                using var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
                await seed.SeedUserDetails(context);

            }
            catch (System.Exception ex)
            {

                ILogger logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, ex.Message);

            }

            host.Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
