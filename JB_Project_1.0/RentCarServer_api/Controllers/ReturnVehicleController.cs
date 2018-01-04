using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class ReturnVehicleController : ApiController
    {
        public class CarParams
        {
            public string LicenceNumber { get; set; }
         
        }


        // GET all users in database
        [HttpGet]
        public IEnumerable<RentCarRentedCar> GetRentedCars()
        {
           return ReturnVehicle.GetRentedCarslist();
        }//Get rented cars list

        [HttpPost]
        public List<RentCarRentedCar> GetRentedCarByLicNum([FromBody]CarParams paramsCar)
        {
            return ReturnVehicle.GetRentedCarsByLisnumber(paramsCar.LicenceNumber);
        }//search rented car by license numiber from reted cars list

         //update cars details
        [HttpPost]
        public void UpdateRentedStatus([FromBody]RentCarNewVehiclesDB updateCar)
        {
            ReturnVehicle.UpdateRentedCarStatus(updateCar);
        }//set car status to "not avaliable" when car is rented

        [HttpPost]
        public void AddNewOrderToHistory()
        {
            ReturnVehicle.AddOrderToHistory();
        }//add order to ordesr history
    }
}
