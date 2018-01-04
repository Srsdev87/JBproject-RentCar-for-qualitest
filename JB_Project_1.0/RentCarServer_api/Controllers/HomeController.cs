using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Web.Http;
using Common.Helpers;
using BLL;


namespace RentCarServer_api.Controllers
{
    public class HomeController : ApiController
    {
        public class MailFeedback
        {
            public string From { get; set; }
            public string To { get; set; }
            public string Subject { get; set; }
            public string Mail { get; set; }
        }

        public class UpdatePassword
        {
            public string Password { get; set; }
            public string Username { get; set; }
        }

        [HttpPost]
        public void sendFeedback(MailFeedback feedbackMail)
        {
            Home.SendFeedback(feedbackMail.From,feedbackMail.To,feedbackMail.Subject,feedbackMail.Mail);
        }//send feedback email to administration recipient

        [HttpPost]
        public void UpdateUserPassword([FromBody]UpdatePassword updateuserpassword)
        {
            Home.UpdateUserpassword(updateuserpassword.Username,updateuserpassword.Password);
        }//change user password

        [HttpGet]
        public IEnumerable<RentCarServerErrorsLog> GetErrorsLog()
        {
            return Home.GetErrorsLog();
        }// GET all server errors in database
    }
}
