using Calculator.Model;
using Calculator.Services;
using DTO.Common;
using HaravProgSite.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calculator.Controllers
{
    public class CalculateController : GlobalController
    {
        private ICalculateService calcSV;
        public CalculateController(ICalculateService calcSV)
        {
            this.calcSV = calcSV;
        }
        public GResult<double> Sum(Exersice exercise)
        {
            var res = calcSV.Sum(exercise);
            return Success(res);
        }

        public GResult<List<ExersiceDetails>> GetExersiceDetails()
        {
            return Success(calcSV.GetExersiceDetails());
        }

        public Result AddExersice(ExersiceDetails exercise)
        {
            return Success(calcSV.AddExersice(exercise));
        }
        public Result UpdateExersice(ExersiceDetails exercise)
        {
            var res = calcSV.UpdateExersice(exercise);
            return res == ResultType.Success ? Success() : Fail("התרגיל המבוקש אינו קיים במאגר");
        }
        public Result DeleteExersice(int id)
        {
            var res = calcSV.DeleteExersice(id);
            return res == ResultType.Success ? Success() : Fail("התרגיל המבוקש אינו קיים במאגר");
        }



    }
}
