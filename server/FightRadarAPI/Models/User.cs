using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace FightRadarAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Username")]
        [JsonPropertyName("Username")]
        public string Username { get; set; } = null!;

        [BsonElement("Password")]
        [JsonPropertyName("Password")]
        public string Password { get; set; } = null!;

        [BsonElement("Email")]
        [JsonPropertyName("Email")]
        public string Email { get; set; } = null!;
        public List<Fight>? Matches { get; set; }
        public string? Gewicht { get; set; }
        public string? Erfahrungen { get; set; }
        public string? Kampfstil { get; set; }
        public string? Gewichtsklasse { get; set; }
    }
}