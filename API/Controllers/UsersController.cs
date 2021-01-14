using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

 [Authorize]
    public class UsersController : BaseApiController
    {
                private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            return Ok(await _userRepository.GetUserById(id));
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<User>> Get(string userName)
        {
           return Ok(await _userRepository.GetMemeberAsync(userName));
        }

        [HttpPost("Save")]
        public async Task<ActionResult<int>> Save(UserDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);

            return Ok(await _userRepository.SaveAllAsync(user));
        }

        [HttpPut("Update")]
        public async Task<ActionResult> UpdateProfile(ProfileEditDTO profileDto)
        {
             
            var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUserNameAsync(userName);

            _mapper.Map<ProfileEditDTO,User>(profileDto,user);

           
            if(await  _userRepository.UpdateAsync(user)) return Ok();

            return BadRequest();
 
        }

    }
}