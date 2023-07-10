using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Timesheet.Core.ViewModel;
using Microsoft.AspNetCore.Http;

namespace Timesheet.Core.Exceptions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (AccessViolationException avEx)
            {
                _logger.LogError($"Something went wrong: {avEx}");
                await HandleExceptionAsync(httpContext, avEx);
            }
            catch (UnauthorizedAccessException avEx)
            {
                _logger.LogError($"Invalid username and password: {avEx}");
                await HandleExceptionAsync(httpContext, avEx);
            }
            catch (ArgumentOutOfRangeException avEx)
            {
                _logger.LogError($"Somthing went wrongs: {avEx}");
                await HandleExceptionAsync(httpContext, avEx);
            }
            catch (ArgumentNullException avEx)
            {
                _logger.LogError($"value is null: {avEx}");
                await HandleExceptionAsync(httpContext, avEx);
            }
            catch (Exception ex)
            {
                _logger.LogError($"somehting wrong: {ex}");
                await HandleExceptionAsync(httpContext, ex);
            }
        }
        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = context.Response;

            var errorResponse = new BaseResponseDTO
            {
                IsSuccess = false
            };

            switch (exception)
            {
                case ApplicationException ex:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse.Message = ex.Message;
                    break;
                case AccessViolationException ex:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse.Message = ex.Message;
                    break;
                case UnauthorizedAccessException ex:
                    response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    errorResponse.Message = ex.Message;
                    break;
                case ArgumentOutOfRangeException ex:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse.Message = ex.Message;
                    break;
                case ArgumentNullException ex:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse.Message = ex.Message;
                    break;
                case NullReferenceException ex:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse.Message = ex.Message;
                    break;
                default:
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    errorResponse.Message = "Internal server error!";
                    break;
            }

            await context.Response.WriteAsync(new BaseResponseDTO()
            {
                StatusCode = context.Response.StatusCode,
                Message = errorResponse.Message
            }.ToString());
        }

    }
}
