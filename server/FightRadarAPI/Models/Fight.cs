namespace FightRadarAPI.Models
{
    public class Fight
    {
        public Opponent? Opponent { get; set; }
        public string? Result { get; set; }
        public string? Date { get; set; }
    }

    public class Opponent
    {
        public string? Username { get; set; }
        public string? Id { get; set; }
    }
}