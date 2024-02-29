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

        public class InfoUserSignUp
        {
            public string email { get; set; } = string.Empty;
            public string password { get; set; } = string.Empty;
            public string googleId { get; set; } = string.Empty;
            public string authType { get; set; } = string.Empty;
            public int failedLoginTimes { get; set; } = 0;
            public string refreshToken { get; set; } = string.Empty;

            public string fullName { get; set; } = string.Empty;
            public DateTime birthDay { get; set; }
            public string gender { get; set; } = string.Empty;
            public string address { get; set; } = string.Empty;
        }


        // POST signup đăng kí tài khoản
        [HttpPost("signup")]
        public async Task<IActionResult> PostSignUp([FromBody] InfoUserSignUp model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.email) || string.IsNullOrWhiteSpace(model.password))
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin đăng nhập",
                });
            }

            try
            {
                string check = await _sc.AccountServices.PostSignUpServices(model.email, model.password, model.fullName, model.birthDay, model.gender, model.address);

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
