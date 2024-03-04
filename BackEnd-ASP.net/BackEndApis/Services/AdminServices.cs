using BackEndApis.Helper;
using BackEndApis.Models;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;
using System.Text.Json;
using static BackEndApis.Helper.Info;
using Newtonsoft.Json;

namespace BackEndApis.Services
{
    public class AdminServices
    {
        private readonly DbWebBanMayTinhContext _db;
        private readonly HashPassword _hp;
        private readonly Cloudinary _cloudinary;

        public AdminServices(DbWebBanMayTinhContext db, HashPassword hp, Cloudinary cloudinary)
        {
            _db = db;
            _hp = hp;
            _cloudinary = cloudinary;
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

        
        /*public async Task<string> AddDisk(Info.InfoProduct product, Info.InfoDisk disk)
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
        }// thêm thông tin chi tiết cho DISK*/
        #region CRUD Product
        //=== thêm sản phẩm ===//
        public async Task<string> upImageProduct_Avt(string avtBase64, string code)
        {
            try
            {
                // Upload ảnh lên Cloudinary
                if (!string.IsNullOrEmpty(avtBase64))
                {
                    // Set the folder path including the product code
                    var folderPath = $"products/{code}";

                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription("image", new MemoryStream(Convert.FromBase64String(avtBase64))),
                        Folder = folderPath  // Set the folder path on Cloudinary
                    };

                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                    // Lưu đường dẫn ảnh vào cơ sở dữ liệu
                    string avt = uploadResult.SecureUrl.AbsoluteUri;
                    return avt;
                }
                else
                {
                    return "Lỗi lưu ảnh";
                }
            }
            catch
            {
                return "Lỗi server lưu ảnh";
            }
        } // up image Avatar Product
        public async Task<string> upImageCatalogs(string[] catalogs, string code) // up image Catalogs Product
        {
            try
            {
                // Check if the catalogs array is not null or empty
                if (catalogs != null && catalogs.Length > 0)
                {
                    // Set the folder path including the product code
                    var folderPath = $"products/{code}";

                    List<string> imageUrls = new List<string>();

                    foreach (var avtBase64 in catalogs)
                    {
                        // Upload ảnh lên Cloudinary
                        if (!string.IsNullOrEmpty(avtBase64))
                        {
                            var uploadParams = new ImageUploadParams
                            {
                                File = new FileDescription("image", new MemoryStream(Convert.FromBase64String(avtBase64))),
                                Folder = folderPath  // Set the folder path on Cloudinary
                            };

                            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                            // Lưu đường dẫn ảnh vào danh sách
                            string avt = uploadResult.SecureUrl.AbsoluteUri;
                            imageUrls.Add(avt);
                        }
                        else
                        {
                            imageUrls.Add("Lỗi lưu ảnh");
                        }
                    }

                    // Concatenate the image URLs into a single string separated by ~
                    string concatenatedUrls = string.Join("~", imageUrls);

                    return concatenatedUrls;
                }
                else
                {
                    return "Danh sách ảnh trống";
                }
            }
            catch
            {
                return "Lỗi server lưu ảnh";
            }
        }

        public async Task<string[]> upImageDesc(Detail_Des[]? detailDescs, string code)
        {
            List<string> imageUrls = new List<string>();

            try
            {
                // Check if the detailDescs array is not null
                if (detailDescs != null)
                {
                    // Set the folder path including the product code
                    var folderPath = $"products/{code}";

                    foreach (var detailDesc in detailDescs)
                    {
                        // Upload photo to Cloudinary
                        if (!string.IsNullOrEmpty(detailDesc.photo))
                        {
                            var uploadParams = new ImageUploadParams
                            {
                                File = new FileDescription("image", new MemoryStream(Convert.FromBase64String(detailDesc.photo))),
                                Folder = folderPath  // Set the folder path on Cloudinary
                            };

                            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                            // Save the image URL to the urlPhoto property
                            string imageUrl = uploadResult.SecureUrl.AbsoluteUri;
                            imageUrls.Add(imageUrl);
                        }
                        else
                        {
                            imageUrls.Add("Lỗi lưu ảnh");
                        }
                    }
                }
                else
                {
                    imageUrls.Add("Danh sách detailDescs là null");
                }
            }
            catch
            {
                imageUrls.Add("Lỗi server lưu ảnh");
            }

            return imageUrls.ToArray();
        }

