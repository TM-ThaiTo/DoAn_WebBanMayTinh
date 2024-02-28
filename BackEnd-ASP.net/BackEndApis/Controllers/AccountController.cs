// AccountController.cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEndApis.Services;

namespace BackEndApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ServicesContex _sc;

        public AccountController(ServicesContex sc)
        {
            _sc = sc;
        }

        // POST signup đăng kí tài khoản
        [HttpPost("signup")]
        public async Task<IActionResult> PostSignUp([FromQuery] string Email, [FromQuery] string Password, [FromQuery] string FullName,
                                        [FromQuery] DateTime BirthDay, [FromQuery] string Gender, [FromQuery] string Address)
        {
            if (Email == "NULL" || Password == "NULL")
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin người dùng"
                });
            }
            try
            {
                string check = await _sc.AccountServices.PostSignUpServices(Email, Password, FullName, BirthDay, Gender, Address);

                if (check == "OK")
                {
                    return Ok(new
                    {
                        code = 0,
                        message = "Tạo người dùng thành công",
                    });
                }
                else
                {
                    return Ok(new
                    {
                        code = 2,
                        message = check
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    code = 3,
                    message = "Lỗi server: " + ex.Message
                });
            }
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
