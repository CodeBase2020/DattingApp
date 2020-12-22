using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  
    public class UsersController : BaseApiController
    {
        private readonly DataContext _config;
        public UsersController(DataContext config)
        {
            _config = config;
        }

      
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await _config.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
           return await _config.Users.FindAsync(id);
        }

    }
}