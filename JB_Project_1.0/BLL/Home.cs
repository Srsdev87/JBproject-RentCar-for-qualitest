using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class Home
    {
        public static void SendFeedback(string from, string to, string subject, string content)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(to);
                mail.From = new MailAddress(from, subject, System.Text.Encoding.UTF8);
                mail.Subject = subject;
                mail.SubjectEncoding = System.Text.Encoding.UTF8;
                mail.Body = content;
                mail.BodyEncoding = System.Text.Encoding.UTF8;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;
                SmtpClient client = new SmtpClient();
                client.Credentials = new NetworkCredential("servw23@gmail.com", "namal2011");
                client.Port = 587;
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                try
                {
                    client.Send(mail);
                }
                catch (Exception ex)
                {
                    Exception ex2 = ex;
                    string errorMessage = string.Empty;
                    while (ex2 != null)
                    {
                        errorMessage += ex2.ToString();
                        ex2 = ex2.InnerException;
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
            }
        }

        public static void UpdateUserpassword(string username,string password)
        {
            try
            {
                using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
                {
                    var currentUser = userEntities.RentCarUserDBs.FirstOrDefault(c => c.UserName == username);

                    if (currentUser != null)
                    {
                        currentUser.Password = password;
                        userEntities.SaveChanges();
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
            }
        }

        public static IEnumerable<RentCarServerErrorsLog> GetErrorsLog()
        {
            try
            {
                using (RentCarDatabaseEntities1 serverErrorsEntities = new RentCarDatabaseEntities1())
                {
                    return serverErrorsEntities.RentCarServerErrorsLogs.ToList();
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
    }
}
