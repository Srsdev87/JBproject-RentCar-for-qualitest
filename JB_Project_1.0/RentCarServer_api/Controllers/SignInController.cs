using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;
using Common.Helpers;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class SignInController : ApiController
    {
        public class UserValidation
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class SetToken
        {
            public string TokenString { get; set; }
        }

        public class SetReminderToken
        {
            public string TokenReminderString { get; set; }
        }

        [HttpPost]
        public string Login([FromBody] UserValidation validateUser)
        {
           return SignIn.Login(validateUser.Username,validateUser.Password);
        }//check username and password in database

        [HttpPost]
        public List<string> UsersTokenValidation([FromBody]SetToken tokenEncrypted)
        {
            return SignIn.TokenValidation(tokenEncrypted.TokenString);
        }//set user token validation

        [HttpPost]
        public List<string> UsersRememberMeValidation([FromBody]SetReminderToken tokenEncrypted)
        {
            return SignIn.RememberMeValidation(tokenEncrypted.TokenReminderString);
        }//set remember me token 

    }
}
