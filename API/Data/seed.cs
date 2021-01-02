using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class seed
    {
        
        public static async Task SeedUserDetails(DataContext context)
        {
             
             if(await context.Users.AnyAsync()) return;

            var userDetails = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
             
             IEnumerable<User> users = System.Text.Json.JsonSerializer.Deserialize<IEnumerable<User>>(userDetails);

             using var hmac = new HMACSHA512();

             foreach(User user in users)
             {
                 user.UserName = user.UserName.ToLower();
                 user.PasswordHash =  hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                 user.PasswordSalt = hmac.Key;
                  
                  context.Users.Add(user);
             }

             await context.SaveChangesAsync();

        }

    }
}