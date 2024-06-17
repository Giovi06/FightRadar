using FightRadarAPI.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq; // Add this using directive
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
        public async Task<User> GetRandomFighter(string userId)
        {
            try
            {
                // Constructing the filter to find a random user excluding the userId
                var filter = Builders<User>.Filter.Ne(u => u.Id, userId);

                // Count total documents matching the filter
                long count = await _usersCollection.CountDocumentsAsync(filter);

                // Generate a random index to skip to a random document
                var randomIndex = new Random().Next(0, (int)count);

                // Find one document at the random index
                List<User> randomFighterList = await _usersCollection.Find(filter).Skip(randomIndex).Limit(1).ToListAsync();

                // Return the first (and only) user in the list
                return randomFighterList.FirstOrDefault() ?? throw new Exception("No random fighter found");
            }
            catch (Exception ex)
            {
                // Handle exceptions here
                Console.WriteLine($"Error fetching random fighter: {ex.Message}");
                throw;
            }
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

        public Task<User?> Authenticate(string email, string password)
        {
            var user = _usersCollection.Find(u => u.Email == email && u.Password == password).FirstOrDefault();
            if (user == null)
            {
                return Task.FromResult<User?>(null);
            }

            return Task.FromResult<User?>(user);
        }
    }
}