using Api.Models;
using static System.Net.Mime.MediaTypeNames;
using System.Threading;

namespace Api.Services
{
	public class MovieService : IMovieService
	{
		private List<MovieModel> movies = new List<MovieModel>();
		private bool wereMoviesGenerated;

		public MovieService()
		{
			wereMoviesGenerated = false;
			movies.Add(new MovieModel
			{
				HorizontalImageUrl = "./../assets/images/a_haunting_in_venice_horizontal.jpg",
				VerticalImageUrl = "./../assets/images/a_haunting_in_venice.jpeg",
				Title = "A Haunting in Venice",
				Description = @"A Haunting in Venice is set in eerie, post-World War II 
										Venice on All Hallows' Eve and is a terrifying mystery featuring the return of the 
										celebrated sleuth, Hercule Poirot."
			});
			movies.Add(new MovieModel
			{
				//ImageUrl = "https://www.themoviedb.org/t/p/original/u5kboZR4OMi4QdbOhawCZuzMVWJ.jpg",
				HorizontalImageUrl = "./../assets/images/barbie_horizontal.jpg",
				VerticalImageUrl = "./../assets/images/barbie.jpg",
				Title = "Barbie",
				Description = @"Based on the eponymous fashion dolls by Mattel, it is the first 
										live-action Barbie film after numerous computer-animated films and specials.
										The film stars Margot Robbie as the titular character and Ryan Gosling as 
										Ken, and follows the pair on a journey of self-discovery following 
										an existential crisis."
			}); ;
			movies.Add(new MovieModel
			{
				//ImageUrl = "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
				HorizontalImageUrl = "./../assets/images/spider_man_horizontal.jpg",
				VerticalImageUrl = "./../assets/images/spider_man.jpg",
				Title = "Spider-Man: No Way Home",
				Description = @"Peter Parker's secret identity is revealed to the entire world. Desperate for help, 
								Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The 
								spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains 
								that could destroy the world."
			});
			movies.Add(new MovieModel
			{
				//ImageUrl = "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/84605/93507/Harry-Potter-and-the-philosophers-stone-original-movie-poster-buy-now-at-starstills__45891.1577476239.jpg?c=2",
				HorizontalImageUrl = "./../assets/images/harry_potter_horizontal.jpg",
				VerticalImageUrl = "./../assets/images/harry_potter.jpg",
				Title = "Harry Potter and the Philosopher's Stone",
				Description = @"An 11-year-old orphan living with his unwelcoming aunt, uncle, and cousin, who learns 
								of his own fame as a wizard known to have survived his parents' murder at the hands 
								of the dark wizard Lord Voldemort as an infant when he is accepted to Hogwarts School 
								of Witchcraft and Wizardry."
			});
			movies.Add(new MovieModel
			{
				//ImageUrl = "https://i.ebayimg.com/images/g/hO4AAOSwEXZeagxw/s-l1600.jpg",
				HorizontalImageUrl = "./../assets/images/me_before_you_horizontal.jpg",
				VerticalImageUrl = "./../assets/images/me_before_you.jpg",
				Title = "Me before you",
				Description = @"Louisa Clark – a 26-year-old woman who is creative, talented, and funny but underestimates
								herself and has few ambitions. Her life changes when she begins working as a caretaker for 
								a paralysed man. Over time, she learns to harness her capabilities and step out of her 
								limited comfort zone."
			});

		}
		private List<MovieModel> GenerateMovies()
		{
			wereMoviesGenerated = true;
			for (int i = 0; i < movies.Count(); i++) {
				DateTime today = DateTime.Today;
				Random random = new Random();
				movies[i].PremiereDate = today.AddDays(-random.Next(0, 21));
				movies[i].ShowingTillDate = today.AddDays(random.Next(20, 60));
				movies[i].DurationInMinutes = random.Next(60, 180);
				movies[i].Sessions = GenerateSessions(movies[i].DurationInMinutes).OrderBy(kvp => kvp.Key)
							  .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

			}
			return movies;
		}

