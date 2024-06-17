using FightRadarAPI.Models;
using FightRadarAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace FightRadarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserService userService) : ControllerBase
    {
        private readonly UserService _userService = userService;

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> Login([FromBody] User requestUser)
        {
            User? user = await _userService.Authenticate(requestUser.Email, requestUser.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            return Ok(user.Id);
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            await _userService.CreateUserAsync(user);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userService.GetUserAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Username);
        }
    }
}