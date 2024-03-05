using BackEndApis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEndApis.Controllers
{
    public class TestController : Controller
    {
        private readonly DbWebBanMayTinhContext _db;

        public TestController(DbWebBanMayTinhContext db)
        {
            _db = db;
        }

        [HttpGet("test-des")]
        public async Task<IActionResult> GetDesc()
        {
            try
            {
                var descriptions = await _db.Descriptions.ToListAsync(); // Lấy toàn bộ bản ghi từ bảng Descriptions



                return Ok(new
                {
                    code = 0,
                    data = descriptions, // Trả về dữ liệu
                    message = "Successfully retrieved all descriptions."
                });
            }
            catch (Exception ex)
            {
                // Xử lý các trường hợp ngoại lệ nếu có
                return StatusCode(500, new
                {
                    code = -1,
                    message = $"Error: {ex.Message}"
                });
            }
        }
    }
}
