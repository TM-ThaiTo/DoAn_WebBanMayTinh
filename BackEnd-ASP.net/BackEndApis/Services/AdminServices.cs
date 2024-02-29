using BackEndApis.Helper;
using BackEndApis.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEndApis.Services
{
    public class AdminServices
    {
        private readonly DbWebBanMayTinhContext _db;
        private readonly HashPassword _hp;

        public AdminServices(DbWebBanMayTinhContext db, HashPassword hp)
        {
            _db = db;
            _hp = hp;
        }

        //=== Post add Admin ===//
         public async Task<string> PostAddAdminServices(string userName, string password, string email, string fullname, int age, string phone, string fb, string address)
         {
            var checkInfo = await _db.Admins.SingleOrDefaultAsync(ad => ad.UserName == userName);
            if(checkInfo != null) 
            {
                return "2";
            }

            try
            {
                Admin ad = new Admin
                {
                    UserName = userName,
                    Password = _hp.hashPassword(password),    
                    Email = email,
                    FullName = fullname,
                    Age = age,
                    Phone = phone,
                    Fb = fb,
                    Address = address
                };

                _db.Admins.Add(ad);
                _db.SaveChanges();
                
                return "0";

            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "4";
            }
         }
        //======================//


        //=== PUT update User ===//
        public async Task<string> PutUpdateUserServices(int id_account, string FullName, DateTime BirthDay, string Gender, string Address)
        {
            var checkAcc = await _db.Accounts.FirstOrDefaultAsync(acc => acc.Id == id_account);

            if( checkAcc == null )
            {
                return "2";
            }

            var checkUser = await _db.Users.FirstOrDefaultAsync(u => u.AccountId == id_account);
            if( checkUser == null )
            {
                return "3";
            }

            try
            {
                if (!string.IsNullOrEmpty(FullName))
                {
                    checkUser.FullName = FullName;
                }

                if (BirthDay != DateTime.MinValue)
                {
                    checkUser.Birthday = BirthDay;
                }

                if (!string.IsNullOrEmpty(Gender))
                {
                    checkUser.Gender = Gender;
                }

                if (!string.IsNullOrEmpty(Address))
                {
                    checkUser.Address = Address;
                }

                // Lưu thay đổi vào cơ sở dữ liệu
                await _db.SaveChangesAsync();

                return "OK";
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "4";
            }
            
        }
    }
}
