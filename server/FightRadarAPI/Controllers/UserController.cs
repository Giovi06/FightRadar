using System.Collections.Generic;
using FightRadarAPI.Models;
using FightRadarAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FightRadarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult Login([FromBody] User user)
        {
            bool loggedIn = _userService.Authenticate(user.Email, user.Password);
            if (loggedIn == false)
            {
                return Unauthorized();
            }
            return Ok(loggedIn);
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            await _userService.CreateUserAsync(user);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpGet]
        [Route("fighters")]
        public async Task<ActionResult<IEnumerable<User>>> GetFighters(int _id)
        {
            var users = (await _userService.GetUsersAsync()).ToList();
            List<User> fighters = [];
            foreach (User user in users)
            {
                User fighter = new()
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Matches = user.Matches
                };
                if(user.Id == _id.ToString()) { users.Remove(user);}
                fighters.Add(fighter);
            }

            return Ok(fighters);
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

        [HttpPost]
        [Route("newfight")]
        public async Task<ActionResult<User>> PostFight(User user, string fighterId)
        {
            if(fighterId == null)
            {
                return BadRequest("Fighter ID is required");
            }
            if(user == null)
            {
                return BadRequest("User is required");
            }

            User fighter = await _userService.GetUserAsync(fighterId);

            if(fighter == null)
            {
                return NotFound("Fighter not found");
            }
            user.Matches ??= [];
            fighter.Matches ??= [];
            if(fighter.Id == null || user.Id == null)
            {
                return BadRequest("User and fighter must have an ID");
            }
            try
            {
                user.Matches.Add(fighter.Id);
                fighter.Matches.Add(user.Id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        
            return CreatedAtAction("Fight", new { user.Matches }, user.Matches);
        }
    }
}