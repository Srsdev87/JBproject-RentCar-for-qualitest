//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RentCarDB_SQl_Lib
{
    using System;
    using System.Collections.Generic;
    
    public partial class RentCarRentedCar
    {
        public int Id { get; set; }
        public string LicenseNumber { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Mileage { get; set; }
        public string Branch { get; set; }
        public string DailyCost { get; set; }
        public string OverdueCost { get; set; }
        public string DateRented { get; set; }
        public string Picture { get; set; }
        public string YearOFManufacture { get; set; }
        public string DateReturned { get; set; }
        public string ReturnToBranch { get; set; }
        public string TotalCost { get; set; }
        public string UserPicture { get; set; }
        public string Username { get; set; }
    }
}
