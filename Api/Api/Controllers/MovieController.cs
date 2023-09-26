using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class MovieController : Controller
	{
		private IMovieService movieService;
		public MovieController(IMovieService movieService)
		{
			this.movieService = movieService;
		}

		[HttpGet("GetMovies", Name = "GetMovies")]
		public List<MovieModel> GetMovies()
		{
			return movieService.GetMovies();
		}

		[HttpGet("GetMovie/{title}", Name = "GetMovieByTitle")]
		public MovieModel GetMovieByTitle(string title)
		{
			return movieService.GetMovieByTitle(title);
		}

		[HttpPost("UpdateMovie", Name = "PostMovie")]
		public IActionResult SetMovie(SessionUpdateModel updatedMovies) 
		{ 
			if (movieService.UpdateMovie(updatedMovies))
			{
				return Ok();
			}
			return BadRequest();
		}

		[HttpGet("GetMovie/{title}/{sessionId}", Name = "GetMovieByTitleAndSessionId")]
		public MovieModel GetMovieByTitleAndSessionId(string title, int sessionId)
		{
			return movieService.GetMovieByTitle(title);
		}

		[HttpGet("GetUsersMovies/{currentUserEmail}")]
		public List<SessionUpdateModel> GetSessions(string currentUserEmail)
		{
			return movieService.GetUserMovies(currentUserEmail);
		}
	}
}
