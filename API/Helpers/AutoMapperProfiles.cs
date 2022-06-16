using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    //Needs to derive from Profile
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            //destination = MmemberDto field to map
            //Sender = AppUser in the Message entity
            CreateMap<Message, MessageDto>().ForMember(destination => destination.SenderPhotoUrl, options => options.MapFrom(src =>
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Message, MessageDto>().ForMember(destination => destination.RecipientPhotoUrl, options => options.MapFrom(src =>
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}