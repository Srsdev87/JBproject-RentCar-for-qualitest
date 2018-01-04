using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.WebPages;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class RentCarCustomerController : ApiController
    {
        public class CarParams
        {
            public string Gear { get; set; }
            public string Year { get; set; }
            public string Manufacturer { get; set; }
            public string Model { get; set; }
            public string Category { get; set; }
            public string Branch { get; set; }
            public string YourText { get; set; }
        }

        [HttpGet]
        public IEnumerable<RentCarNewVehiclesDB> GetFleetVehicles()
        {
            return Customers.GetAllCarsInList();
        }// GET all avaliable cars in database

        public List<RentCarNewVehiclesDB> GetAvaliableForRentCars()
        {
            return Customers.GetOnlyAvaliableCars();
        }//get only "avaliable for rent" cars from database

        [HttpPost]
        public List<RentCarNewVehiclesDB> GetListOFcarsBySearchParameter([FromBody] CarParams carParameter)
        {
           return Customers.CarsSearchFilter(carParameter.Gear, carParameter.Year, carParameter.Manufacturer, carParameter.Model, carParameter.Category, carParameter.Branch, carParameter.YourText);
        }//Search cars Filter

        [HttpPost]
        public void AddNewOrder()
        {
            Customers.AddNewOrderItem();
        }//add new order 

        [HttpPost]
        public void UpdateCarAvaliability([FromBody]RentCarNewVehiclesDB updateCar)
        {
            Customers.UpdateCarStatus(updateCar.LicenseNumber,updateCar.AvaliableForRent);
        }//update car status after rent
    }
}

