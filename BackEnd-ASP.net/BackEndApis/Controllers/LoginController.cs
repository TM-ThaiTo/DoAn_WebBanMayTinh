using BackEndApis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ServicesContex _sc;
        public LoginController ( ServicesContex sc)
        {
            _sc = sc;
        }


        [HttpPost]
        public async Task<IActionResult> PostLogin([FromQuery] string Email, [FromQuery] string Password)
        {
            string data = await _sc.LoginServices.PostLoginServices(Email, Password);
            
            if (data == "Tài khoản không tồn tại")
            {
                return Ok(new
                {
                    code = 1,
                    message = data,
                });
            }

            if (data == "Sai mật khẩu")
            {
                return Ok(new
                {
                    code = 2,
                    message = data,
                });
            }

            return Ok(new
            {
                code = 0,
                data = data,
            });
        }
    }
}
