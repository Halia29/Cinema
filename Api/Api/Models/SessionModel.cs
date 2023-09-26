namespace Api.Models
{
	public class SessionModel
	{
		public int Id { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public List<SeatModel> Seats { get; set; }
	}
}
