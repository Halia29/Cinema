namespace Api.Models
{
	public class SeatModel
	{
		public int Row { get; set; }
		public int Seat { get; set; }
		public double Price { get; set; }
		public bool IsVIP { get; set; }
		public bool isAvailable { get; set; }
		public string CustomerEmail { get; set; }
		public bool wasPaidFor { get; set; }
	}
}
