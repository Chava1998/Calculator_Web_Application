using Calculator.Model;
using DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calculator.Services
{
    public interface ICalculateService
    {
        double Sum(Exersice exercise);
        List<ExersiceDetails> GetExersiceDetails();
        int AddExersice(ExersiceDetails exercise);
        ResultType UpdateExersice(ExersiceDetails exersice);
        ResultType DeleteExersice(int id);
    }
    public class CalculateService : ICalculateService
    {
        //static list to store history
        private static List<ExersiceDetails> exersiceDetails = new List<ExersiceDetails>();

        public List<ExersiceDetails> GetExersiceDetails()
        {
            return exersiceDetails;
        }

        public int AddExersice(ExersiceDetails exercise)
        {
            var last = exersiceDetails.LastOrDefault();
            var newId = last != null ? last.Id + 1 : 1;
            exersiceDetails.Add(new ExersiceDetails
            {
                Id = newId,
                Num1 = exercise.Num1,
                Num2 = exercise.Num2,
                Operator = exercise.Operator,
                Result = exercise.Result,
            });
            return newId;
        }

        public ResultType UpdateExersice(ExersiceDetails exersice)
        {
            var last = exersiceDetails.Where(e => e.Id == exersice.Id).FirstOrDefault();
            if (last == null)
                return ResultType.ExersiceNotExist;
            last.Num1 = exersice.Num1;
            last.Num2 = exersice.Num2;
            last.Operator = exersice.Operator;
            return ResultType.Success;
        }

        public ResultType DeleteExersice(int id)
        {
            var exersice = exersiceDetails.Where(e => e.Id == id).FirstOrDefault();
            if (exersice == null)
                return ResultType.ExersiceNotExist;
            exersiceDetails.Remove(exersice);
            return ResultType.Success;
        }

        public double Sum(Exersice exercise)
        {
            switch (exercise.Operator)
            {
                case "+":
                    return exercise.Num1 + exercise.Num2;
                case "-":
                    return exercise.Num1 - exercise.Num2;
                case "*":
                    return exercise.Num1 * exercise.Num2;
                default:
                    return Math.Round(exercise.Num1 / exercise.Num2, 2);
            }
        }
    }
}
