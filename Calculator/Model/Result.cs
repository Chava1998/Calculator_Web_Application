using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Common
{
    public class Result
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public Result(bool success = true)
        {
            this.Success = success;
        }
    }

    public class GResult<T> : Result
    {
        public T Value { get; set; }
    }

    public enum ResultType
    {
        ExersiceNotExist,
        Success,
        Fail,
    }

}
