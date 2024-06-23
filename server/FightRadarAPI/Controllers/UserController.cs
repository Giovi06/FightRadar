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
            return CreatedAtAction("GetUsername", new { id = user.Id }, user);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> GetUsername(string id)
        {
            var user = await _userService.GetUserAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Username);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateUser([FromQuery] string id, [FromBody] UserDTO userDTO)
        {
            try
            {
                if (userDTO == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest();
                }

                var user = await _userService.GetUserAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                user.Username = userDTO.Username;
                user.Password = userDTO.Password;
                user.Email = userDTO.Email;
                user.Gewicht = userDTO.Gewicht;
                user.Erfahrungen = userDTO.Erfahrungen;
                user.Kampfstil = userDTO.Kampfstil;
                user.Gewichtsklasse = userDTO.Gewichtsklasse;

            await _userService.UpdateUserAsync(id, user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }

    }
    public class UserDTO
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Gewicht { get; set; }
        public string? Erfahrungen { get; set; }
        public string? Kampfstil { get; set; }
        public string? Gewichtsklasse { get; set; }
    }
}