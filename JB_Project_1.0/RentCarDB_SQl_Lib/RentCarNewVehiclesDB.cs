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
    
    public partial class RentCarNewVehiclesDB
    {
        public int Id { get; set; }
        public string Picture { get; set; }
        public string LicenseNumber { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Gear { get; set; }
        public string Mileage { get; set; }
        public string YearOfManufacture { get; set; }
        public string ProperForRent { get; set; }
        public string AvaliableForRent { get; set; }
        public string Branch { get; set; }
        public string DailyCost { get; set; }
        public string OverdueCost { get; set; }
        public string Category { get; set; }
    }
}