using AutoMapper;
using BackEndApis.Helper;
using BackEndApis.Models;
using BackEndApis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static BackEndApis.Helper.Info;

namespace BackEndApis.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ServicesContex _sc;
        private readonly DbWebBanMayTinhContext _db;
        private readonly Info _info;

        private readonly IMapper _mapper;

        public AdminController(ServicesContex sc, DbWebBanMayTinhContext db, Info info, IMapper mapper)
        {
            _sc = sc;
            _db = db;
            _info = info;
            _mapper = mapper;
        }

        #region CRUD tài khoản Admin
        //=== POST add-admin ===//
        [HttpPost("add-admin")]
        public async Task<IActionResult> PostVerify([FromBody] Info.InfoAdmin model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.userName) || string.IsNullOrWhiteSpace(model.password))
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin đăng nhập",
                });
            }

            string data = await _sc.AdminServices.PostAddAdminServices(model.userName, model.password, model.Email, model.fullName, model.age, model.phone, model.fb, model.address);

            if (data == "2")
            {
                return Ok(new
                {
                    code = 2,
                    message = "Tài khoản đã tồn tại",
                });
            }
            if (data == "4")
            {
                return Ok(new
                {
                    code = 3,
                    message = "Lỗi server",
                });
            }
            else
            {
                return Ok(new
                {
                    code = 0,
                    message = "Tạo tài khoản admin thành công",
                });
            }
        }

        //=== GET all-admin ===//
        [HttpGet("get-admin")]
        public async Task<IActionResult> GetAdmin([FromQuery] int? id)
        {
            if (id.HasValue)
            {
                try
                {
                    // Lấy thông tin admin theo ID
                    var adminInfo = await _db.Admins
                        .Where(ad => ad.Id == id.Value)
                        .Select(ad => new Info.InfoAdmin
                        {
                            id = ad.Id,
                            userName = ad.UserName ?? string.Empty,
                            Email = ad.Email ?? string.Empty,
                            fullName = ad.FullName ?? string.Empty,
                            age = ad.Age ?? 0,
                            phone = ad.Phone ?? string.Empty,
                            fb = ad.Fb ?? string.Empty,
                            address = ad.Address ?? string.Empty,
                        })
                        .FirstOrDefaultAsync();
                    if (adminInfo != null)
                    {
                        return Ok(new
                        {
                            code = 0,
                            message = "OK",
                            data = adminInfo
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            code = 1,
                            message = "Không tìm thấy admin",
                        });
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return Ok(new
                    {
                        code = 4,
                        message = "Lỗi server",
                    });
                }
            } // lấy thông tin 1 admin
            else
            {
                try
                {
                    // Lấy tất cả thông tin admin
                    var allAdmins = await _db.Admins
                        .Select(ad => new Info.InfoAdmin
                        {
                            id = ad.Id,
                            userName = ad.UserName ?? string.Empty,
                            Email = ad.Email ?? string.Empty,
                            fullName = ad.FullName ?? string.Empty,
                            age = ad.Age ?? 0,
                            phone = ad.Phone ?? string.Empty,
                            fb = ad.Fb ?? string.Empty,
                            address = ad.Address ?? string.Empty,
                        })
                        .ToListAsync();
                    return Ok(new
                    {
                        code = 0,
                        message = "OK",
                        data = allAdmins
                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return Ok(new
                    {
                        code = 4,
                        message = "Lỗi server",
                    });
                }
            } // lấy thông tin all admin
        }

        // === PUT update-admin ===//
        [HttpPut("update-admin")]
        public async Task<IActionResult> UpdateAdmin([FromBody] Info.InfoAdmin model)
        {
            if (model == null || model.id == null || model.id <= 0)
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin cần thiết hoặc ID không hợp lệ",
                });
            }

            var existingAdmin = await _db.Admins.FindAsync(model.id);

            if (existingAdmin == null)
            {
                return Ok(new
                {
                    code = 2,
                    message = "Không tìm thấy admin cần cập nhật",
                });
            }

            if (existingAdmin.UserName != model.userName)
            {
                return Ok(new
                {
                    code = 3,
                    message = "Không được sửa thông tin UserName",
                });
            }

            try
            {
                if (!string.IsNullOrEmpty(model.Email))
                {
                    existingAdmin.Email = model.Email;
                }

                if (!string.IsNullOrEmpty(model.fullName))
                {
                    existingAdmin.FullName = model.fullName;
                }

                if (model.age != 0)
                {
                    existingAdmin.Age = model.age;
                }

                if (!string.IsNullOrEmpty(model.phone))
                {
                    existingAdmin.Phone = model.phone;
                }

                if (!string.IsNullOrEmpty(model.fb))
                {
                    existingAdmin.Fb = model.fb;
                }

                if (!string.IsNullOrEmpty(model.address))
                {
                    existingAdmin.Address = model.address;
                }

                _db.Admins.Update(existingAdmin);
                await _db.SaveChangesAsync();

                return Ok(new
                {
                    code = 0,
                    message = "Cập nhật admin thành công",
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Ok(new
                {
                    code = 4,
                    message = "Lỗi server",
                });
            }
        }

        // === DELETE del-admin ===//
        [HttpDelete("del-admin")]
        public async Task<IActionResult> DeleteAdmin([FromQuery] int id)
        {
            var adminToDelete = await _db.Admins.FindAsync(id);

            if (adminToDelete == null)
            {
                return Ok(new
                {
                    code = 1,
                    message = "Không tìm thấy admin để xóa",
                });
            }

            _db.Admins.Remove(adminToDelete);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                code = 0,
                message = "Xóa admin thành công",
            });
        }
        #endregion

        #region CRUD tài khoản User
        //=== POST add-user ===//
        [HttpPost("add-user")]
        public async Task<IActionResult> PostAddUser([FromBody] Info.InfoUser user)
        {
            try
            {
                if (user == null || string.IsNullOrWhiteSpace(user.email) || string.IsNullOrWhiteSpace(user.password))
                {
                    return Ok(new
                    {
                        code = 1,
                        message = "Thiếu thông tin người dùng",
                    });
                }
                //(string Email, string Password, string FullName, DateTime BirthDay, string Gender, string Address)
                string _message = await _sc.AccountServices.PostSignUpServices(user.email, user.password, user.fullName, user.birthDay, user.gender, user.address);

                if (_message == "Email đã tồn tại")
                {
                    return Ok(new
                    {
                        code = 2,
                        message = _message,
                    });
                }

                return Ok(new
                {
                    code = 0,
                    message = "Tạo tài khoản thành công",
                });
            }catch(Exception ex)
            {
                return Ok(new
                {
                    code = 4,
                    message = "Lỗi server" + ex.Message,
                });
            }
        }

        //=== GET user ===//
        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser([FromQuery] int? id)
        {
            if (id.HasValue)
            {
                try
                {
                    var accountInfo = await _db.Accounts
                        .Where(ad => ad.Id == id.Value)
                        .Select(ad => new Info.InfoUser
                        {
                            Id_account = ad.Id,
                            email = ad.Email ?? string.Empty,
                            googleId = ad.GoogleId ?? string.Empty,
                            authType = ad.AuthType ?? string.Empty,
                            failedLoginTimes = ad.FailedLoginTimes ?? 0,
                            refreshToken = ad.RefreshToken ?? string.Empty,
                        })
                        .FirstOrDefaultAsync();

                    if (accountInfo != null)
                    {
                        var userInfo = await _db.Users
                            .Where(u => u.AccountId == accountInfo.Id_account)
                            .Select(u => new Info.InfoUser
                            {
                                fullName = u.FullName ?? string.Empty,
                                birthDay = u.Birthday ?? DateTime.MinValue,
                                gender = u.Gender ?? string.Empty,
                                address = u.Address ?? string.Empty,
                            })
                            .FirstOrDefaultAsync();

                        accountInfo.fullName = userInfo?.fullName ?? string.Empty;
                        accountInfo.birthDay = userInfo?.birthDay ?? DateTime.MinValue;
                        accountInfo.gender = userInfo?.gender ?? string.Empty;
                        accountInfo.address = userInfo?.address ?? string.Empty;

                        return Ok(new
                        {
                            code = 0,
                            message = "OK get one user",
                            data = accountInfo
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            code = 1,
                            message = "Không tìm thấy account",
                        });
                    }
                } catch (Exception ex)
                {
                    return Ok(new
                    {
                        code = 4,
                        message = "Lỗi server" + ex.Message,
                    });
                }
            } // lấy thông tin 1 user
            else
            {
                try
                {
                    var allUsers = await _db.Users
                        .Select(u => new Info.InfoUser
                        {
                            Id_account = u.AccountId,
                            email = u.Account != null ? u.Account.Email ?? string.Empty : string.Empty,
                            googleId = u.Account != null ? u.Account.GoogleId ?? string.Empty : string.Empty,
                            authType = u.Account != null ? u.Account.AuthType ?? string.Empty : string.Empty,
                            failedLoginTimes = u.Account != null ? u.Account.FailedLoginTimes ?? 0 : 0,
                            refreshToken = u.Account != null ? u.Account.RefreshToken ?? string.Empty : string.Empty,
                            fullName = u.FullName ?? string.Empty,
                            birthDay = u.Birthday ?? DateTime.MinValue,
                            gender = u.Gender ?? string.Empty,
                            address = u.Address ?? string.Empty,
                        })
                        .ToListAsync();

                    return Ok(new
                    {
                        code = 0,
                        message = "OK get all user",
                        data = allUsers
                    });
                }catch(Exception ex)
                {
                    return Ok(new
                    {
                        code = 4,
                        message = "Lỗi server" + ex.Message,
                    });
                }
            } // lấy thông tin all user
        }

        //=== PUT up-user ===//
        [HttpPut("up-user")]
        public async Task<IActionResult> PutUpdateUser([FromQuery] Info.InfoUser user)
        {
            if (user == null || user.Id_account == null || user.Id_account <= 0)
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin cần thiết hoặc ID không hợp lệ",
                });
            }
            //int id, string Email, string Password, string FullName, DateTime BirthDay, string Gender, string Address
            string message = await _sc.AdminServices.PutUpdateUserServices(user.Id_account.Value, user.fullName, user.birthDay, user.gender, user.address);

            if (message == "2")
            {
                return Ok(new
                {
                    code = 2,
                    message = "Không tìm thấy tài khoản",
                });
            }
            
            if(message == "3")
            {

                return Ok(new
                {
                    code = 3,
                    message = "Không tìm thấy thông tin user để thực hiện update",
                });
            }
            
            if(message == "4")
            {
                return Ok(new
                {
                    code = 4,
                    message = "Lỗi server",
                });
            }
            
            return Ok(new
                {
                    code = 0,
                    message = "Update người dùng thành công",
                });
        }

        //=== DELETE del-user ===//
        [HttpDelete("del-user")]
        public async Task<IActionResult> DeleteUser([FromQuery] int? id)
        {
            try
            {
                var userToDelete = await _db.Accounts.FirstOrDefaultAsync(ud => ud.Id == id);

                var userInfo = await _db.Users.FirstOrDefaultAsync(u => u.AccountId == id);

                if (userToDelete == null)
                {
                    return Ok(new
                    {
                        code = 1,
                        message = "Không tìm thấy người dùng để xóa",
                    });
                }

                if (userInfo == null)
                {
                    return Ok(new
                    {
                        code = 2,
                        message = "Không tim thấy thông tin người dùng",
                    });
                }

                _db.Users.Remove(userInfo);
                await _db.SaveChangesAsync();

                _db.Accounts.Remove(userToDelete);
                await _db.SaveChangesAsync();

                return Ok(new
                {
                    code = 0,
                    message = "Xóa người dùng thành công",
                });
            }
            catch (Exception ex)
            {
                // Ghi log lỗi ở đây nếu cần thiết
                Console.WriteLine(ex.Message);

                return Ok(new
                {
                    code = 4,
                    message = "Lỗi server khi xóa người dùng",
                });
            }
        }
        #endregion

        #region CRUD product
        //=== POST add-product (Thêm 1 sản phẩm) ===//
        [HttpPost("products/add")]
        public async Task<IActionResult> PostAddProducts([FromBody] Info.ProductRequestModel request)
        {
            InfoProduct infoProduct = _mapper.Map<InfoProduct>(request.product);
            InfoDescModel infoDesc = _mapper.Map<InfoDescModel>(request.desc);
            InfoDetailsModel infoDetail = _mapper.Map<InfoDetailsModel>(request.details);

            Info.ResultReturn a = await _sc.AdminServices.PutAddProductServices(infoProduct, infoDesc, infoDetail);

            return Ok(new
            {
                code = a.Code,
                message = a.Message,
            }) ;
        }

        //=== GET (lấy danh sách sản phẩm) ===//
        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            return Ok(new
            {
                code = 0,
                message = "Lấy thông tin sản phẩm thành công",
            });
        }

        //=== PUT update-product (chỉnh sửa thông tin sản phẩm) ===//
        [HttpPut("products/up-product")]
        public IActionResult PutUpdateProduct()
        {
            return Ok(new
            {
                code = 0,
                message = "Update thông tin sản phẩm thành công",
            });
        }

        //=== DELETE del-product (xóa sản phẩm) ===//
        [HttpDelete("products/del-product")]
        public IActionResult DeleteProduct()
        {
            return Ok(new
            {
                code = 0,
                message = "Xóa sản phẩm thành công",
            });
        }
        #endregion
    }
}
