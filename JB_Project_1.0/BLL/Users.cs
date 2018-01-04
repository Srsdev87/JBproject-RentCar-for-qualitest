using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Helpers;
using RentCarDB_SQl_Lib;
using RentCarServer_api;
using System.IO;
using System.Web;

namespace BLL
{
    public class Users
    {
        public static IEnumerable<RentCarUserDB> GetAlluserslist()
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    return userEntities.RentCarUserDBs.ToList();
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

        public static List<string> IsUserExist(string username, string email)
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    string usernameChecked = "usernameValid";
                    string mailChecked = "mailValid";

                    var userNames = userEntities.RentCarUserDBs.SqlQuery("select * from RentCarUserDB").ToList();

                    List<string> usersExistanceList = new List<string>();

                    foreach (var name in userNames)
                    {
                        if (name.UserName.Trim() == username.Trim())
                        {
                            usernameChecked = "usernameExist";
                        }
                    }

                    foreach (var mail in userNames)
                    {
                        if (mail.Email.Trim() == email.Trim())
                        {
                            mailChecked = "mailExist";
                        }
                    }

                    usersExistanceList.Add(usernameChecked);
                    usersExistanceList.Add(mailChecked);
                    return usersExistanceList;
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

        public static List<RentCarUsersRentHistory> OrdersHistory(string username)
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    var usersHistory =
                        userEntities.RentCarUsersRentHistories.SqlQuery(
                            "Select * from RentCarUsersRentHistory Where Username = '" + username + "'");

                    List<RentCarUsersRentHistory> historyList = new List<RentCarUsersRentHistory>();

                    foreach (var userhistory in usersHistory)
                    {
                        historyList.Add(userhistory);
                    }
                    return historyList;
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

        public static RentCarUserDB Get(int id)
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    return userEntities.RentCarUserDBs.FirstOrDefault(c => c.Id == id);
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

        public static void DeleteUser(int Id)
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    RentCarUserDB usr = userEntities.RentCarUserDBs.FirstOrDefault(c => c.Id == Id);

                    string rootFolderPath = usr.Picture;

                    string[] filesToDelete = rootFolderPath.Split('\\');//rootFolderPath.Substring(14, rootFolderPath.Length - 14).Trim();

                    if (filesToDelete[3] != "default.jpg")
                    {
                        string directoryName = Path.GetDirectoryName(rootFolderPath);
                        string[] fileList = Directory.GetFiles( directoryName,
                            filesToDelete[3]);
                        foreach (string file in fileList)
                        {
                            System.Diagnostics.Debug.WriteLine(file + "will be deleted");
                            File.Delete(file);
                        }
                    }
                    userEntities.RentCarUserDBs.Remove(usr);
                    userEntities.SaveChanges();
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

        public static void UpdateUser(RentCarUserDB updateuser)
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    var currentUser = userEntities.RentCarUserDBs.FirstOrDefault(c => c.Id == updateuser.Id);

                    currentUser.Picture = updateuser.Picture;
                    currentUser.FullName = updateuser.FullName;
                    currentUser.UserName = updateuser.UserName;
                    currentUser.BirthDate = updateuser.BirthDate;
                    currentUser.Gender = updateuser.Gender;
                    currentUser.Password = updateuser.Password;
                    currentUser.Email = updateuser.Email;
                    currentUser.IsAdmin = updateuser.IsAdmin;
                    userEntities.SaveChanges();
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

        public static void UpdateUserPicture()
        {
            try
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];

                string userName = HttpContext.Current.Request.Form["userName"].Trim();

                string picture = null;


                if (httpPostedFile != null)
                {
                    // Get the complete file path
                    var fileSavePath = HttpContext.Current.Server.MapPath(@"~\usersimg\");

                    // Validate the uploaded image(optional)
                    if (!Directory.Exists(fileSavePath))
                    {
                        Directory.CreateDirectory(fileSavePath);
                    }

                    // Save the uploaded file to "UploadedFiles" folder
                    File.SetAttributes(fileSavePath, FileAttributes.Normal);
                    picture = HttpContext.Current.Server.MapPath(@"~\usersimg\" + userName + Path.GetExtension(httpPostedFile.FileName));
                    FileStream fileStream = File.Create( picture,
                        (int)httpPostedFile.InputStream.Length);
                    // Initialize the bytes array with the stream length and then fill it with data
                    byte[] bytesInStream = new byte[httpPostedFile.InputStream.Length];
                    httpPostedFile.InputStream.Read(bytesInStream, 0, bytesInStream.Length);
                    // Use write method to write to the file specified above
                    fileStream.Write(bytesInStream, 0, bytesInStream.Length);

                    fileStream.Dispose();

                }

                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    RentCarUserDB updateuser = new RentCarUserDB();

                    if (picture != null)
                    {
                        string[] serverSplttedPath = picture.Split('\\');

                        string userpic = '\\' + serverSplttedPath[5] + '\\' + serverSplttedPath[6] + '\\'+ '\\' + serverSplttedPath[7];
                        updateuser.Picture = userpic;
                    }
                    else
                    {
                        updateuser.Picture = "\\usersimg\\default.jpg";
                    }
                    userEntities.SaveChanges();
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

        public static void AddNewUser()
        {
            try
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                string fullname = HttpContext.Current.Request.Form["fullname"].Trim();
                string userName = HttpContext.Current.Request.Form["userName"].Trim();
                DateTime birthdate = Convert.ToDateTime(HttpContext.Current.Request.Form["birthdate"]);
                string gender = HttpContext.Current.Request.Form["gender"];
                string password = HttpContext.Current.Request.Form["password"].Trim();
                string email = HttpContext.Current.Request.Form["email"].Trim();
                string isadmin = "false";
                string picture = null;


                if (httpPostedFile != null)
                {
                    // Get the complete file path
                    var fileSavePath = HttpContext.Current.Server.MapPath(@"~\usersimg\");

                    // Validate the uploaded image(optional)
                    if (!Directory.Exists(fileSavePath))
                    {
                        Directory.CreateDirectory(fileSavePath);
                    }

                    // Save the uploaded file to "UploadedFiles" folder
                    File.SetAttributes(fileSavePath, FileAttributes.Normal);
                    picture = HttpContext.Current.Server.MapPath(@"~\usersimg\" + userName + Path.GetExtension(httpPostedFile.FileName));
                    FileStream fileStream = File.Create( picture,
                        (int)httpPostedFile.InputStream.Length);
                    // Initialize the bytes array with the stream length and then fill it with data
                    byte[] bytesInStream = new byte[httpPostedFile.InputStream.Length];
                    httpPostedFile.InputStream.Read(bytesInStream, 0, bytesInStream.Length);
                    // Use write method to write to the file specified above
                    fileStream.Write(bytesInStream, 0, bytesInStream.Length);

                    fileStream.Dispose();

                }
                RentCarUserDB newuser = new RentCarUserDB();
                newuser.UserName = userName;
                newuser.FullName = fullname;
                newuser.BirthDate = birthdate;
                newuser.Gender = gender;
                newuser.Password = password;
                newuser.Email = email;
                newuser.IsAdmin = isadmin;
                if (picture != null)
                {
                    string[] serverSplttedPath = picture.Split('\\');

                    string userpic = '\\'+serverSplttedPath [5]+ '\\' + serverSplttedPath[6] + '\\'+ '\\' + serverSplttedPath[7];

                    newuser.Picture = userpic;
                }
                else
                {
                    newuser.Picture = "\\usersimg\\default.jpg";
                }

                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    userEntities.RentCarUserDBs.Add(newuser);
                    userEntities.SaveChanges();
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
