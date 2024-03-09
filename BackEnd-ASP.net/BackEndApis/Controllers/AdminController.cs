using AutoMapper;
using BackEndApis.Helper;
using BackEndApis.Models;
using BackEndApis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using static BackEndApis.Helper.Info;

namespace BackEndApis.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ServicesContex _sc;
        private readonly DbWebBanMayTinhContext _db;
        private readonly HashPassword _hp;
        private readonly Info _info;

        private readonly IMapper _mapper;

        public AdminController(ServicesContex sc, DbWebBanMayTinhContext db, Info info, IMapper mapper, HashPassword hp)
        {
            _sc = sc;
            _db = db;
            _info = info;
            _mapper = mapper;
            _hp = hp;
        }

        #region Login Admin
        [HttpPost("login-admin")]
        public async Task<IActionResult> PostLoginAdmin([FromBody] InfoLogin login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.Password))
            {
                return Ok(new
                {
                    code = 1,
                    message = "Thiếu thông tin đăng nhập",
                });
            }

            var checkAdmin = await _db.Admins.FirstOrDefaultAsync(ad => ad.UserName == login.Email);
            if(checkAdmin == null)
            {
                return Ok(new
                {
                    code = 2,
                    message = "Không tìm thấy tài khoản",
                });
            }

            string hashPass = _hp.hashPassword(login.Password);

            if(hashPass != checkAdmin.Password)
            {
                return Ok(new
                {
                    code = 3,
                    message = "Sai mật khẩu",
                });
            }

            InfoAdmin infoAdmin = new InfoAdmin
            {
                id = checkAdmin.Id,
                userName = checkAdmin.UserName ?? string.Empty,
                Email = checkAdmin.Email ?? string.Empty,
                fullName = checkAdmin.FullName ?? string.Empty,
                age = checkAdmin.Age ?? 0,
                phone = checkAdmin.Phone ?? string.Empty,
                fb = checkAdmin.Fb ?? string.Empty,
                address = checkAdmin.Address ?? string.Empty,
            };

            return Ok(new
            {
                code = 0,
                message = "Đăng nhập thành công với admin",
                data = infoAdmin,
            });
        }
        #endregion

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
        public async Task<IActionResult> GetProducts([FromQuery] int? id)
        {
            if (id.HasValue)
            {
                var product = await _db.Products
                    .Where(p => p.Id == id.Value)
                    .Select(u => new Info.InfoProduct
                    {
                        id_product = u.Id,
                        code = u.Code!,
                        name = u.Name!,
                        price = Convert.ToInt32(u.Price),
                        type = u.Type!,
                        brand = u.Brand!,
                        avt = u.Avt!,
                        stock = u.Stock,
                        discount = u.Discount!,
                        rate = u.Rate,
                        other_info = u.OtherInfo!,
                    })
                    .FirstOrDefaultAsync();

                if (product == null)
                {
                    return Ok(new
                    {
                        code = 1,
                        message = "Không tìm thấy sản phẩm",
                    });
                }

                var descProduct = await _db.Descriptions
                    .Where(d => d.IdProduct == product.id_product)
                    .GroupBy(d => d.Title)
                    .Select(group => new InfoDescModel
                    {
                        title = group.Key,
                        detailDesList = group.Select(detail => new Detail_DesModel
                        {
                            content = detail.Description1,
                            photo = detail.Image,
                        }).ToArray()
                    })
                    .ToListAsync();

                string type = product.type;
                object detailData;

                // lấy chi tiết sản phẩm
                switch (type)
                {
                    #region
                    case "ram":
                        var ramDetail = await _db.Rams
                            .Where(r => r.IdProduct == product.id_product)
                            .Select(r => new
                            {
                                id_product = r.IdProduct,
                                warranty = r.Warranty ?? string.Empty,
                                details = r.Details,
                                capacity = r.Capacity ?? string.Empty,
                                linkCatalogs = r.Catalogs ?? string.Empty,
                                bus = r.Bus ?? string.Empty,
                                type = r.Type ?? string.Empty,
                            })
                            .ToListAsync();

                        var catalogsTasks = ramDetail.Select(async r => new InfoRam
                        {
                            id_product = r.id_product,
                            warranty = r.warranty,
                            details = r.details,
                            capacity = r.capacity,
                            catalogs = await _sc.AdminServices.TachLinkImage(r.linkCatalogs),
                            bus = r.bus,
                            type = r.type,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasks);

                        detailData = catalogsTasks.Select(x => x.Result).FirstOrDefault()!;
                        break; // Ram

                    case "disk":
                        var diskDetail = await _db.Disks
                            .Where(d => d.IdProduct == product.id_product)
                            .Select(d => new
                            {
                                id_product = d.IdProduct,
                                warranty = d.Warranty ?? string.Empty,
                                details = d.Details,
                                capacity = d.Capacity ?? string.Empty,
                                linkCatalogs = d.Catalogs ?? string.Empty,
                                size = d.Size ?? string.Empty,
                                type = d.Type ?? string.Empty,
                                connectionStd = d.ConnectionStd ?? string.Empty,
                                readSpeed = d.readSpeed,
                                writeSpeed = d.writeSpeed,
                                rpm = d.rpm,
                            })
                            .ToListAsync();

                        var catalogsTasksDisk = diskDetail.Select(async d => new InfoDisk
                        {
                            id_product = d.id_product,
                            warranty = d.warranty,
                            details = d.details,
                            capacity = d.capacity,
                            linkCatalogs = d.linkCatalogs,
                            size = d.size,
                            type = d.type,
                            connectionStd = d.connectionStd,
                            readSpeed = d.readSpeed,
                            writeSpeed = d.writeSpeed,
                            rpm = d.rpm,
                            catalogs = await _sc.AdminServices.TachLinkImage(d.linkCatalogs),
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksDisk);

                        detailData = catalogsTasksDisk.Select(x => x.Result).FirstOrDefault()!;
                        break; // Disk

                    case "laptop":
                        var laptopDetail = await _db.Laptops
                            .Where(l => l.IdProduct == product.id_product)
                            .Select(l => new
                            {
                                id_product = l.IdProduct,
                                warranty = l.Warranty ?? string.Empty,
                                details = l.Details,
                                linkCatalog = l.Catalogs ?? string.Empty,

                                chipBrand = l.chipBrand ?? string.Empty,
                                processorCount = l.processorCount ?? string.Empty,
                                series = l.series ?? string.Empty,
                                detailCpu = l.detailCpu ?? string.Empty,

                                displaySize = l.DisplaySize ?? string.Empty,
                                display = l.Display ?? string.Empty,
                                operating = l.Operating ?? string.Empty,
                                disk = l.Disk ?? string.Empty,
                                ram = l.Ram ?? string.Empty,
                                pin = l.Pin ?? string.Empty,
                                weight = l.Weight ?? string.Empty,
                            }).ToListAsync();

                        var catalogsTasksLap = laptopDetail.Select(async l => new InfoLaptop
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            chipBrand = l.chipBrand ?? string.Empty,
                            processorCount = l.processorCount ?? string.Empty,
                            series = l.series ?? string.Empty,
                            detailCpu = l.detailCpu ?? string.Empty,

                            displaySize = l.displaySize ?? string.Empty,
                            display = l.display ?? string.Empty,
                            operating = l.operating ?? string.Empty,
                            disk = l.disk ?? string.Empty,
                            ram = l.ram ?? string.Empty,
                            pin = l.pin ?? string.Empty,
                            weight = l.weight ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksLap);

                        detailData = catalogsTasksLap.Select(x => x.Result).FirstOrDefault()!;
                        break; // Laptop

                    case "display":
                        var displayDetail = await _db.Displays
                            .Where(l => l.IdProduct == product.id_product)
                            .Select(l => new
                            {
                                id_product = l.IdProduct,
                                warranty = l.Warranty ?? string.Empty,
                                details = l.Details,
                                linkCatalog = l.Catalogs ?? string.Empty,

                                capacity = l.Capacity ?? string.Empty,
                                manufactuner = l.Manufacturer ?? string.Empty,
                            }).ToListAsync();
                        var catalogsTasksDisplay = displayDetail.Select(async l => new InfoDisplay
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            capacity = l.capacity ?? string.Empty,
                            manufactuner = l.manufactuner ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksDisplay);

                        detailData = catalogsTasksDisplay.Select(x => x.Result).FirstOrDefault()!;
                        break; // Display

                    case "mainboard":
                        var mainboardDetail = await _db.Mainboards
                            .Where(l => l.IdProduct == product.id_product)
                            .Select(l => new
                            {
                                id_product = l.IdProduct,
                                warranty = l.Warranty ?? string.Empty,
                                details = l.Details,
                                linkCatalog = l.Catalogs ?? string.Empty,

                                chipset = l.Chipset ?? string.Empty,
                                series = l.Series ?? string.Empty,
                                socketType = l.SocketType ?? string.Empty,
                                sizeStd = l.SizeStd ?? string.Empty,
                            }).ToListAsync();
                        var catalogsTasksMain = mainboardDetail.Select(async l => new InfoMainBoard
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            chipset = l.chipset ?? string.Empty,
                            series = l.series ?? string.Empty,
                            socketType = l.socketType ?? string.Empty,
                            sizeStd = l.sizeStd ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksMain);

                        detailData = catalogsTasksMain.Select(x => x.Result).FirstOrDefault()!;
                        break; // mainboard
                    #endregion

                    #region phụ kiện
                    case "headphone":
                        var headphoneDetail = await _db.Headphones
                            .Where(l => l.IdProduct == product.id_product)
                            .Select(l => new
                            {
                                id_product = l.IdProduct,
                                warranty = l.Warranty ?? string.Empty,
                                details = l.Details,
                                linkCatalog = l.Catalogs ?? string.Empty,

                                type = l.Type ?? string.Empty,
                                connectionStd = l.ConnectionStd ?? string.Empty,
                            }).ToListAsync();
                        var catalogsTasksHead = headphoneDetail.Select(async l => new InfoHeadphone
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            type = l.type ?? string.Empty,
                            connectionStd = l.connectionStd ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksHead);

                        detailData = catalogsTasksHead.Select(x => x.Result).FirstOrDefault()!;
                        break; //  headphone

                    case "keyboard":
                        var keyboardDetail = await _db.Keyboards
                            .Where(l => l.IdProduct == product.id_product)
                            .Select(l => new
                            {
                                id_product = l.IdProduct,
                                warranty = l.Warranty ?? string.Empty,
                                details = l.Details,
                                linkCatalog = l.Catalogs ?? string.Empty,

                                type = l.Type ?? string.Empty,
                                color = l.Color ?? string.Empty,
                                ledColor = l.LedColor ?? string.Empty,
                            }).ToListAsync();
                        var catalogsTaskskeyboard = keyboardDetail.Select(async l => new InfoKeyboard
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            type = l.type ?? string.Empty,
                            color = l.color ?? string.Empty,
                            ledColor = l.ledColor ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTaskskeyboard);

                        detailData = catalogsTaskskeyboard.Select(x => x.Result).FirstOrDefault()!;
                        break; // keyboard

                    case "monitor":
                        var monitorDetail = await _db.Monitors
                             .Where(l => l.IdProduct == product.id_product)
                             .Select(l => new
                             {
                                 id_product = l.IdProduct,
                                 warranty = l.Warranty ?? string.Empty,
                                 details = l.Details,
                                 linkCatalog = l.Catalogs ?? string.Empty,

                                 bgPlate = l.BgPlate ?? string.Empty,
                                 resolution = l.Resolution ?? string.Empty,
                                 displaySize = l.DisplaySize ?? string.Empty,
                                 frequency = l.Frequency ?? string.Empty,
                                 port = l.Port ?? string.Empty,
                             }).ToListAsync();
                        var catalogsTasksmonitor = monitorDetail.Select(async l => new InfoMonitor
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            bgPlate = l.bgPlate ?? string.Empty,
                            resolution = l.resolution ?? string.Empty,
                            displaySize = l.displaySize ?? string.Empty,
                            frequency = l.frequency ?? string.Empty,
                            port = l.port ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksmonitor);

                        detailData = catalogsTasksmonitor.Select(x => x.Result).FirstOrDefault()!;
                        break; //  monitor

                    case "mouse":
                        var mouseDetail = await _db.Mouses
                              .Where(l => l.IdProduct == product.id_product)
                              .Select(l => new
                              {
                                  id_product = l.IdProduct,
                                  warranty = l.Warranty ?? string.Empty,
                                  details = l.Details,
                                  linkCatalog = l.Catalogs ?? string.Empty,

                                  type = l.Type ?? string.Empty,
                                  isLed = l.IsLed ?? string.Empty,
                              }).ToListAsync();
                        var catalogsTasksmouse = mouseDetail.Select(async l => new InfoMouse
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            type = l.type ?? string.Empty,
                            isLed = l.isLed ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksmouse);

                        detailData = catalogsTasksmouse.Select(x => x.Result).FirstOrDefault()!;
                        break; //  mouse

                    case "router":
                        var routerDetail = await _db.Routers
                               .Where(l => l.IdProduct == product.id_product)
                               .Select(l => new
                               {
                                   id_product = l.IdProduct,
                                   warranty = l.Warranty ?? string.Empty,
                                   details = l.Details,
                                   linkCatalog = l.Catalogs ?? string.Empty,

                                   bandwidth = l.Bandwidth ?? string.Empty,
                                   strong = l.Strong ?? string.Empty,
                                   numberOfPort = l.NumberOfPort ?? string.Empty,
                               }).ToListAsync();
                        var catalogsTasksrouter = routerDetail.Select(async l => new InfoRouter
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            bandwidth = l.bandwidth ?? string.Empty,
                            strong = l.strong ?? string.Empty,
                            numberOfPort = l.numberOfPort ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksrouter);

                        detailData = catalogsTasksrouter.Select(x => x.Result).FirstOrDefault()!;
                        break; //  router 

                    case "speaker":
                        var speakerDetail = await _db.Speakers
                              .Where(l => l.IdProduct == product.id_product)
                              .Select(l => new
                              {
                                  id_product = l.IdProduct,
                                  warranty = l.Warranty ?? string.Empty,
                                  details = l.Details,
                                  linkCatalog = l.Catalogs ?? string.Empty,

                                  wattage = l.Wattage ?? string.Empty,
                                  connectionPort = l.ConnectionPort ?? string.Empty,
                              }).ToListAsync();
                        var catalogsTasksspeaker = speakerDetail.Select(async l => new InfoSpeaker
                        {
                            id_product = l.id_product,
                            warranty = l.warranty,
                            details = l.details,
                            catalogs = await _sc.AdminServices.TachLinkImage(l.linkCatalog),

                            wattage = l.wattage ?? string.Empty,
                            connectionPort = l.connectionPort ?? string.Empty,
                        }).ToArray();

                        await Task.WhenAll(catalogsTasksspeaker);

                        detailData = catalogsTasksspeaker.Select(x => x.Result).FirstOrDefault()!;
                        break; //  speaker
                    #endregion
                    // Add more cases for other product types if needed
                    default:
                        return Ok(new
                        {
                            code = 2,
                            message = "Không tìm thấy detail sản phẩm",
                        });
                }

                return Ok(new
                {
                    code = 0,
                    product = product,
                    desc = descProduct,
                    detail = detailData,
                });
            }
            else
            {
                try
                {
                    var products = _db.Products.Select(u => new Info.InfoProduct
                    {
                        id_product = u.Id,
                        code = u.Code!,
                        name = u.Name!,
                        price = Convert.ToInt32(u.Price),
                        type = u.Type!,
                        brand = u.Brand!,
                        avt = u.Avt!,
                        stock = u.Stock,
                        discount = u.Discount!,
                        rate = u.Rate,
                        other_info = u.OtherInfo!,
                    }).ToList();

                    return Ok(new
                    {
                        code = 0,
                        data = products
                    });
                }
                catch
                {
                    // Log the exception or handle it appropriately
                    return StatusCode(500, "Internal server error");
                }
            }
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
        [HttpDelete("product/del-product")]
        public async Task<IActionResult> DeleteProduct([FromQuery] int? idProduct)
        {
            if (idProduct <= 0)
            {
                return Ok(new
                {
                    code = 0,
                    message = "Không tìm thấy id cần xóa"
                });
            }
            Info.ResultReturn a = await _sc.AdminServices.DeleteProduct(idProduct);
            return Ok(new
            {
                code = a.Code,
                message = a.Message,
            });
        }
        #endregion
    }
}
