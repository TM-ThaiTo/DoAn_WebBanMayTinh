// AccountController.cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEndApis.Services;
using BackEndApis.Helper;

namespace BackEndApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ServicesContex _sc;
        private readonly Info _info;

        public AccountController(ServicesContex sc, Info info)
        {
            _sc = sc;
            _info = info;
        }

        // POST signup đăng kí tài khoản
        [HttpPost("signup")]
        public async Task<IActionResult> PostSignUp([FromBody] Info.InfoUser model)
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
