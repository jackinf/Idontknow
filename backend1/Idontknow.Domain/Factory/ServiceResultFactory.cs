using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using FluentValidation.Results;
using Idontknow.Domain.ViewModels.Result;

namespace Idontknow.Domain.Factory
{
    public static class ServiceResultFactory
    {
        public static ServiceResult<TPayload> Success<TPayload>()
        {
            var result = new ServiceResult<TPayload>();
            result.IsSuccessful = true;
            return result;
        }

        public static ServiceResult<TPayload> Success<TPayload>(TPayload payload, string message = "")
        {
            var result = new ServiceResult<TPayload>();
            result.IsSuccessful = true;
            result.Payload = payload;
            result.Message = message;
            return result;
        }

        public static ListServiceResult<List<TPayload>> SuccessWithPaginator<TPayload>(PaginatedListResult<TPayload> paginatedListResult, string message = "")
        {
            var result = new ListServiceResult<List<TPayload>>();
            result.IsSuccessful = true;
            result.Payload = paginatedListResult.ContextObjects;
            result.Pages = paginatedListResult.Pages;
            result.TotalItems = paginatedListResult.TotalCount;
            result.Message = message;
            return result;
        }

        public static ServiceResult<TPayload> Fail<TPayload>(ValidationResult validation)
        {
            var result = new ServiceResult<TPayload>();
            result.IsSuccessful = false;
            result.Validation = validation;
            return result;
        }

        public static ServiceResult<TPayload> Fail<TPayload>(string error) 
            => Fail<TPayload>(new List<string> { error }, HttpStatusCode.BadRequest);

        /// <summary>
        /// Possibility to give different StatusCode than 400
        /// </summary>
        /// <param name="error"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public static ServiceResult<TPayload> Fail<TPayload>(string error, HttpStatusCode status) 
            => Fail<TPayload>(new List<string> { error }, status);

        public static ServiceResult<TPayload> Fail<TPayload>(IEnumerable<string> errors, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            var result = new ServiceResult<TPayload>();
            result.IsSuccessful = false;
            result.Validation = new ValidationResult(errors.Select(error => new ValidationFailure(string.Empty, error)));   // TODO: string.Empty - should be correct property
            result.StatusCode = statusCode;
            return result;
        }

        public static ServiceResult<TPayload> Fail<TPayload>(Exception exception)
        {
            var result = new ServiceResult<TPayload>
            {
                IsSuccessful = false,
                Validation = new ValidationResult(
                    new List<ValidationFailure> { new ValidationFailure(string.Empty, exception.Message) })
            };
            return result;
        }

        public static ServiceResult<TPayload> Fail<TPayload>(IList<ValidationFailure> errors)
        {
            var result = new ServiceResult<TPayload>
            {
                IsSuccessful = false,
                Validation = new ValidationResult(errors.Select(error => new ValidationFailure(error.PropertyName, error.ErrorMessage)))
            };
            return result;
        }

        public static ServiceResult<TPayload> FailOrSuccess<TPayload>(bool success, TPayload payload, string message = "", IEnumerable<ValidationFailure> errors = null)
        {
            return success
                ? Success(payload, message)
                : Fail<TPayload>(errors?.ToList());
        }
    }
}