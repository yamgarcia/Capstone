using System.Security.Claims;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {

        ///
        /// Summary:
        ///     Called asynchronously before the action, after model binding is complete.
        ///
        /// Parameters:
        ///   context:
        ///     The Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext.
        ///
        ///   next:
        ///     The Microsoft.AspNetCore.Mvc.Filters.ActionExecutionDelegate. Invoked to execute
        ///     the next action filter or the action itself.
        ///
        /// Returns:
        ///     A System.Threading.Tasks.Task that on completion indicates the filter has executed.
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //* context after the action has been executed
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var username = resultContext.HttpContext.User.GetUsername();

            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByUsernameAsync(username);
            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}