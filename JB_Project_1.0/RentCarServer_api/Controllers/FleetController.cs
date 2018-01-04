using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class FleetController : ApiController
    {
        public class Carpic
   {
       public string Picture { get; set; }
   }

        [HttpGet]
        public IEnumerable<RentCarNewVehiclesDB> GetFleetVehicles()
        {
            return Fleet.GetAllVehiclesInList();
        }// GET all cars in database

        public RentCarNewVehiclesDB Get(int id)
        {
           return Fleet.Get(id);
        } //show car by its id

        [HttpGet]
        public List<string> DetailByPicture(string pic)
        {
            return Fleet.DetailByPicture(pic);
        }//get last viewed car params

        [HttpPost]
        public void DeleteCarByLicenceNumber(int id)
        {
            Fleet.DeleteCarByLicenceNumber(id);
        } //delete car

        [HttpPost]
        public void UpdateCarDetails([FromBody]RentCarNewVehiclesDB updateCar)
        {
            Fleet.UpdateCarDetails(updateCar);
        }//update cars details

        [HttpPost]
        public void UpdateCarPicture()
        {
            Fleet.UpdateCarPicture();
        } //update car picture

        [HttpPost]
        public void AddNewCar()
        {
            Fleet.AddNewCar();
        } //add new car to database
    }
}
