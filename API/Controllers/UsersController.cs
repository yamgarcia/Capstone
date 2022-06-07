using API.Data;
using API.DTOs;
using API.Entities;
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
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(users);
        }

        // api/user/3 = Jean's ID
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUsers(string username)
        {
            // var user = await _userRepository.GetUserByUsernameAsync(username);
            // return _mapper.Map<MemberDto>(user);
            return await _userRepository.GetMemberAsync(username);
        }

    }
}