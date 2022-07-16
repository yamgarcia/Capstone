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

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            // var userId = int.Parse(resultContext.HttpContext.User
            //    .FindFirst(ClaimTypes.NameIdentifier).Value);

            var userId = resultContext.HttpContext.User.GetUserId();

            var unitOfWork = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();
            var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            await unitOfWork.Complete();
        }
    }
}