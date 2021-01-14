using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interface
{
    public interface IUserRepository
    {      
         Task<bool> UpdateAsync(User user);

         Task<bool> SaveAllAsync(User user);
 
         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUserByUserName(string UserName);

         Task<UserDTO> GetUserById(int id);

         Task<UserDTO> GetMemeberAsync(string UserName);

         Task<IEnumerable<UserDTO>> GetMembersAsync();

          Task<User> GetUserByUserNameAsync(string userName);
      
    } 
}