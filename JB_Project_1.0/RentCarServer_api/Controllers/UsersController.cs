using RentCarDB_SQl_Lib;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class UsersController : ApiController
    {
        public class Uname
        {
            public string Username { get; set; }
            public string Email { get; set; }
        }

        [HttpGet]
        public IEnumerable<RentCarUserDB> GetAllusers()
        {
            return Users.GetAlluserslist();
        } // GET all users in database

        [HttpPost]
        public List<string> CheckUserExistance([FromBody]Uname userCheck)
        {
            return Users.IsUserExist(userCheck.Username, userCheck.Email);
        } // check credentials existance

        [HttpPost]
        public List<RentCarUsersRentHistory> GetOrdersHistory([FromBody]Uname username)
        {
            return Users.OrdersHistory(username.Username);
        }//return list of orders history

        [HttpGet]
        public RentCarUserDB Get(int id)
        {
            return Get(id);
        }//show user by its id

        [HttpPost]
        public void DeleteUserById(int Id)
        {
             Users.DeleteUser(Id);
        } //delete user

        //update user details
        [HttpPost]
        public void UpdateUserDetails([FromBody]RentCarUserDB updateuser)
        {
            Users.UpdateUser(updateuser);
        }

        [HttpPost]
        public void UpdateUserPicture()
        {
            Users.UpdateUserPicture();
        }

        [HttpPost]
        public void Adduser()
        {
            Users.AddNewUser();
        }

    }
}
