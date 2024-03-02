using BackEndApis.Helper;
using BackEndApis.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;
using System.Text.Json;
using static BackEndApis.Helper.Info;

namespace BackEndApis.Services
{
    public class AdminServices
    {
        private readonly DbWebBanMayTinhContext _db;
        private readonly HashPassword _hp;
        private readonly Info _info;
        public AdminServices(DbWebBanMayTinhContext db, HashPassword hp, Info info)
        {
            _db = db;
            _hp = hp;
            _info = info;
        }

        #region CRUD tài khoản ADMIN
        //=== Post add Admin ===//
        public async Task<string> PostAddAdminServices(string userName, string password, string email, string fullname, int age, string phone, string fb, string address)
        {
            var checkInfo = await _db.Admins.SingleOrDefaultAsync(ad => ad.UserName == userName);
            if (checkInfo != null)
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

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "4";
            }
        }
        #endregion

        #region CRUD tài khoản và thông tin User
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
        #endregion

        #region CRUD Product
        //=== thêm sản phẩm ===//
        public async Task<int?> addProducts(Info.InfoProduct product)
        {
            try
            {
                var checkCodeProduct = await _db.Products.FirstOrDefaultAsync(ccode => ccode.Code == product.code);
                if (checkCodeProduct == null)
                {
                    // Chuyển đổi base64 thành byte array
                    byte[] imageBytes = product.avtBase64;

                    // Lưu ảnh vào thư mục
                    string uploadPath = @"E:\image_doan\products";
                    string fileName = $"{Guid.NewGuid()}.jpg"; // Đặt tên file mới
                    string filePath = Path.Combine(uploadPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await stream.WriteAsync(imageBytes, 0, imageBytes.Length);
                    }

                    BackEndApis.Models.Product addProduct = new BackEndApis.Models.Product
                    {
                        Code = product.code,
                        Name = product.name,
                        Price = product.price,
                        Type = product.type,
                        Brand = product.brand,
                        Avt = product.avt,
                        Stock = product.stock,
                        Discount = product.discount,
                        Rate = product.rate,
                        OtherInfo = product.other_info,
                    };

                    _db.Products.Add(addProduct);
                    await _db.SaveChangesAsync();

                    Console.WriteLine("Check idProduct- v1: ", addProduct.Id);
                    return addProduct.Id;
                }
                else
                {
                    return -1;
                }
            }
            catch
            {
                return null;
            }
        } // thêm thông tin sản phẩm 
        public async Task<string> AddRam(Info.InfoProduct product, Info.InfoRam ram)
        {
            try
            {
                int? idProduct = await addProducts(product);

                if (idProduct == -1)
                {
                    return "Sản phẩm đã tồn tại";
                }

                if (idProduct.HasValue)
                {

                    BackEndApis.Models.Ram aRam = new BackEndApis.Models.Ram
                    {
                        IdProduct = idProduct.Value,
                        Capacity = ram.capacity,
                        Bus = ram.bus,
                        Type = ram.type,
                        Warranty = ram.warranty,
                        Catalogs = ram.catalogs,
                        Details = ram.details,
                    };

                    _db.Rams.Add(aRam);
                    await _db.SaveChangesAsync();
                    return "OK";
                }
                else
                {
                    return "Không tìm thấy idProduct";
                }
            }
            catch
            {
                return "Lỗi server";
            }
        }// hàm thêm thông tin chi tiết cho RAM
        public async Task<string> AddDisk(Info.InfoProduct product, Info.InfoDisk disk)
        {
            try
            {
                int? idProduct = await addProducts(product);

                if (idProduct == -1)
                {
                    return "Sản phẩm đã tồn tại";
                }

                if (idProduct.HasValue)
                {

                    BackEndApis.Models.Disk aDisk = new BackEndApis.Models.Disk
                    {
                        IdProduct = idProduct.Value,
                        Capacity = disk.capacity,
                        Size = disk.size,
                        Type = disk.type,
                        ConnectionStd = disk.connectionStd,
                        Speed = disk.speed,
                        Warranty = disk.warranty,
                        Catalogs = disk.catalogs,
                        Details = disk.details,
                    };

                    _db.Disks.Add(aDisk);
                    await _db.SaveChangesAsync();
                    return "OK";
                }
                else
                {
                    return "Không tìm thấy idProduct";
                }
            }
            catch
            {
                return "Lỗi server";
            }
        }// thêm thông tin chi tiết cho DISK

        // Tách và phân rã các chức năng của thêm sản phẩm
        public async Task<string> PutAddProductServices(Info.InfoProduct productModel, string details)
        {
            string checkTypeProduct = productModel.type.ToString();
            switch (checkTypeProduct)
            {
                case "ram":
                    try
                    {
                        Info.InfoRam infoRam = JsonSerializer.Deserialize<Info.InfoRam>(details) ?? new Info.InfoRam();
                        string checkLuuSP = await AddRam(productModel, infoRam);

                        if (checkLuuSP == "Sản phẩm đã tồn tại")
                        {
                            return "Sản phẩm đã tồn tại";
                        }
                        else if (checkLuuSP == "Không tìm thấy idProduct")
                        {
                            return "Không tìm thấy idProduct";
                        }
                        return "OK";
                    }
                    catch
                    {
                        return "5";
                    } // add Ram

                case "disk":
                    try
                    {
                        Info.InfoDisk infoDisk = JsonSerializer.Deserialize<Info.InfoDisk>(details) ?? new Info.InfoDisk();
                        string checkLuuSP = await AddDisk(productModel, infoDisk);

                        if (checkLuuSP == "Sản phẩm đã tồn tại")
                        {
                            return "Sản phẩm đã tồn tại";
                        }
                        else if (checkLuuSP == "Không tìm thấy idProduct")
                        {
                            return "Không tìm thấy idProduct";
                        }

                        return "OK";
                    }
                    catch
                    {
                        return "5";
                    } // add Disk

                default:
                    return "looix";
            }
        }
        #endregion
    }
}
