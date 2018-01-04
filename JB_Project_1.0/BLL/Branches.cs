using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Lifetime;
using System.Text;
using System.Threading.Tasks;
using RentCarDB_SQl_Lib;

namespace BLL
{
    public class Branches
    {
        public static IEnumerable<RentCarBranch> GetAllBranches()
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    return branchEntities.RentCarBranches.ToList();
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

        public static List<string> GetBranchesLocations()
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    var branchName = branchEntities.Database.SqlQuery<string>("Select branches from RentCarBranches").ToList();

                    var branchLat = branchEntities.Database.SqlQuery<string>("Select latitude from RentCarBranches").ToList();

                    var branchLng = branchEntities.Database.SqlQuery<string>("Select longitude from RentCarBranches").ToList();

                    List<string> rentcarBranches = new List<string>();

                    for (int i = 0; i < branchName.Count; i++)
                    {
                        rentcarBranches.Add(branchName[i] + ":" + branchLat[i] + ":" + branchLng[i]);
                    }

                    return rentcarBranches;
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

        public static List<string> GetBranchesNameByLocations(string lat,string lng)
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    try
                    {
                        var brname1 = branchEntities.Database.SqlQuery<string>("Select branches from RentCarBranches where latitude = " + lat).ToList();
                        var brname2 = branchEntities.Database.SqlQuery<string>("Select branches from RentCarBranches where longitude = " + lng).ToList();

                        List<string> bname = new List<string>();
                        if (brname1.ToString() == brname2.ToString())
                        {
                            bname.Add(brname1[0]);
                        }
                        return bname;
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

        public static List<string> GetSearchedBranches(string brnch)
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    var branchesName = branchEntities.Database.SqlQuery<string>("select branches from rentcarbranches where branches like  '%" + brnch + "%'").ToList();


                    var branchesLat = branchEntities.Database.SqlQuery<string>("select latitude from rentcarbranches where branches like  '%" + brnch + "%'").ToList();


                    var branchesLng = branchEntities.Database.SqlQuery<string>("select longitude from rentcarbranches where branches like  '%" + brnch + "%'").ToList();
                    List<string> branchFounded = new List<string>();

                    try
                    {
                        branchFounded.Add(branchesName[0].Trim());
                        branchFounded.Add(branchesLat[0].Trim());
                        branchFounded.Add(branchesLng[0].Trim());
                        return branchFounded;
                    }
                    catch (Exception e)
                    {
                        branchFounded.Add("branchnotFound");
                        return branchFounded;
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

        public static void DeleteBranchByName(int Id)
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    RentCarBranch brc = branchEntities.RentCarBranches.FirstOrDefault(c => c.id == Id);
                    branchEntities.RentCarBranches.Remove(brc);
                    branchEntities.SaveChanges();
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

        public static void AddBranch(RentCarBranch newbranch)
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    branchEntities.RentCarBranches.Add(newbranch);
                    branchEntities.SaveChanges();
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

        public static void UpdateBranchDetails(RentCarBranch updatebranch)
        {
            try
            {
                using (RentCarDatabaseEntities1 branchEntities = new RentCarDatabaseEntities1())
                {
                    var currentBranch = branchEntities.RentCarBranches.FirstOrDefault(c => c.id == updatebranch.id);

                    currentBranch.branches = updatebranch.branches;
                    currentBranch.address = updatebranch.address;
                    currentBranch.latitude = updatebranch.latitude;
                    currentBranch.longitude = updatebranch.longitude;
                    currentBranch.status = updatebranch.status;
                    branchEntities.SaveChanges();
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
