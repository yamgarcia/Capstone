using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    ///<summary> This controller should handle issues that appear in the static files after ng build (page reloading issues) </summary>
    public class FallbackController : Controller
    {
        public ActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}