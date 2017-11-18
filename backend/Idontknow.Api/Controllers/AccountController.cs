using System.Threading.Tasks;
using Idontknow.DAL;
using Idontknow.Domain.Factory;
using Idontknow.Domain.ViewModels.Service.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Idontknow.Api.Controllers
{
    [Authorize]
    [Route("Account")]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(
            ILogger<AccountController> logger, 
            UserManager<ApplicationUser> userManager): base(logger)
        {
            _userManager = userManager;
        }

        //
        // POST: /Account/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            return await HandleResultAsync(async () =>
            {
                var user = await _userManager.FindByNameAsync(model.Email);
                if (user != null)
                {
                    return ServiceResultFactory.Fail<IdentityResult>($"Error {StatusCodes.Status409Conflict}");
                }
                
                user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                return ServiceResultFactory.Success(result);
            });
        }
        
    }
}
