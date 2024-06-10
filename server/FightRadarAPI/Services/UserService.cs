using FightRadarAPI.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace FightRadarAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public readonly string _key;

        public UserService(IOptions<FightRadarDatabaseSettings> settings, IConfiguration configuration)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);

            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _usersCollection = database.GetCollection<User>(settings.Value.CollectionName);

            this._key = configuration.GetSection("JwtKey").ToString() ?? throw new ArgumentNullException("JwtKey");
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _usersCollection.Find(user => true).ToListAsync();
        }
        public async Task<User> GetUserAsync(string Id)
        {
            return await _usersCollection.Find(user => user.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<User> CreateUserAsync(User user)
        {
            await _usersCollection.InsertOneAsync(user);
            return user;
        }

        public async Task<User> UpdateUserAsync(string Id, User user)
        {
            await _usersCollection.ReplaceOneAsync(u => u.Id == Id, user);
            return user;
        }

        public async Task DeleteUserAsync(string Id)
        {
            await _usersCollection.DeleteOneAsync(u => u.Id == Id);
        }

        public bool Authenticate(string email, string password)
        {
            var user = _usersCollection.Find(u => u.Email == email && u.Password == password).FirstOrDefault();
            if (user == null)
            {
                return false;
            }

            return true;

        }
    }
}