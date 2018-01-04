using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Helpers;
using RentCarDB_SQl_Lib;
using RentCarServer_api;

namespace BLL
{
    public class SignIn
    {

        public static string Login(string username,string password)
        {
            try
            {
                if (UserLoginSecurity.LogIn(username, password))
                {
                    DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                    long ms = (long)(DateTime.UtcNow - epoch).TotalMilliseconds;
                    string tokenString = username + ":" + ms;
                    return Encryptor.Encrypt(tokenString);
                }
                return "error";
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
                return "error";
            }
        }

        public static List<string> TokenValidation(string token)
        {
            try
            {
                if (token != "")
                {
                    string decryptedToken = Encryptor.Decrypt(token);
                    string[] usernamePasswordArray = decryptedToken.Split(':');
                    string username = usernamePasswordArray[0];
                    string date = usernamePasswordArray[1];

                    using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                    {
                        var decryptedUsername = userEntities.Database.SqlQuery<string>(
                            "SELECT Username FROM RentcarUserDB WHERE Username = '" + username + "'").ToList();

                        var decryptedPicture = userEntities.Database.SqlQuery<string>(
                           "SELECT Picture FROM RentcarUserDB WHERE Username = '" + username + "'").ToList();

                        var isadmin = userEntities.Database.SqlQuery<string>(
                        "SELECT IsAdmin FROM RentcarUserDB WHERE Username = '" + username + "'").ToList();

                        List<string> s = new List<string>();
                        s.Add(decryptedUsername[0].Trim());
                        s.Add(decryptedPicture[0].Trim());
                        s.Add(date);
                        s.Add(isadmin[0].Trim());
                        return s;
                    }
                }
                return null;
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

        public static List<string> RememberMeValidation(string remindertoken)
        {
            try
            {
                if (remindertoken != "")
                {
                    string decryptedToken = Encryptor.Decrypt(remindertoken);
                    string[] usernamePasswordArray = decryptedToken.Split(':');
                    string username = usernamePasswordArray[0];


                    using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                    {
                        var decryptedUsername = userEntities.Database.SqlQuery<string>(
                            "SELECT Username FROM RentcarUserDB WHERE Username = '" + username + "'").ToList();

                        var decryptedPassword = userEntities.Database.SqlQuery<string>(
                           "SELECT Password FROM RentcarUserDB WHERE Username = '" + username + "'").ToList();



                        List<string> s = new List<string>();
                        s.Add(decryptedUsername[0].Trim());
                        s.Add(decryptedPassword[0].Trim());

                        return s;
                    }
                }
                return null;
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
    }
}
