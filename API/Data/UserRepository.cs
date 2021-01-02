using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public Task<IEnumerable<User>> GetMembersAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<UserDTO> GetMemeberAsync(string UserName)
        {
            return await _context.Users.Where(x => x.UserName == UserName)
                   .ProjectTo<UserDTO>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        async Task<IEnumerable<UserDTO>> IUserRepository.GetMembersAsync()
        {
            return await _context.Users
                   .ProjectTo<UserDTO>(_mapper.ConfigurationProvider).ToListAsync();
        }

        async Task<UserDTO> IUserRepository.GetUserById(int id)
        {
            return await _context.Users.Where(x => x.Id == id)
                         .ProjectTo<UserDTO>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        async Task<User> IUserRepository.GetUserByUserName(string UserName)
        {
            return await _context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == UserName);
        }

        async Task<IEnumerable<User>> IUserRepository.GetUsers()
        {
            return await _context.Users.Include(x => x.Photos).ToListAsync();
        }

        async Task<bool> IUserRepository.SaveAllAsync(User user)
        {
            _context.Add(user);
            return await _context.SaveChangesAsync() > 0;
        }

        void IUserRepository.Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.Users.AddAsync(user);

        }
    }
}