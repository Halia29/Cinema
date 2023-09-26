namespace Api.Models
{
    public class MovieModel
	{
		public string HorizontalImageUrl { get; set; }
		public string VerticalImageUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime PremiereDate { get; set; }
        public DateTime ShowingTillDate { get; set; }
        public int DurationInMinutes { get; set; }
        public Dictionary<DateTime, List<SessionModel>> Sessions { get; set; }
    }
}
