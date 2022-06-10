using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
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
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _userRepository.GetMembersAsync());
        }

        //* Giving the route a name helps using the param in another method (AddPhoto)
        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUsers(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            //* instead of mapping one by one like: user.City = memberUpdateDto.City use AutoMapper
            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            //if saving is successful it sends no content since it's not necessary for put req
            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update use");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            // Get users so their photo can be used
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            // get the result from cloudinary IPhotoService
            var result = await _photoService.AddPhotoAsync(file);

            // check the result 
            if (result.Error != null) return BadRequest(result.Error.Message);

            // If no error a new photo is instantiated
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            // Check is user has any photo and set them to the main photo if not
            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            // Add the photo to the collection
            user.Photos.Add(photo);

            // Finally the photo is returned
            if (await _userRepository.SaveAllAsync())
            {
                // return _mapper.Map<PhotoDto>(photo);
                // This refectoring should help returning a 201 from server
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }

            // Bad request if smt wrong happens
            return BadRequest("Problem adding photo");

        }
    }
}