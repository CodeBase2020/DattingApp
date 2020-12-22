using API.Entities;
using API.Interface;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(User user)
        {
            var claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };

            var credential = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
              
              var jwtDecorator = new SecurityTokenDescriptor() {
                  Subject = new ClaimsIdentity(claims),
                  Expires = DateTime.Now.AddDays(7),
                  SigningCredentials = credential
              };

            var tokentHandler = new JwtSecurityTokenHandler();
            
            var token = tokentHandler.CreateToken(jwtDecorator);
            
             return tokentHandler.WriteToken(token);
         
            
        }
    }
}