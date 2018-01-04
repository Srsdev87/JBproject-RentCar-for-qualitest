using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RentCarDB_SQl_Lib;
using System.IO;
using System.Web;

namespace BLL
{
    public class Fleet
    {
        public static IEnumerable<RentCarNewVehiclesDB> GetAllVehiclesInList()
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

        public static RentCarNewVehiclesDB Get(int id)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    return fleetEntities.RentCarNewVehiclesDBs.FirstOrDefault(c => c.Id == id);
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

        public static List<string> DetailByPicture(string pic)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    var picture =
                        fleetEntities.Database.SqlQuery<string>("Select Picture from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var lisnum =
                       fleetEntities.Database.SqlQuery<string>("Select LicenseNumber from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var manufac =
                       fleetEntities.Database.SqlQuery<string>("Select Manufacturer from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var model =
                       fleetEntities.Database.SqlQuery<string>("Select Model from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var mileage =
                       fleetEntities.Database.SqlQuery<string>("Select Mileage from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var year =
                       fleetEntities.Database.SqlQuery<string>("Select YearOfManufacture from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var branch =
                       fleetEntities.Database.SqlQuery<string>("Select Branch from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var dailycost =
                       fleetEntities.Database.SqlQuery<string>("Select DailyCost from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    var overcost =
                       fleetEntities.Database.SqlQuery<string>("Select OverdueCost from RentCarNewVehiclesDB where Picture = '" + pic + "'").ToList();
                    List<string> lastViewedCarDetail = new List<string>();


                    lastViewedCarDetail.Add(picture[0]);
                    lastViewedCarDetail.Add(lisnum[0]);
                    lastViewedCarDetail.Add(manufac[0]);
                    lastViewedCarDetail.Add(model[0]);
                    lastViewedCarDetail.Add(mileage[0]);
                    lastViewedCarDetail.Add(year[0]);
                    lastViewedCarDetail.Add(branch[0]);
                    lastViewedCarDetail.Add(dailycost[0]);
                    lastViewedCarDetail.Add(overcost[0]);

                    return lastViewedCarDetail;
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

        public static void DeleteCarByLicenceNumber(int id)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    RentCarNewVehiclesDB FCar = fleetEntities.RentCarNewVehiclesDBs.FirstOrDefault(c => c.Id == id);

                    string rootFolderPath = FCar.Picture;
                    string[] filesToDelete = rootFolderPath.Split('\\');//rootFolderPath.Substring(19, rootFolderPath.Length - 21).Trim();
                    if (filesToDelete[3] != "defaultcar.png")
                    {
                        string directoryName = Path.GetDirectoryName(rootFolderPath);
                        string[] fileList = System.IO.Directory.GetFiles( directoryName,
                            filesToDelete[3]);
                        foreach (string file in fileList)
                        {
                            System.Diagnostics.Debug.WriteLine(file + "will be deleted");
                            File.Delete(file);
                        }
                    }

                    fleetEntities.RentCarNewVehiclesDBs.Remove(FCar);
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

        public static void UpdateCarDetails(RentCarNewVehiclesDB updateCar)
        {
            try
            {
                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    var currentCar = fleetEntities.RentCarNewVehiclesDBs.FirstOrDefault(c => c.Id == updateCar.Id);

                    currentCar.Picture = updateCar.Picture;
                    currentCar.LicenseNumber = updateCar.LicenseNumber;
                    currentCar.Manufacturer = updateCar.Manufacturer;
                    currentCar.Model = updateCar.Model;
                    currentCar.Gear = updateCar.Gear;
                    currentCar.Mileage = updateCar.Mileage;
                    currentCar.YearOfManufacture = updateCar.YearOfManufacture;
                    currentCar.ProperForRent = updateCar.ProperForRent;
                    currentCar.AvaliableForRent = updateCar.AvaliableForRent;
                    currentCar.Branch = updateCar.Branch;
                    currentCar.DailyCost = updateCar.DailyCost;
                    currentCar.OverdueCost = updateCar.OverdueCost;
                    currentCar.Category = updateCar.Category;
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

        public static void UpdateCarPicture()
        {
            try
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];

                string licensenumber = HttpContext.Current.Request.Form["licensenumber"].Trim();

                string picture = null;

                if (httpPostedFile != null)
                {
                    // Get the complete file path
                    var fileSavePath = HttpContext.Current.Server.MapPath(@"~\vehiclesFleet\");

                    // Validate the uploaded image(optional)
                    if (!Directory.Exists(fileSavePath))
                    {
                        Directory.CreateDirectory(fileSavePath);
                    }

                    // Save the uploaded file to "UploadedFiles" folder
                    File.SetAttributes(fileSavePath, FileAttributes.Normal);
                    picture = HttpContext.Current.Server.MapPath(@"~\vehiclesFleet\" + licensenumber + Path.GetExtension(httpPostedFile.FileName));
                    FileStream fileStream = File.Create( picture,
                        (int)httpPostedFile.InputStream.Length);
                    // Initialize the bytes array with the stream length and then fill it with data
                    byte[] bytesInStream = new byte[httpPostedFile.InputStream.Length];
                    httpPostedFile.InputStream.Read(bytesInStream, 0, bytesInStream.Length);
                    // Use write method to write to the file specified above
                    fileStream.Write(bytesInStream, 0, bytesInStream.Length);

                    fileStream.Dispose();

                }

                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    RentCarNewVehiclesDB newCar = new RentCarNewVehiclesDB();

                    if (picture != null)
                    {
                        string[] serverSplttedPath = picture.Split('\\');

                        string vehiclepic = '\\' + serverSplttedPath[5] + '\\' + serverSplttedPath[6] + '\\'+ '\\' + serverSplttedPath[7];
                        newCar.Picture = vehiclepic;
                    }
                    else
                    {
                        newCar.Picture = "\\vehiclesFleet\\defaultcar.png";
                    }
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

        public static void AddNewCar()
        {
            try
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                string licensenumber = HttpContext.Current.Request.Form["licensenumber"].Trim();
                string manufacturer = HttpContext.Current.Request.Form["manufacturer"].Trim();
                string model = HttpContext.Current.Request.Form["model"];
                string gear = HttpContext.Current.Request.Form["gear"];
                string mileage = HttpContext.Current.Request.Form["mileage"].Trim();
                string yearOfManufacture = HttpContext.Current.Request.Form["yearOfManufacture"].Trim();
                string properForRent = HttpContext.Current.Request.Form["properForRent"].Trim();
                string avaliableForRent = HttpContext.Current.Request.Form["avaliableForRent"].Trim();
                string branch = HttpContext.Current.Request.Form["branch"].Trim();
                string dailyCost = HttpContext.Current.Request.Form["dailyCost"].Trim();
                string overdueCost = HttpContext.Current.Request.Form["overdueCost"].Trim();
                string category = HttpContext.Current.Request.Form["category"].Trim();
                string picture = null;


                if (httpPostedFile != null)
                {

                    // Get the complete file path
                    var fileSavePath = HttpContext.Current.Server.MapPath(@"~\vehiclesFleet\");


                    // Validate the uploaded image(optional)
                    if (!Directory.Exists(fileSavePath))
                    {
                        Directory.CreateDirectory(fileSavePath);
                    }

                    // Save the uploaded file to "UploadedFiles" folder
                    File.SetAttributes(fileSavePath, FileAttributes.Normal);
                    picture = HttpContext.Current.Server.MapPath(@"~\vehiclesFleet\" +licensenumber + Path.GetExtension(httpPostedFile.FileName));
                    FileStream fileStream = File.Create( picture,
                        (int)httpPostedFile.InputStream.Length);

                    // Initialize the bytes array with the stream length and then fill it with data
                    byte[] bytesInStream = new byte[httpPostedFile.InputStream.Length];
                    httpPostedFile.InputStream.Read(bytesInStream, 0, bytesInStream.Length);
                    // Use write method to write to the file specified above
                    fileStream.Write(bytesInStream, 0, bytesInStream.Length);

                    fileStream.Dispose();

                }
                RentCarNewVehiclesDB newCar = new RentCarNewVehiclesDB();
                newCar.LicenseNumber = licensenumber;
                newCar.Manufacturer = manufacturer;
                newCar.Model = model;
                newCar.Gear = gear;
                newCar.Mileage = mileage;
                newCar.YearOfManufacture = yearOfManufacture;
                newCar.ProperForRent = properForRent;
                newCar.AvaliableForRent = avaliableForRent;
                newCar.Branch = branch;
                newCar.DailyCost = dailyCost;
                newCar.OverdueCost = overdueCost;
                newCar.Category = category;

                if (picture != null)
                {
                    string[] serverSplttedPath = picture.Split('\\');

                    string vehiclepic = '\\' + serverSplttedPath[5] + '\\' + serverSplttedPath[6] + '\\'+ '\\'  + serverSplttedPath[7];
                    newCar.Picture = vehiclepic;
                }
                else
                {
                    newCar.Picture = "\\vehiclesFleet\\defaultcar.png";
                }

                using (RentCarDatabaseEntities1 fleetEntities = new RentCarDatabaseEntities1())
                {
                    fleetEntities.RentCarNewVehiclesDBs.Add(newCar);
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
