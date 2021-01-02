using System;

namespace API.Extensions
{
    public static class AgeCalculation
    {        
        public static int GetPersonAge(this DateTime dob)
        {
            var today = DateTime.Today;
            
            int age = today.Year - dob.Year;

            if(dob > today.AddYears(-age)) age--;
        
           return age;
        }
    }
}