namespace Api.Models
{
	public class SessionUpdateModel
	{
		public string Title { get; set; }
		public int SessionId { get; set; }
		public string CurrentUserEmail { get; set; }
		public string StartDateAndTime { get; set; }
		public string EndDateAndTime { get; set; }
		public List<SeatModel> Seats { get; set; }
	}
}
