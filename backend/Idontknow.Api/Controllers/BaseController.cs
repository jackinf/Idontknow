using System;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using FluentValidation.Results;
using Idontknow.Domain.ViewModels;
using Idontknow.Domain.ViewModels.Result;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Idontknow.Api.Controllers
{
    public abstract class BaseController : Controller
    {
        private readonly ILogger _logger;

        protected BaseController(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Main wrapper around every controller action.
        /// </summary>
        /// <param name="handler"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        [DebuggerStepThrough]
        protected async Task<IActionResult> HandleResultAsync<T>(Func<Task<ServiceResult<T>>> handler)
        {
            try
            {
                var result = await handler.Invoke(); // Execute the service method.

                if (result.IsSuccessful)
                    return Ok(result);
                if (result.StatusCode != HttpStatusCode.BadRequest && result.StatusCode != 0)
                    return ReturnErrorResult(result.Validation, result.StatusCode);

                return ReturnErrorResult(result.Validation);
            }
            catch (Exception e)
            {
                var remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;
                _logger.LogError($"HandleResult failed! IP: {remoteIpAddress}. Reason: {e.Message}. Stacktrace: {e.StackTrace}");
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Returns errors. TODO: Move outside
        /// </summary>
        /// <param name="result"></param>
        /// <param name="statusCode"></param>
        /// <returns></returns>
        private IActionResult ReturnErrorResult(ValidationResult result, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            if (result == null)
            {
                return BadRequest();
            }

            if (result.Errors != null)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }
            }

            if (ModelState.IsValid)
            {
                // No ModelState errors are available to send, so just return an empty BadRequest.
                return BadRequest();
            }

            if (statusCode == HttpStatusCode.BadRequest) 
                return BadRequest(ModelState);
            
            {
                var error = new
                {
                    Message = "The request is invalid.",
                    ModelState = new
                    {
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    }
                };
                return StatusCode((int)HttpStatusCode.BadRequest, error);
            }
        }
    }
}