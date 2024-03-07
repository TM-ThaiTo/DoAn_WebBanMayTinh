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

        #region CRUD Product

        #region image to cloudinary
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
                    var folderPath = $"products/{code}/catalogs";

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
        public async Task<string> upImageDesc(string imageBase64, string code)
        {
            try
            {
                // Upload ảnh lên Cloudinary
                if (!string.IsNullOrEmpty(imageBase64))
                {
                    // Set the folder path including the product code
                    var folderPath = $"products/{code}/desc";

                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription("image", new MemoryStream(Convert.FromBase64String(imageBase64))),
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
        } // up image Desc Product
        public async Task<string> DeleteFolder(string? code)
        {
            try
            {
                // Construct the folder path (prefix in Cloudinary)
                var folderPath = $"products/{code}";

                /*// Use Cloudinary API to list all resources in the folder
                var listResourcesParams = new ListResourcesByPrefixParams { Prefix = folderPath };*/
/*
                var resources = await _cloudinary.ListResourcesAsync(listResourcesParams);*/

                var deleteFolderResult = await _cloudinary.DeleteFolderAsync(folderPath);

                return "Delete operation completed successfully.";
            }
            catch (Exception ex)
            {
                // Handle exceptions or log errors as needed
                return $"Error deleting folder: {ex.Message}";
            }
        } // xóa folder ảnh
        #endregion

        #region Create Product
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
        public async Task<int?> addDescs(int? idProduct, InfoDescModel infoDesc, string content, string urlImage)
        {
            try
            {
                BackEndApis.Models.Description addDesc = new BackEndApis.Models.Description
                {
                    IdProduct = idProduct,
                    Title = infoDesc.title,
                    Description1 = content,
                    Image = urlImage,
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
        public async Task<ResultReturn> addDetailProduct(int? idProduct, string type, InfoDetailsModel detail, string urlCatalogs)
        {
            ResultReturn result = new ResultReturn();
            var shareDetails = detail.shareDetails; // thông tin chung 
            var prvDetails = detail.prvDetails; // thông tin riêng

            switch (type)
            {
                #region computer
                case "ram":
                    try
                    {
                        InfoRam infoRam = new InfoRam
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,
                            capacity = prvDetails?.InfoRam?.capacity ?? string.Empty,
                            bus = prvDetails?.InfoRam?.bus ?? string.Empty,
                            type = prvDetails?.InfoRam?.type ?? string.Empty,
                        };
                        BackEndApis.Models.Ram aRam = new BackEndApis.Models.Ram
                        {
                            IdProduct = idProduct,
                            Capacity = infoRam.capacity,
                            Bus = infoRam.bus,
                            Type = infoRam.type,

                            Warranty = infoRam.warranty,
                            Catalogs = urlCatalogs,
                            Details = infoRam.details,
                        };
                        _db.Rams.Add(aRam);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail Ram

                case "disk":
                    try
                    {
                        InfoDisk infoDisk = new InfoDisk
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            capacity = prvDetails?.InfoDisk?.capacity ?? string.Empty,
                            size = prvDetails?.InfoDisk?.size ?? string.Empty,
                            type = prvDetails?.InfoDisk?.type ?? string.Empty,
                            connectionStd = prvDetails?.InfoDisk?.connectionStd ?? string.Empty,
                            speed = prvDetails?.InfoDisk?.speed ?? string.Empty,
                        };

                        BackEndApis.Models.Disk aDisk = new BackEndApis.Models.Disk
                        {
                            IdProduct = idProduct,
                            Capacity = infoDisk.capacity,
                            Warranty = infoDisk.warranty,
                            Details = infoDisk.details,

                            Size = infoDisk.size,
                            Type = infoDisk.type,
                            ConnectionStd = infoDisk.connectionStd,
                            Speed = infoDisk.speed,
                            Catalogs = urlCatalogs,
                        };

                        _db.Disks.Add(aDisk);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail Disk

                case "laptop":
                    try
                    {
                        InfoLaptop infoLaptop = new InfoLaptop
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            cpu = prvDetails?.InfoLaptop?.cpu ?? string.Empty,
                            displaySize = prvDetails?.InfoLaptop?.displaySize ?? string.Empty,
                            display = prvDetails?.InfoLaptop?.display ?? string.Empty,
                            operating = prvDetails?.InfoLaptop?.operating ?? string.Empty,
                            disk = prvDetails?.InfoLaptop?.disk ?? string.Empty,
                            ram = prvDetails?.InfoLaptop?.ram ?? string.Empty,
                            pin = prvDetails?.InfoLaptop?.pin ?? string.Empty,
                            weight = prvDetails?.InfoLaptop?.weight ?? string.Empty,
                        };
                        BackEndApis.Models.Laptop aLaptop = new BackEndApis.Models.Laptop
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Details = infoLaptop.details,
                            Warranty = infoLaptop.warranty,

                            Cpu = infoLaptop.cpu,
                            DisplaySize = infoLaptop.displaySize,
                            Display = infoLaptop.display,
                            Operating = infoLaptop.operating,
                            Disk = infoLaptop.disk,
                            Ram = infoLaptop.ram,
                            Pin = infoLaptop.pin,
                            Weight = infoLaptop.weight,
                        };

                        _db.Laptops.Add(aLaptop);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail Laptop

                case "display":
                    try
                    {
                        InfoDisplay infoDisplay = new InfoDisplay
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            capacity = prvDetails?.InfoDisplay?.capacity ?? string.Empty,
                            manufactuner = prvDetails?.InfoDisplay?.manufactuner ?? string.Empty,
                        };
                        BackEndApis.Models.Display aDisplay = new BackEndApis.Models.Display
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoDisplay.warranty,
                            Details = infoDisplay.details,

                            Capacity = infoDisplay.capacity,
                            Manufacturer = infoDisplay.manufactuner,
                        };

                        _db.Displays.Add(aDisplay);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail display

                case "mainboard":
                    try
                    {
                        InfoMainBoard infoMainBoard = new InfoMainBoard
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            chipset = prvDetails?.InfoMainBoard?.chipset ?? string.Empty,
                            series = prvDetails?.InfoMainBoard?.series ?? string.Empty,
                            socketType = prvDetails?.InfoMainBoard?.socketType ?? string.Empty,
                            sizeStd = prvDetails?.InfoMainBoard?.sizeStd ?? string.Empty,
                        };

                        BackEndApis.Models.Mainboard aMainboard = new BackEndApis.Models.Mainboard
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoMainBoard.warranty,
                            Details = infoMainBoard.details,

                            Chipset = infoMainBoard.chipset,
                            Series = infoMainBoard.series,
                            SocketType = infoMainBoard.socketType,
                            SizeStd = infoMainBoard.sizeStd,
                        };

                        _db.Mainboards.Add(aMainboard);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail mainboard
                #endregion

                #region phụ kiện
                case "headphone":
                    try
                    {
                        InfoHeadphone infoHeadPhone = new InfoHeadphone
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            type = prvDetails?.InfoHeadphone?.type ?? string.Empty,
                            connectionStd = prvDetails?.InfoHeadphone?.connectionStd ?? string.Empty,
                        };

                        BackEndApis.Models.Headphone aHeadPhone = new BackEndApis.Models.Headphone
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoHeadPhone.warranty,
                            Details = infoHeadPhone.details,

                            Type = infoHeadPhone.type,
                            ConnectionStd = infoHeadPhone.connectionStd,
                        };

                        _db.Headphones.Add(aHeadPhone);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail headphone

                case "keyboard":
                    try
                    {
                        InfoKeyboard infoKeyboard = new InfoKeyboard
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            type = prvDetails?.InfoKeyboard?.type ?? string.Empty,
                            color = prvDetails?.InfoKeyboard?.color ?? string.Empty,
                            ledColor = prvDetails?.InfoKeyboard?.ledColor ?? string.Empty,
                        };

                        BackEndApis.Models.Keyboard a = new BackEndApis.Models.Keyboard
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoKeyboard.warranty,
                            Details = infoKeyboard.details,

                            Type = infoKeyboard.type,
                            Color = infoKeyboard.color,
                            LedColor = infoKeyboard.ledColor,
                        };
                        _db.Keyboards.Add(a);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail keyboard

                case "monitor":
                    try
                    {
                        InfoMonitor infoMonitor = new InfoMonitor
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            bgPlate = prvDetails?.InfoMonitor?.bgPlate ?? string.Empty,
                            resolution = prvDetails?.InfoMonitor?.resolution ?? string.Empty,
                            displaySize = prvDetails?.InfoMonitor?.displaySize ?? string.Empty,
                            frequency = prvDetails?.InfoMonitor?.frequency ?? string.Empty,
                            port = prvDetails?.InfoMonitor?.port ?? string.Empty,
                        };

                        BackEndApis.Models.Monitor a = new BackEndApis.Models.Monitor
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoMonitor.warranty,
                            Details = infoMonitor.details,

                            BgPlate = infoMonitor.bgPlate,
                            Resolution = infoMonitor.resolution,
                            DisplaySize = infoMonitor.displaySize,
                            Frequency = infoMonitor.frequency,
                            Port = infoMonitor.port,
                        };
                        _db.Monitors.Add(a);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail monitor

                case "mouse":
                    try
                    {
                        InfoMouse infoMouse = new InfoMouse
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            type = prvDetails?.InfoMouse?.type ?? string.Empty,
                            isLed = prvDetails?.InfoMouse?.isLed ?? string.Empty,   
                        };

                        BackEndApis.Models.Mouse a = new BackEndApis.Models.Mouse
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoMouse.warranty,
                            Details = infoMouse.details,

                            Type = infoMouse.type,
                            IsLed = infoMouse.isLed,
                        };
                        _db.Mouses.Add(a);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail mouse

                case "router":
                    try
                    {
                        InfoRouter infoRouter = new InfoRouter
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            bandwidth = prvDetails?.InfoRouter?.bandwidth ?? string.Empty,
                            strong = prvDetails?.InfoRouter?.strong ?? string.Empty,
                            numberOfPort = prvDetails?.InfoRouter?.numberOfPort ?? string.Empty,
                        };
                        BackEndApis.Models.Router a = new BackEndApis.Models.Router
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoRouter.warranty,
                            Details = infoRouter.details,

                            Bandwidth = infoRouter.bandwidth,
                            Strong = infoRouter.strong,
                            NumberOfPort = infoRouter.numberOfPort,
                        };
                        _db.Routers.Add(a);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail router 

                case "speaker":
                    try
                    {
                        InfoSpeaker infoSpeaker = new InfoSpeaker
                        {
                            warranty = shareDetails?.warranty ?? string.Empty,
                            details = shareDetails?.details,

                            wattage = prvDetails?.InfoSpeaker?.wattage ?? string.Empty,
                            connectionPort = prvDetails?.InfoSpeaker?.connectionPort ?? string.Empty,
                        };
                        BackEndApis.Models.Speaker a = new BackEndApis.Models.Speaker
                        {
                            IdProduct = idProduct,
                            Catalogs = urlCatalogs,
                            Warranty = infoSpeaker.warranty,
                            Details = infoSpeaker.details,

                            Wattage = infoSpeaker.wattage,
                            ConnectionPort = infoSpeaker.connectionPort,
                        };
                        _db.Speakers.Add(a);
                        await _db.SaveChangesAsync();
                        result.Code = 0;
                        result.Message = $"Thêm sản phẩm {type} thành công";
                    }
                    catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi lưu sản phẩm vào database";
                    }
                    break; // add detail speaker
                #endregion

                default:
                    result.Code = 7;
                    result.Message = $"Không tìm thấy loại sản phẩm: {type}";
                    return result;
            }
            return result;
        }
        public async Task<ResultReturn> phanLoaiSP(string type, InfoProduct infoProduct, InfoDescModel infoDescModel, InfoDetailsModel infoDetail)
        {
            ResultReturn result = new ResultReturn();
            if (string.IsNullOrEmpty(type) || type == "NULL" || type == "null" || type.ToLower() == "null")
            {
                result.Code = 2;
                result.Message = "Thiếu loại sản phẩm";
                return result;
            }
            else
            {
                // kiểm tra tồn tại của sản phẩm
                var checkCodeProduct = await _db.Products.FirstOrDefaultAsync(ccode => ccode.Code == infoProduct.code);
                if (checkCodeProduct != null)
                {
                    result.Code = 1;
                    result.Message = "Sản phẩm đã tồn tại";
                    return result;
                }

                // up load ảnh Product
                string urlAvt = await upImageProduct_Avt(infoProduct.avtBase64, infoProduct.code);

                // up load ảnh chi tiết Product
                var shareDetails = infoDetail.shareDetails; // thông tin chung 
                var prvDetails = infoDetail.prvDetails; // thông tin riêng
                string urlCatalogs = await upImageCatalogs(shareDetails?.catalogs ?? Array.Empty<string>(), infoProduct.code);

                // lưu Product vào database và lấy idProduct
                int? idProduct = await addProducts(infoProduct, urlAvt);

                // lưu Desc của sản phẩm xuống database
                if (infoDescModel != null)
                {
                    if (infoDescModel.detailDesList != null)
                    {
                        foreach (var detailDesc in infoDescModel.detailDesList)
                        {
                            if (detailDesc != null)
                            {
                                string urlImage = await upImageDesc(detailDesc.photo ?? "", infoProduct.code);
                                int? addDesc = await addDescs(idProduct, infoDescModel, detailDesc.content ?? "", urlImage);
                            }
                        }
                    }
                }

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
                if (idProduct == 3)
                {
                    result.Code = 4;
                    result.Message = "Lỗi lưu ảnh";
                    return result;
                }
                if (idProduct == 4)
                {
                    result.Code = 5;
                    result.Message = "Lỗi server lưu ảnh";
                    return result;
                }
                result = await addDetailProduct(idProduct, type, infoDetail, urlCatalogs);
            }
            return result;
        }
        public async Task<ResultReturn> PutAddProductServices(InfoProduct infoProduct, InfoDescModel infoDesc, InfoDetailsModel infoDetail)
        {
            ResultReturn result = new ResultReturn();

            if (infoProduct == null || infoDesc == null || infoDetail == null)
            {
                result.Code = 1;
                result.Message = "Thiếu thông tin sản phẩm";
                return result;
            }

            string type = infoProduct.type; // lấy loại sản phẩm
            if (string.IsNullOrEmpty(type) || type == "NULL" || type == "null" || type.ToLower() == "null")
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

        #region Read Product
        public async Task<string[]> TachLinkImage(string urlCatalogs)
        {
            string[] urls = urlCatalogs.Split('~');
            await Task.Delay(0);
            return urls;
        }
        #endregion

        #region Update Product

        #endregion

        #region Delete Product
        public async Task<ResultReturn> deleteDetail(string type, int idProduct)
        {
            ResultReturn result = new ResultReturn();
            // xóa Detail
            switch (type)
            {
                case "ram":
                    try
                    {
                        var delram = await _db.Rams.FirstOrDefaultAsync(d => d.IdProduct == idProduct);
                        if (delram != null)
                        {
                            _db.Rams.RemoveRange(delram);
                            await _db.SaveChangesAsync();
                            result.Code = 0;
                            result.Message = "OK";
                        } else
                        {
                            result.Code = 3;
                            result.Message = $"Lỗi xóa detail: {type}";
                        }
                    } catch
                    {
                        result.Code = 4;
                        result.Message = "Lỗi server";
                    }
                    break;

                default:
                    break;
            }

            return result;
        }
        public async Task<ResultReturn> DeleteDetailProduct(int? idProductDel)
        {
            ResultReturn result = new ResultReturn();
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == idProductDel);

            if (product == null)
            {
                result.Code = 1;
                result.Message = "Không tìm thấy sản phẩm cần xóa";
                return result;
            }
            try
            {
                string type = product.Type ?? string.Empty;
                
                // xóa Desc
                var descriptions = await _db.Descriptions
                   .Where(d => d.IdProduct == product.Id)
                   .ToListAsync();
                if (descriptions.Any())
                {
                    _db.Descriptions.RemoveRange(descriptions);
                    await _db.SaveChangesAsync();
                }
                
                // xóa chi tiết product
                result = await deleteDetail(type, product.Id);
                
                // xóa product chính
                if (product != null)
                {
                    _db.Products.RemoveRange(product);
                    /*string delFolder = await DeleteFolder(product.Code);*/
                    await _db.SaveChangesAsync();
                    result.Code = 0;
                    result.Message = "Xóa sản phẩm thành công";
                }
            }
            catch
            {
                result.Code = 2;
                result.Message = "Không tìm thấy mô tả để xóa";
            }
            
            return result;
        }
        public async Task<ResultReturn> DeleteProduct(int? idProduct)
        {
            ResultReturn kqDelete = await DeleteDetailProduct(idProduct);
            return kqDelete;
        }
        #endregion
        
        #endregion
    }
}
