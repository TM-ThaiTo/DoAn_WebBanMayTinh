using BackEndApis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ServicesContex _sc;

        public AdminController(ServicesContex sc)
        {
            _sc = sc;
        }

        // thêm tài khoản admin
        [HttpPost("add-admin")]
        public IActionResult PostVerify()
        {

            return Ok("Test add admin");
        }
    }
}
