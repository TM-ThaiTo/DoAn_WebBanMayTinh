using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost("signup")]
        public IActionResult PostSignUp()
        {
            return Ok("Test sign up");
        }

        [HttpPost("verify")]
        public IActionResult PostVerify()
        {
            return Ok("Test verify");
        }

        [HttpPost("verify/forgot")]
        public IActionResult PostVerifyForgot()
        {
            return Ok("Test verify forgot");
        }

        [HttpPost("reset-pw")]
        public IActionResult PostResetPassword()
        {
            return Ok("Hello reset password");
        }
    }
}
