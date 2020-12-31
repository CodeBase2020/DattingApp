using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class buggyController : BaseApiController
    {
        private readonly DataContext _context;
        public buggyController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("server-error")]
        [AllowAnonymous]
        public ActionResult<string> GetSeverError()
        {
            var users = _context.Users.Find(-1);

            var result = users.ToString();

            return result;
        }

        [HttpGet("NotFound")]
        [AllowAnonymous]
        public ActionResult<User> GetNotFound()
        {
            var user = _context.Users.Find(-1);
            if(user == null) return NotFound();

            return user;
        }

    }
}