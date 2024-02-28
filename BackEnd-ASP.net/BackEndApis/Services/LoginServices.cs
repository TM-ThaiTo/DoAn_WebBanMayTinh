using BackEndApis.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace BackEndApis.Services
{
    public class LoginServices
    {
        private readonly DbWebBanMayTinhContext _db;

        public LoginServices(DbWebBanMayTinhContext db)
        {
            _db = db;
        }

        // hash password
        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] hashedBytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashedBytes.Length; i++)
                {
                    builder.Append(hashedBytes[i].ToString("x2"));
                }

                return builder.ToString();
            }
        }

        // xử lý login
        public async Task<string> PostLoginServices(string Email, string Password)
        {
            var checkLogin = await _db.Accounts.SingleOrDefaultAsync(cl => cl.Email == Email);

            if (checkLogin == null)
            {
                return "Tài khoản không tồn tại";
            }

            string passHash = HashPassword(Password);

            if (passHash != checkLogin.Password)
            {
                return "Sai mật khẩu";
            }

            var infoUser = await _db.Users.SingleOrDefaultAsync(info => info.AccountId == checkLogin.Id);

            if (infoUser == null)
            {
                return "Không tìm thấy thông tin người dùng";
            }

            var userInfo = new
            {
                Email = checkLogin.Email,
                UserId = infoUser.Id,
                FullName = infoUser.FullName,
                Birthday = infoUser.Birthday,
                Gender = infoUser.Gender,
                Address = infoUser.Address
            };

            var thongtin = new
            {
                role = "User",
                info = userInfo,
            };

            string jsonUserInfo = JsonConvert.SerializeObject(thongtin);

            return jsonUserInfo;
        }
    }
}
