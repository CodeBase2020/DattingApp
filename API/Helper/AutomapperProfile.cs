using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helper
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<User,UserDTO>().ForMember(dest => dest.PhotoUrl,
             opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
             .ForMember(dest => dest.Age,opt => opt.MapFrom(x => x.DateOfBirth.GetPersonAge()));
            
             
            CreateMap<Photo,PhotoDTO>();
        }
    }
}