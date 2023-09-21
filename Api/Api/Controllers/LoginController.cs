using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class LoginController : ControllerBase
	{
		private readonly LoginModel _loginModel = new LoginModel() { 
			Email = "admin@email.com", 
			Password = "AdminPass1234"
		};

		private readonly ILogger<LoginController> _logger;

		public LoginController(ILogger<LoginController> logger)
		{
			_logger = logger;
		}

		[HttpGet(Name = "Login")]
		public IActionResult Login(string email, string password)
		{
			if (email == _loginModel.Email && password == _loginModel.Password)
			{
				return Ok();
			}
			return BadRequest();
		}
	}
}