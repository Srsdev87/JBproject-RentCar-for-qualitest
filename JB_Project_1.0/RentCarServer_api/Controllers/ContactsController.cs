using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RentCarDB_SQl_Lib;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class ContactsController : ApiController
    {
        [HttpGet]
        public IEnumerable<RentCarContact> GetAllContacts()
        {
           return Contacts.GetAllContacts();
        }// GET all contacts in database

        public RentCarContact Get(int contactID)
        {
           return Contacts.Get(contactID);
        }//show contact by its name

        [HttpPost]
        public void DeleteContactById(int id)
        {
           Contacts.DeleteContactById(id);
        }//delete contact

        [HttpPost]
        public void AddContact([FromBody]RentCarContact newContact)
        {
           Contacts.AddContact(newContact);
        }//add new Contact

        [HttpPost]
        public void UpdateContactDetails([FromBody]RentCarContact updateContact)
        {
           Contacts.UpdateContactDetails(updateContact);
        }//update contact details
    }
}
