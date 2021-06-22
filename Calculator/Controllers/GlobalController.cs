using DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HaravProgSite.Controllers
{
    //Global controller for implement client results
    [ApiController]
    [Route("api/[controller]")]
    public class GlobalController : ControllerBase
    {
        #region Json

        protected Result Success()
        {
            return new Result();
        }

        protected GResult<T> Success<T>(T value)
        {
            return new GResult<T>()
            {
                Success = true,
                Value = value
            };
        }

        protected GResult<T> Fail<T>(T value, string message = "")
        {
            return (new GResult<T>()
            {
                Success = false,
                Value = value,
                Message = message
            });
        }

        protected Result Fail(string message = "")
        {
            return new Result()
            {
                Success = false,
                Message = message
            };
        }

    }

    #endregion
}

