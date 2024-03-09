using Microsoft.EntityFrameworkCore.Infrastructure;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Http;

namespace BackEndApis.Helper
{
    public class Info
    {
        #region Thông tin login
        //=== login ===//
        public class InfoLogin
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
        #endregion

        #region Thông tin admin
        //=== thông tin admin ===//
        public class InfoAdmin
        {
            public int? id { get; set; }
            public string userName { get; set; } = string.Empty;
            public string password { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string fullName { get; set; } = string.Empty;
            public int age { get; set; }
            public string phone { get; set; } = string.Empty;
            public string fb { get; set; } = string.Empty;
            public string address { get; set; } = string.Empty;
        }
        #endregion

        #region Thông tin user
        //=== thông tin user ===//
        public class InfoUser
        {
            public int? Id_account { get; set; }
            public string email { get; set; } = string.Empty;
            public string password { get; set; } = string.Empty;
            public string googleId { get; set; } = string.Empty;
            public string authType { get; set; } = string.Empty;
            public int failedLoginTimes { get; set; } = 0;
            public string refreshToken { get; set; } = string.Empty;

            public string fullName { get; set; } = string.Empty;
            public DateTime birthDay { get; set; }
            public string gender { get; set; } = string.Empty;
            public string address { get; set; } = string.Empty;
        }
        #endregion

        #region Thông tin cấu trúc các Request 

        #region Request thông tin khi thêm sản phẩm sản phẩm
        //=== Request tổng thể khi thêm Product ===//
        public class ProductRequestModel
        {
            public InfoProduct? product { get; set; }
            public InfoDescModel? desc { get; set; }
            public InfoDetailsModel? details { get; set; }
        }

        //=== desc Product ===//
        public class InfoDescModel
        {
            public string? title { get; set; }
            public Detail_DesModel[]? detailDesList { get; set; }
        }
        public class Detail_DesModel
        {
            public string? content { get; set; }
            public string? urlPhoto { get; set; }
            public string? photo { get; set; } // chứa chuỗi base64
        }

        //=== details Product map to request ===//
        public class InfoDetailsModel
        {
            public InfoDetail? shareDetails { get; set; }
            public InfodescPrvDetails? prvDetails { get; set; }
        }
        public class InfodescPrvDetails
        {
            public InfoRam? InfoRam { get; set; }
            public InfoDisk? InfoDisk { get; set; }
            public InfoLaptop? InfoLaptop { get; set; }
            public InfoDisplay? InfoDisplay { get; set; }
            public InfoMainBoard? InfoMainBoard { get; set; }

            public InfoHeadphone? InfoHeadphone { get; set; }
            public InfoKeyboard? InfoKeyboard { get; set; }
            public InfoMonitor? InfoMonitor { get; set; }
            public InfoMouse? InfoMouse { get; set; }
            public InfoRouter? InfoRouter { get; set; }
            public InfoSpeaker? InfoSpeaker { get; set; }

            public InfoCamera? InfoCamera { get; set; }
            public InfoWebcam? InfoWebcam { get; set; }
        }
        #endregion

        #endregion

        #region Thông tin sản phẩm
        //=== thông tin Product ===//
        public class InfoProduct
        {
            // id
            public int? id_product { get; set; }
            // mã sản phẩm
            public string code { get; set; } = string.Empty;
            // tên sản phẩm
            public string name { get; set; } = string.Empty;
            // giá sản phẩm
            public int? price { get; set; }
            // loại sản phẩm
            // 0 - laptop, 1 - disk, 2 - display, 3 - mainboard, 4 - ram
            // 5 - mobile, 6 -backupCharger, 7 - headphone, 8 - keyboard
            // 9 - monitor, 10 - mouse, 11 - router, 12 - speaker
            // 13 - camera, 14 - webcam
            public string type { get; set; } = string.Empty;
            // thương hiệu sản phẩm
            public string brand { get; set; } = string.Empty;
            // avatar: đường dẫn ảnh đại diện của sản phẩm
            public string avt { get; set; } = string.Empty;
            // avatar: base64
            public string avtBase64 { get; set; } = string.Empty;

            // stock: số lượng sản phẩm tồn kho
            public int? stock { get; set; }
            // discount: phần trăm giảm giá sản phẩm
            public string discount { get; set; } = string.Empty;
            // rate: đánh giá sản phẩm
            // đánh giá 1 - 5 sao, tương ứng với index element từ 0 - 4
            public int? rate { get; set; }
            // other_info: thông tin khác của sản phẩm
            // các thông tin khác kèm theo, lưu với dạng {key: value}
            // vd: {key: 'ưu đãi kèm theo', value: 'Một con chuột không dây'}
            public string other_info { get; set; } = string.Empty;
        }

