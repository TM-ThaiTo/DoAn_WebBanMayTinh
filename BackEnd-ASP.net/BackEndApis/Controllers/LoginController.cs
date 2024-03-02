using BackEndApis.Helper;
using BackEndApis.Models;
using BackEndApis.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BackEndApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DbWebBanMayTinhContext _db;
        private readonly HashPassword _hp;
        private readonly ServicesContex _sc;
        private readonly Info _info;
        public LoginController ( ServicesContex sc, DbWebBanMayTinhContext db, HashPassword hp, Info info)
        {
            _db = db;
            _sc = sc;
            _hp = hp;
            _info = info;
        }

        public class LoginModel
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        //==== Post Login user --- bằng account ====//
        [HttpPost]
        public async Task<IActionResult> PostLogin([FromBody] Info.InfoLogin model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin đăng nhập",
                });
            }

            // Sử dụng ToLower() để kiểm tra email không phân biệt hoa thường
            var checkAccount = await _db.Accounts.SingleOrDefaultAsync(cl => cl.Email.ToLower() == model.Email.ToLower());

            if (checkAccount == null)
            {
                return Ok(new
                {
                    code = 2,
                    message = "Không tìm thấy tài khoản",
                });
            }

            string hashedPassword = _hp.hashPassword(model.Password);

            if (checkAccount.Password != hashedPassword)
            {
                return Ok(new
                {
                    code = 3,
                    message = "Sai mật khẩu"
                });
            }

            var infoUser = await _db.Users.SingleOrDefaultAsync(info => info.AccountId == checkAccount.Id);

            if (infoUser == null)
            {
                return Ok(new
                {
                    code = 4,
                    message = "Đăng nhập thành công và không tìm thấy thông tin người dùng",
                });
            }

            var userInfo = new
            {
                role = "User",
                Email = checkAccount.Email,
                UserId = infoUser.Id,
                FullName = infoUser.FullName,
                Birthday = infoUser.Birthday ?? DateTime.MinValue,
                Gender = infoUser.Gender,
                Address = infoUser.Address
            };

            return Ok(new
            {
                code = 0,
                message = "OK",
                data = userInfo
            });
        }
    }
}
