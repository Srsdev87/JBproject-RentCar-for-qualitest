using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Helpers;
using RentCarDB_SQl_Lib;
using RentCarServer_api;
using System.Web;

namespace BLL
{
   public class ReturnVehicle
    {
        public static IEnumerable<RentCarRentedCar> GetRentedCarslist()
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    return fleetEntities.RentCarRentedCars.ToList();
                }
            }
            catch (Exception serverException)
            {
                RentCarServerErrorsLog errorsLog = new RentCarServerErrorsLog();
                errorsLog.ErrorMsg = serverException.ToString();
                errorsLog.Date = DateTime.Now.ToString();
                using (RentCarDatabaseEntities1 errorsEntities = new RentCarDatabaseEntities1())
                {
                    errorsEntities.RentCarServerErrorsLogs.Add(errorsLog);
                    errorsEntities.SaveChanges();
                }
                return null;
            }
        }

        public static List<RentCarRentedCar> GetRentedCarsByLisnumber(string licensenumber)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    var CarsForRent =
                        fleetEntities.RentCarRentedCars.SqlQuery(
                            "Select * from RentCarRentedCars Where LicenseNumber = '" + licensenumber + "'").ToList();

                    List<RentCarRentedCar> avaliableCars = new List<RentCarRentedCar>();

                    foreach (var cardata in CarsForRent)
                    {
                        avaliableCars.Add(cardata);
                    }
                    return avaliableCars;
                }
            }
            catch (Exception serverException)
            {
                RentCarServerErrorsLog errorsLog = new RentCarServerErrorsLog();
                errorsLog.ErrorMsg = serverException.ToString();
                errorsLog.Date = DateTime.Now.ToString();
                using (RentCarDatabaseEntities1 errorsEntities = new RentCarDatabaseEntities1())
                {
                    errorsEntities.RentCarServerErrorsLogs.Add(errorsLog);
                    errorsEntities.SaveChanges();
                }
                return null;
            }

        }

        public static void UpdateRentedCarStatus(RentCarNewVehiclesDB updateCar)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    var currentCar = fleetEntities.RentCarNewVehiclesDBs.FirstOrDefault(c => c.LicenseNumber == updateCar.LicenseNumber);

                    currentCar.AvaliableForRent = updateCar.AvaliableForRent;

                    RentCarRentedCar rentedCar = fleetEntities.RentCarRentedCars.FirstOrDefault(c => c.LicenseNumber == updateCar.LicenseNumber);

                    fleetEntities.RentCarRentedCars.Remove(rentedCar);

                    fleetEntities.SaveChanges();
                }
            }
            catch (Exception serverException)
            {
                RentCarServerErrorsLog errorsLog = new RentCarServerErrorsLog();
                errorsLog.ErrorMsg = serverException.ToString();
                errorsLog.Date = DateTime.Now.ToString();
                using (RentCarDatabaseEntities1 errorsEntities = new RentCarDatabaseEntities1())
                {
                    errorsEntities.RentCarServerErrorsLogs.Add(errorsLog);
                    errorsEntities.SaveChanges();
                }
            }
        }

        public static void AddOrderToHistory()
        {
            try
            {
                // Get the uploaded image from the Files collection

                string username = HttpContext.Current.Request.Form["username"].Trim();
                string picture = HttpContext.Current.Request.Form["picture"].Trim();
                string licensenumber = HttpContext.Current.Request.Form["licensenumber"].Trim();
                string manufacturer = HttpContext.Current.Request.Form["manufacturer"].Trim();
                string model = HttpContext.Current.Request.Form["model"].Trim();
                string mileage = HttpContext.Current.Request.Form["mileage"].Trim();
                string year = HttpContext.Current.Request.Form["yearOfManufacture"].Trim();
                string branch = HttpContext.Current.Request.Form["branch"].Trim();
                string daycost = HttpContext.Current.Request.Form["dailyCost"].Trim();
                string overcost = HttpContext.Current.Request.Form["overduecost"].Trim();
                string fromdate = HttpContext.Current.Request.Form["rentfromdate"].Trim();
                string todate = HttpContext.Current.Request.Form["renttodate"].Trim();
                string actualreturndate = HttpContext.Current.Request.Form["actualreturndate"].Trim();
                string returntoBranch = HttpContext.Current.Request.Form["returntobrnch"].Trim();
                string finaltotalcost = HttpContext.Current.Request.Form["finaltotalcost"].Trim();


                RentCarUsersRentHistory newOrderHistory = new RentCarUsersRentHistory();
                newOrderHistory.Username = username;
                newOrderHistory.Picture = picture;
                newOrderHistory.LicenseNumber = licensenumber;
                newOrderHistory.Manufacturer = manufacturer;
                newOrderHistory.Model = model;
                newOrderHistory.Mileage = mileage;
                newOrderHistory.YearOfManufacture = year;
                newOrderHistory.Branch = branch;
                newOrderHistory.DailyCost = daycost;
                newOrderHistory.OverdueCost = overcost;
                newOrderHistory.FromRentedDate = fromdate;
                newOrderHistory.ToRentedDate = todate;
                newOrderHistory.ActualReturnDate = actualreturndate;
                newOrderHistory.ReturnedToBranch = returntoBranch;
                newOrderHistory.FinalTotalCost = finaltotalcost;



                using (RentCarDatabaseEntities1 customersHistoryEntities = new RentCarDatabaseEntities1())
                {
                    customersHistoryEntities.RentCarUsersRentHistories.Add(newOrderHistory);
                    customersHistoryEntities.SaveChanges();
                }
            }
            catch (Exception serverException)
            {
                RentCarServerErrorsLog errorsLog = new RentCarServerErrorsLog();
                errorsLog.ErrorMsg = serverException.ToString();
                errorsLog.Date = DateTime.Now.ToString();
                using (RentCarDatabaseEntities1 errorsEntities = new RentCarDatabaseEntities1())
                {
                    errorsEntities.RentCarServerErrorsLogs.Add(errorsLog);
                    errorsEntities.SaveChanges();
                }
            }
        }
    }
}