        //=== details Product ===//
        public class InfoDetail
        {
            // warranty: thời gian bảo hành theo tháng
            public string warranty { get; set; } = string.Empty;

            public string linkCatalogs {  get; set; } = string.Empty;
            // catalogs: link hình ảnh sản phẩm 
            public string[] catalogs { get; set; } = Array.Empty<string>();
            // details: bài viết mô tả chi tiết
            public int? details { get; set; }
        } // cha chứa các thông tin cơ bản của 1 product 
        
        #region computer model
        //=== thông tin ram ===//
        public class InfoRam : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // capacity: dung lượng ram
            public string capacity { get; set; } = string.Empty;
            // bus của ram MHz
            public string bus { get; set; } = string.Empty;
            // type: thế hệ ram 
            //thế hệ RAM, hay loại RAM: DDR3, DDR3L, DDR4
            public string type { get; set; } = string.Empty;
        }
        //=== thông tin disk (ổ cứng) ===//
        public class InfoDisk : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // dung lượng tính theo GB
            public string capacity { get; set; } = string.Empty;
            // kích thước ổ đĩa.
            // 0 - 2.5", 1 - 3.5", 2 - M.2 2880, 3 - M.2
            public string size { get; set; } = string.Empty;

            // kiểu ổ cứng 0 - HDD, 1 - SSD
            public string type { get; set; } = string.Empty;
            // chuẩn kết nối
            // 0 - SATA 3, 1 - USB 3.0, 2 - M.2 SATA, 3 - M.2 NVMe
            public string connectionStd { get; set; } = string.Empty;

            /*// tốc độ của đĩa (HDD thì có rpm)
            // tốc độ đọc tính theo MB/s
            readSpeed: { type: Number, default: 0 },
            // tốc độ ghi tính theo MB/s
            writeSpeed: { type: Number, default: 0 },
            // tốc độ vòng xoay tính theo RPM
            rpm: { type: Number, default: 1500 },
                },*/
            public int? readSpeed { get; set; }
            public int? writeSpeed {  get; set; }
            public int? rpm { get; set; }
        }

