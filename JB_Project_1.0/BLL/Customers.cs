using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using Common.Helpers;
using RentCarDB_SQl_Lib;
using RentCarServer_api;
using System.Web;

namespace BLL
{
    public class Customers
    {
        public static IEnumerable<RentCarNewVehiclesDB> GetAllCarsInList()
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    return fleetEntities.RentCarNewVehiclesDBs.ToList();
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

        public static List<RentCarNewVehiclesDB> GetOnlyAvaliableCars()
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    var carsForRent =
                        fleetEntities.RentCarNewVehiclesDBs.SqlQuery(
                            "Select * from RentCarNewVehiclesDB Where AvaliableForRent = 'Avaliable'").ToList();

                    List<RentCarNewVehiclesDB> avaliableCars = new List<RentCarNewVehiclesDB>();

                    foreach (var cardata in carsForRent)
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

        public static List<RentCarNewVehiclesDB> CarsSearchFilter(string gear, string year, string manufacturer,
            string model, string category, string branch, string yourtext)
        {
            try
            {
                int selectedParamsCount = 0;

                List<string> splittedparamsLIststring = new List<string>();

                List<string> parametersList = new List<string>();

                parametersList.Add(gear);
                parametersList.Add(year);
                parametersList.Add(manufacturer);
                parametersList.Add(model);
                parametersList.Add(category);
                parametersList.Add(branch);
                parametersList.Add(yourtext);

                foreach (var var in parametersList)
                {
                    string[] carparameterStrings = var.Split(':');
                    string searchedBy = carparameterStrings[0];
                    string carparam = carparameterStrings[1];

                    if (!carparam.Contains("like"))
                    {
                        splittedparamsLIststring.Add(searchedBy + " = '" + carparam + "'");
                    }
                    else
                    {
                        splittedparamsLIststring.Add(carparam);
                    }
                }

                string sqlQueryString = "Select * from RentCarNewVehiclesDB Where ";

                for (int i = 0; i < splittedparamsLIststring.Count; i++)
                {
                    if (splittedparamsLIststring[i] != null && !splittedparamsLIststring[i].Contains("undefined"))
                    {
                        selectedParamsCount++;
                        if (selectedParamsCount > 1)
                        {
                            sqlQueryString += " and " + splittedparamsLIststring[i];
                        }
                        else
                        {
                            sqlQueryString += splittedparamsLIststring[i];
                        }
                    }
                }
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    try
                    {
                        var carsForRent =
                            fleetEntities.RentCarNewVehiclesDBs.SqlQuery(sqlQueryString)
                                .ToList();

                        List<RentCarNewVehiclesDB> avaliableCars = new List<RentCarNewVehiclesDB>();

                        foreach (var carparams in carsForRent)
                        {
                            if (carparams.AvaliableForRent != "Not Avaliable")
                            {
                                avaliableCars.Add(carparams);
                            }
                        }
                        return avaliableCars;
                    }
                    catch (Exception e)
                    {
                        return null;
                    }
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

        public static void AddNewOrderItem()
        {
            try
            {
                // Get the uploaded image from the Files collection
                string pic = HttpContext.Current.Request.Form["userpic"].Trim();
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
                string returntoBrnch = HttpContext.Current.Request.Form["returntobranch"].Trim();
                string totalcost = HttpContext.Current.Request.Form["totalcost"].Trim();


                RentCarRentedCar newOrder = new RentCarRentedCar();
                newOrder.UserPicture = pic;
                newOrder.Username = username;
                newOrder.Picture = picture;
                newOrder.LicenseNumber = licensenumber;
                newOrder.Manufacturer = manufacturer;
                newOrder.Model = model;
                newOrder.Mileage = mileage;
                newOrder.YearOFManufacture = year;
                newOrder.Branch = branch;
                newOrder.DailyCost = daycost;
                newOrder.OverdueCost = overcost;
                newOrder.DateRented = fromdate;
                newOrder.DateReturned = todate;
                newOrder.ReturnToBranch = returntoBrnch;
                newOrder.TotalCost = totalcost;

                using (RentCarDatabaseEntities1 customersDealsEntities = new RentCarDatabaseEntities1())
                {
                    customersDealsEntities.RentCarRentedCars.Add(newOrder);
                    customersDealsEntities.SaveChanges();
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

        public static void UpdateCarStatus(string lisnumber,string isavaliable)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    var currentCar =
                        fleetEntities.RentCarNewVehiclesDBs.FirstOrDefault(c => c.LicenseNumber == lisnumber);
                    currentCar.AvaliableForRent = isavaliable;
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
    }
}
