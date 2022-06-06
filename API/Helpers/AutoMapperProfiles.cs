using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    //Needs to derive from Profile
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Photo, PhotoDto>();
        }
    }
}