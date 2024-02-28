// AccountServices.cs
using BackEndApis.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BackEndApis.Services
{
    public class AccountServices
    {
        private readonly DbWebBanMayTinhContext _db;

        public AccountServices(DbWebBanMayTinhContext db)
        {
            _db = db;
        }

        // hash password
        private string hashPassword(string password)
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


        // Xữ lý tạo tài khoản người dùng
        public async Task<string> PostSignUpServices(string Email, string Password, string FullName, DateTime BirthDay, string Gender, string Address)
        {
            try
            {
                var email = await _db.Accounts.SingleOrDefaultAsync(em => em.Email == Email);

                if (email != null)
                {
                    return "Email đã tồn tại";
                }

                string hashedPassword = hashPassword(Password);

                Account newAcc = new Account
                {
                    Email = Email,
                    Password = hashedPassword,
                };

                _db.Accounts.Add(newAcc);
                await _db.SaveChangesAsync();

                User newUser = new User
                {
                    AccountId = newAcc.Id,
                    FullName = FullName,
                    Birthday = BirthDay,
                    Gender = Gender,
                    Address = Address
                };

                _db.Users.Add(newUser);
                await _db.SaveChangesAsync();

                return "OK";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }


    }
}
