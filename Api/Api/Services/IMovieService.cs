using Api.Models;

namespace Api.Services
{
	public interface IMovieService
	{
		List<MovieModel> GetMovies();

		MovieModel GetMovieByTitle(string title);

		bool UpdateMovie(SessionUpdateModel sessionUpdate);

		List<SessionUpdateModel> GetUserMovies(string currentUserEmail);
	}
}
