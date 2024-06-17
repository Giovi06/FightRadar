using FightRadarAPI.Models;
using FightRadarAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightRadarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly UserService _userService;

        public MatchController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("fighters")]
        public async Task<ActionResult<IEnumerable<User>>> GetFighters(int _id)
        {
            var users = (await _userService.GetUsersAsync()).ToList();
            var fighters = new List<User>();
            foreach (var user in users)
            {
                if (user.Id == _id.ToString()) continue;

                fighters.Add(new User
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Matches = user.Matches
                });
            }

            return Ok(fighters);
        }
        [HttpGet("{_id:length(24)}/fighter")]
        public async Task<ActionResult<IEnumerable<User>>> GetFighter(string _id)
        {
            if (string.IsNullOrEmpty(_id))
            {
                return BadRequest("User ID is required");
            }
            User fighter = await _userService.GetRandomFighter(_id);
            return Ok(fighter);
        }

        [HttpGet("{Id:length(24)}/matches")]
        public async Task<ActionResult<IEnumerable<Fight>>> GetMatches(string Id)
        {
            if (string.IsNullOrEmpty(Id))
            {
                return BadRequest("User ID is required");
            }

            var user = await _userService.GetUserAsync(Id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Matches ?? []);
        }

        [HttpPost("newfight")]
        public async Task<ActionResult> PostFight([FromBody] FightRequest request)
        {
            if (string.IsNullOrEmpty(request.FighterId))
            {
                return BadRequest("Fighter ID is required");
            }

            if (string.IsNullOrEmpty(request.UserId))
            {
                return BadRequest("User ID is required");
            }

            var user = await _userService.GetUserAsync(request.UserId);
            var fighter = await _userService.GetUserAsync(request.FighterId);

            if (fighter == null)
            {
                return NotFound("Fighter not found");
            }
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (fighter.Id == null || user.Id == null)
            {
                return BadRequest("User and fighter must have an ID");
            }

            var fight = new Fight
            {
                Opponent = fighter.Username,
                Result = "Pending",
                Date = DateTime.Now.ToString()
            };

            try
            {
                user.Matches ??= new List<Fight>();
                fighter.Matches ??= new List<Fight>();

                user.Matches.Add(fight);
                fighter.Matches.Add(fight);

                await _userService.UpdateUserAsync(user.Id, user);
                await _userService.UpdateUserAsync(fighter.Id, fighter);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        public class FightRequest
        {
            public string? FighterId { get; set; }
            public string? UserId { get; set; }
        }
    }
}
