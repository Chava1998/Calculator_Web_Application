using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calculator.Model
{
    public class Exersice
    {
        public double Num1 { get; set; }
        public double Num2 { get; set; }
        public string Operator { get; set; }
    }

    public class ExersiceDetails : Exersice
    {
        public int Id { get; set; }
        public double Result { get; set; }
    }
}