        //=== thông tin laptop ===//
        public class InfoLaptop : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }

            // chi tiết về cpu
            /*cpu: {
            vd: Intel
                chipBrand: { type: String, trim: true },
                processorCount: { type: Number, default: 1 },
                // 0 - core i3, 1 - core i5, 2 - core i7, 3 - core i9,
                // 4 - Ryzen 3, 5 - Ryzen 5, 6 - Ryzen 7, 7 - Pentium, 8 - Celeron
                series: { type: Number, enum: [...Array(9).keys()], default: 0 },
                // 9750H up to 4.5 GHz
                detail: { type: String, trim: true },
            },*/
            public string chipBrand { get; set; } = string.Empty;
            public string processorCount { get; set; } = string.Empty;
            public string series { get; set; } = string.Empty;
            public string detailCpu { get; set; } = string.Empty;

            // độ phần giải màn hình: 15.6" (1920 x 1080), 60Hz
            public string displaySize { get; set; } = string.Empty;
            // card màn hình: NVIDIA GeForce RTX 2080 Super 8GB GDDR6
            public string display { get; set; } = string.Empty;
            // hệ điều hành: Windows 10 Home 64-bit
            public string operating { get; set; } = string.Empty;
            // dung lượng ổ cứng: 1TB SSD M.2 NVMe
            public string disk { get; set; } = string.Empty;
            // dung lượng RAM: 2 x 16GB DDR4 2933MHz
            public string ram { get; set; } = string.Empty;
            // pin: 4 cell 84 Wh Pin liền
            public string pin { get; set; } = string.Empty;
            //khối lượng: 2.1 kg
            public string weight { get; set; } = string.Empty;
        }

        //=== thông tin display (card màn hình) ===//
        public class InfoDisplay : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // dung lượng tính theo GB
            public string capacity { get; set; } = string.Empty;
            // nhà sản xuất
            public string manufactuner {  get; set; } = string.Empty;
        }

        //=== thông tin mainboard ===//
        public class InfoMainBoard : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // loại chipset: vd 'Z490'
            public string chipset { get; set; } = string.Empty;
            // series mainboard: vd 'KHT'
            public string series { get; set; } = string.Empty;
            // loại socket: 0 - 1151-v2, 1 - 1200, 2 - AM4, 3 - 1151, 4 - sTRX
            public string socketType { get; set; } = string.Empty;
            // chuẩn kích thước: 0 - Micro-ATX, 1 - ATX, 2 - Extended-ATX, 3 - Mini-ATX, 4 - XL-ATX
            public string sizeStd { get; set; } = string.Empty;
        }
        #endregion

        #region peripheral model (phụ kiện, gear)
        //=== headphone ===//
        public class InfoHeadphone : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // kiểu tai nghe 0 - Over-ear, 1 - In-ear, 2 - On-ear, 3 - KHT
            public string type { get; set; } = string.Empty;
            // chuẩn kết nối
            // 0 - 3.5mm, 1 - bluetooth, 2 - USB, 3 - Bluetooth 4.0, 4 - bluetooth 5.0, 5 - 2.4 GHz Wireless
            public string connectionStd { get; set; } = string.Empty;
        }

        //=== keyboard ===//
        public class InfoKeyboard : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // kiểu bàn phím: 0 - thường, 1 - giả cơ, 2 - cơ
            public string type { get; set; } = string.Empty;
            // màu bàn phím: 0 - đen, 1 - bạc, 2 - trắng, 3 - hồng, 4 - khác
            public string color { get; set; } = string.Empty;
            // màu led bàn phím: 0 - không led, 1- đơn sắc, 2 - rainbow, 3 - RGB
            public string ledColor { get; set; } = string.Empty;
        }

        //=== monitor (màn hình) ===//
        public class InfoMonitor : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // tấm nền màn hình: 0 - IPS, 1 - VA, 2 - TN, 3 - PLS, 4 - MVA, 5 - KHT
            public string bgPlate { get; set; } = string.Empty;
            // độ phân giải: 0 - 1920x1080, 1 - 2560x1440, 3 - 1366x768, 4 - 1600x900
            // 5 - 3840x2160, 6 - 2560x1080, 7 - 3440x1440
            public string resolution { get; set; } = string.Empty;
            // kích thước màn hình theo inch: vd 27.4"
            public string displaySize { get; set; } = string.Empty;
            // tần số quét theo Hz
            public string frequency { get; set; } = string.Empty;
            // các công kết nối, vd: 1 x HDMI, 1 x DVI-D, 1 x VGA/D-sub
            public string port { get; set; } = string.Empty;
        }

        //=== mouse (chuột) ===//
        public class InfoMouse : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // loại chuột: 0 - có dây, 1 - không dây
            public string type { get; set; } = string.Empty;
            // có led hay không
            public string isLed { get; set; } = string.Empty;
        }

        //=== router (wifi) ===//
        public class InfoRouter : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // băng thông: 0 - '2.4 GHz', 1 - '2.4 GHz/5 GHz'
            public string bandwidth { get; set; } = string.Empty;
            // độ mạnh của ăng ten tính theo dBi
            public string strong { get; set; } = string.Empty;
            // số cổng kết nối: '1xWAN Gigabit'
            public string numberOfPort { get; set; } = string.Empty;
        }

        //=== speaker (loa) ===//
        public class InfoSpeaker : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // công suất tổng tính theo W
            public string wattage { get; set; } = string.Empty;
            // loại cổng kết nối
            public string connectionPort { get; set; } = string.Empty;
        }
        #endregion
        
        #region camera model
        //=== thông tin camera ===//
        public class InfoCamera : InfoDetail
        {
            // id_product
            public int? id_product { get; set; }
            // aperture: khẩu dộ: 'f/4-5.6 IS STM'
            public string aperture { get; set; } = string.Empty;
            // focal_length: tiêu cự tính theo mm
            public string focal_length { get; set; } = string.Empty;
            //sensor: cảm biến 'CMOS APS-C 24.2MP'
            public string sensor { get; set; } = string.Empty;
            // numberOfPixel: số điểm ảnh
            public string numberOfPixel { get; set; } = string.Empty;
            // resolution: độ phân giải
            // (vd: 6000 x 4000 (L) 3984 x 2656 (M) 2976 x 1984 (S1) 2400 x 1600 (S2) 6000 x 4000 (RAW)
            public string resolution { get; set; } = string.Empty;
        }

        //=== thông tin webcam ===//
        public class InfoWebcam : InfoDetail
        {
            // id product
            public int? id_product { get; set; }
            // chuẩn kết nối: 0 - USB, 1 - USB 2.0
            public string connectionStd { get; set; } = string.Empty;
            // tốc độ khung hình: 30fps
            public string frameSpeed { get; set; } = string.Empty;
            // độ phân giải: 0 - 720, 1 - 1280x720, 2 - 1920x1800
            public string resolution { get; set; } = string.Empty;
        }
        #endregion

        //=== comment (bình luận) ===//
        public class InfoComment
        {
            // id_product
            public int? id_product { get; set; }
            // autor: người bình luận
            public string author { get; set; } = string.Empty;
            //time: thời gian
            public DateTime time { get; set; }
            // rate: 
            public string rate { get; set; } = string.Empty;
            // content: nội dung
            public string content { get; set; } = string.Empty;
        }

        //=== orders ===//
        #endregion

        #region Kết quả trả về
        public class ResultReturn
        {
            public int Code { get; set; }
            public string Message { get; set; } = string.Empty;
        }
        #endregion
    }
}
