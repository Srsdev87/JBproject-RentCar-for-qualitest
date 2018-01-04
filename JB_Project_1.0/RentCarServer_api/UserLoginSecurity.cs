using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentCarServer_api
{
    public class UserLoginSecurity
    {
        public static bool LogIn(string username, string password)
        {
            using (RentCarDatabaseEntities1 userEntities = new RentCarDatabaseEntities1())
            {
                return userEntities.RentCarUserDBs.Any(user => user.UserName.Equals(username, 
                    StringComparison.OrdinalIgnoreCase) &&
                user.Password == password);
            }
        }//show user by its id
    }
}