		private Dictionary<DateTime, List<SessionModel>> GenerateSessions(int durationInMinutes)
		{
			Dictionary<DateTime, List<SessionModel>> sessions = new Dictionary<DateTime, List<SessionModel>>();
			DateTime today = DateTime.Today;
			for (int p = 0; p < 35; p++)
			{
				Random random = new Random();
				int randomHour = random.Next(7, 21); 
				int randomMinute = random.Next(0, 12) * 5;
				DateTime sessionDate = today.AddDays(p % 7);
				DateTime sessionTime = new DateTime(sessionDate.Year, sessionDate.Month, sessionDate.Day, randomHour, randomMinute, 0);

				SessionModel session = new SessionModel();
				session.Id = p;
				session.StartTime = sessionTime;
				session.EndTime = session.StartTime.AddMinutes(durationInMinutes);
				List<SeatModel> seats = new List<SeatModel>();
				for (int row = 1; row <= 10; row++)
				{
					for (int seat = 1; seat <= 15; seat++)
					{
						seats.Add(new SeatModel
						{
							Row = row,
							Seat = seat,
							Price = row < 10 ? 250.0 : 350.0,
							IsVIP = row >= 10,
							isAvailable = true,
							CustomerEmail = string.Empty,
							wasPaidFor = false
						}) ;
					}
				}
				session.Seats = seats;
				if (!sessions.ContainsKey(sessionDate))
				{
					sessions.Add(sessionDate, new List<SessionModel>() { session });
				}
				else
				{
					sessions[sessionDate].Add(session);
					sessions[sessionDate] = sessions[sessionDate].OrderBy(s => s.StartTime).ToList();
				}
			}
			return sessions;
		}

		public List<MovieModel> GetMovies()
		{
			return wereMoviesGenerated ? movies : GenerateMovies();
		}

		public MovieModel GetMovieByTitle(string title)
		{
			if (!wereMoviesGenerated)
			{
				GenerateMovies();
			}
			return movies.Where(movie => movie.Title == title).FirstOrDefault();
		}

		public bool UpdateMovie(SessionUpdateModel sessionUpdate)
		{
			var startDate = DateTime.Parse(sessionUpdate.StartDateAndTime);
			var movie = movies.FirstOrDefault(movie => movie.Title == sessionUpdate.Title);

			if (movie != null)
			{
				var date = movie.Sessions.FirstOrDefault(session => session.Key.Day == startDate.Day 
				&& session.Key.Month == startDate.Month 
				&& session.Key.Year == startDate.Year).Value;

				if (date != null)
				{
					var session = date.FirstOrDefault(s => s.Id == sessionUpdate.SessionId);

					if (session != null)
					{
						foreach (var seatToUpdate in sessionUpdate.Seats)
						{
							var correspondingSeat = session.Seats.FirstOrDefault(seat =>
								seat.Row == seatToUpdate.Row && seat.Seat == seatToUpdate.Seat);

							if (correspondingSeat != null)
							{
								correspondingSeat.isAvailable = false;
								correspondingSeat.CustomerEmail = seatToUpdate.CustomerEmail;
								correspondingSeat.wasPaidFor = true;
							}
						}

						return true;
					}
				}
			}

			return false;
		}

		public List<SessionUpdateModel> GetUserMovies(string currentUserEmail)
		{
			var sessionUpdateModels = new List<SessionUpdateModel>();

			foreach (var movie in movies)
			{
				foreach (var sessionsByDate in movie.Sessions)
				{
					foreach (var session in sessionsByDate.Value)
					{
						var seatsForCurrentUser = session.Seats
							.Where(seat => seat.CustomerEmail == currentUserEmail)
							.ToList();

						if (seatsForCurrentUser.Any())
						{
							var sessionUpdateModel = new SessionUpdateModel
							{
								Title = movie.Title,
								SessionId = session.Id,
								CurrentUserEmail = currentUserEmail,
								StartDateAndTime = session.StartTime.ToString("yyyy-MM-ddTHH:mm:ss"),
								EndDateAndTime = session.EndTime.ToString("yyyy-MM-ddTHH:mm:ss"),
								Seats = seatsForCurrentUser
							};

							sessionUpdateModels.Add(sessionUpdateModel);
						}
					}
				}
			}

			sessionUpdateModels.Sort((a, b) => a.StartDateAndTime.CompareTo(b.StartDateAndTime)); 

			return sessionUpdateModels;
		}

	}
}