        public async Task<int?> addProducts(InfoProduct product, string urlAvt)
        {
            try
            {    
                BackEndApis.Models.Product addProduct = new BackEndApis.Models.Product
                {
                    Code = product.code,
                    Name = product.name,
                    Price = product.price,
                    Type = product.type,
                    Brand = product.brand,
                    Avt = urlAvt,
                    Stock = product.stock,
                    Discount = product.discount,
                    Rate = product.rate,
                    OtherInfo = product.other_info,
                };

                _db.Products.Add(addProduct);
                await _db.SaveChangesAsync();
                return addProduct.Id;
            }
            catch
            {
                return null;
            }
        } // thêm thông tin sản phẩm 
        public async Task<int?> addDescs(int? idProduct, InfoDesc infoDesc)
        {
            try
            {
                // Convert array of Detail_Des to JSON string
                string detailDesJson = JsonConvert.SerializeObject(infoDesc.detailDesList);

                BackEndApis.Models.Description addDesc = new BackEndApis.Models.Description
                {
                    IdProduct = idProduct,
                    Title = infoDesc.title,
                    Description1 = detailDesJson,
                };

                await _db.Descriptions.AddAsync(addDesc);
                await _db.SaveChangesAsync();
                return 0;
            }
            catch
            {
                return -1;
            }
        } // thêm thông tin Desc
        public async Task<string> AddRam(InfoRam ram, int? idProduct, string urlCatalogs)
        {
            try
            {

                BackEndApis.Models.Ram aRam = new BackEndApis.Models.Ram
                {
                    IdProduct = idProduct,
                    Capacity = ram.capacity,
                    Bus = ram.bus,
                    Type = ram.type,
                    Warranty = ram.warranty,
                    Catalogs = urlCatalogs,
                    Details = ram.details,
                };

                _db.Rams.Add(aRam);
                await _db.SaveChangesAsync();
                return "OK";
        }
            catch
            {
                return "Lỗi server";
            }
        }// thêm thông tin chi tiết cho RAM
        public async Task<ResultReturn> phanLoaiSP(string type, InfoProduct infoProduct, InfoDesc infoDesc, InfoDetailsModel infoDetail)
        {
            ResultReturn result = new ResultReturn();
            if(string.IsNullOrEmpty(type) || type == "NULL" || type == "null" || type.ToLower() == "null")
            {
                result.Code = 2;
                result.Message = "Thiếu loại sản phẩm";
                return result;
            }
            else
            {
                // kiểm tra tồn tại của sản phẩm
                var checkCodeProduct = await _db.Products.FirstOrDefaultAsync(ccode => ccode.Code == infoProduct.code);
                if (checkCodeProduct == null)
                { 
                    result.Code = 1;
                    result.Message = "Sản phẩm đã tồn tại";
                }

                // up load ảnh Product
                string urlAvt = await upImageProduct_Avt(infoProduct.avtBase64, infoProduct.code);

                // up load ảnh chi tiết Product
                var shareDetails = infoDetail.shareDetails; // thông tin chung 
                var prvDetails = infoDetail.prvDetails; // thông tin riêng
                string urlCatalogs = await upImageCatalogs(shareDetails?.catalogs ?? Array.Empty<string>(), infoProduct.code);

                // up load ảnh desc Product
                string[] urlDesc = await upImageDesc(infoDesc.detailDesList, infoProduct.code);

                // lưu Product vào database và lấy idProduct
                int? idProduct = await addProducts(infoProduct, urlAvt);
                
                // lưu Desc của sản phẩm
                int? addDesc = await addDescs(idProduct, infoDesc);

                if (urlAvt == "Lỗi lưu ảnh")
                {
                    result.Code = 6;
                    result.Message = "Lỗi lưu ảnh";
                    return result;
                }
                if (urlAvt == "Lỗi server lưu ảnh")
                {
                    result.Code = 7;
                    result.Message = "Lỗi server lưu ảnh";
                    return result;
                }
                if (idProduct == -1 ||  addDesc == -1)
                {
                    result.Code = 3;
                    result.Message = "Sản phẩm đã tồn tại";
                    return result;
                }
                if(idProduct == 3 || addDesc == 3)
                {
                    result.Code = 4;
                    result.Message = "Lỗi lưu ảnh";
                    return result;
                }
                if(idProduct == 4 || addDesc == 4)
                {
                    result.Code = 5;
                    result.Message = "Lỗi server lưu ảnh";
                    return result;
                }

                switch (type)
                {
                    case "ram":
                        InfoRam infoRam = new InfoRam
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            catalogs = shareDetails?.catalogs ?? Array.Empty<string>(),
                            details = shareDetails?.details,
                            capacity = prvDetails?.InfoRam?.capacity ?? string.Empty,
                            bus = prvDetails?.InfoRam?.bus ?? string.Empty,
                            type = prvDetails?.InfoRam?.type ?? string.Empty,
                        };

                        string mes_add_ram = await AddRam(infoRam, idProduct, urlCatalogs);

                        if(mes_add_ram == "OK")
                        {
                            result.Code = 0;
                            result.Message = "Thêm sản phẩm thành công";
                            return result;
                        }
                        break;

                    case "disk":

                        break;

                    default:
                        result.Code = 7;
                        result.Message = $"Không tìm thấy loại sản phẩm: {type}";
                        return result;
                }
            }
            return result;
        }

        public async Task<ResultReturn> PutAddProductServices(InfoProduct infoProduct, InfoDesc infoDesc, InfoDetailsModel infoDetail)
        {
            ResultReturn result = new ResultReturn();
            
            if (infoProduct == null || infoDesc == null || infoDetail == null )
            {
                result.Code = 1;
                result.Message = "Thiếu thông tin sản phẩm";
                return result;
            }

            string type = infoProduct.type; // lấy loại sản phẩm
            if(string.IsNullOrEmpty(type) || type == "NULL" || type == "null" || type.ToLower() == "null")
            {
                result.Code = 2;
                result.Message = "Thiếu loại sản phẩm";
                return result;
            }
            ResultReturn sw = await phanLoaiSP(type, infoProduct, infoDesc, infoDetail);
            result.Code = sw.Code;
            result.Message = sw.Message;
            return result;
        }
        #endregion
    }
}
