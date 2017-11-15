using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using FluentValidation.Results;

namespace Idontknow.Domain.ViewModels.Result
{
    public abstract class ServiceBaseResult<TPayload>
    {
        public bool IsSuccessful { get; set; }
        public ValidationResult Validation { get; set; }
        public TPayload Payload { get; set; }
        public int Pages { get; set; } = 1;
        public int TotalItems { get; set; }

        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }

        public void AddErrors(ValidationResult validation)
        {
            if (Validation == null)
                Validation = new ValidationResult();
            foreach (var error in validation.Errors)
            {
                IsSuccessful = false;
                Validation.Errors.Add(error);
            }
        }

    }
    

}