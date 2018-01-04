using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RentCarDB_SQl_Lib;

namespace BLL
{
    public class Contacts
    {
        public static IEnumerable<RentCarContact> GetAllContacts()
        {
            try
            {
                using (RentCarDatabaseEntities1 contactEntities = new RentCarDatabaseEntities1())
                {
                    return contactEntities.RentCarContacts.ToList();
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

        public static RentCarContact Get(int contactID)
        {
            try
            {
                using (RentCarDatabaseEntities1 contactEntities = new RentCarDatabaseEntities1())
                {
                    return contactEntities.RentCarContacts.FirstOrDefault(c => c.Id == contactID);
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

        public static void DeleteContactById(int id)
        {
            try
            {
                using (RentCarDatabaseEntities1 contactEntities = new RentCarDatabaseEntities1())
                {
                    RentCarContact cont = contactEntities.RentCarContacts.FirstOrDefault(c => c.Id == id);
                    contactEntities.RentCarContacts.Remove(cont);
                    contactEntities.SaveChanges();
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

        public static void AddContact(RentCarContact newContact)
        {
            try
            {
                using (RentCarDatabaseEntities1 contactEntities = new RentCarDatabaseEntities1())
                {
                    contactEntities.RentCarContacts.Add(newContact);
                    contactEntities.SaveChanges();
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

        public static void UpdateContactDetails(RentCarContact updateContact)
        {
            try
            {
                using (RentCarDatabaseEntities1 contactEntities = new RentCarDatabaseEntities1())
                {
                    var currentContact = contactEntities.RentCarContacts.FirstOrDefault(c => c.Id == updateContact.Id);
                    currentContact.Department = updateContact.Department;
                    currentContact.ContactName = updateContact.ContactName;
                    currentContact.Tel = updateContact.Tel;
                    currentContact.Fax = updateContact.Fax;
                    currentContact.Mail = updateContact.Mail;
                    contactEntities.SaveChanges();
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
