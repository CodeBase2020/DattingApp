using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.Interface;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _token;
        public AccountController(DataContext context, ITokenService token)
        {
            _token = token;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<TokenDTO>> RegisterUser(RegisterDTO register)
        {
            using var hmac = new HMACSHA512();

            if (await CheckUserName(register.Username))
                return BadRequest("The username already exists");

            var user = new User
            {
                UserName = register.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new TokenDTO()
              {
                UserName = user.UserName,
                Token = _token.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenDTO>> UserLogin(LoginDTO login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == login.UserName.ToLower());

            if (user == null) return Unauthorized("UserName is Invalid");


            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid User");
                }
            }

            return new TokenDTO()
            {
                UserName = user.UserName,
                Token = _token.CreateToken(user)

            };

        }

        private async Task<bool> CheckUserName(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}