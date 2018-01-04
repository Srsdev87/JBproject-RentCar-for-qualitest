using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using RentCarDB_SQl_Lib;
using BLL;

namespace RentCarServer_api.Controllers
{
    public class BranchesController : ApiController
    {
        public class SearchBranch
        {
            public string BranchName { get; set; }
        }

        public class Coordinates
        {
            public string Lat { get; set; }
            public string Lng { get; set; }
        }

        [HttpGet]
        public IEnumerable<RentCarBranch> GetAllBranches()
        {
           return Branches.GetAllBranches();
        }// GET all branches in database

        public List<string> GetBranchesLocations()
        {
            return Branches.GetBranchesLocations();
        }//show branch by its name


        [HttpPost]
        public List<string> GetBranchesNameByLocations([FromBody] Coordinates coord)
        {
            try
            {
                return Branches.GetBranchesNameByLocations(coord.Lat, coord.Lng);
            }
            catch (Exception e)
            {
                List<string> DefaultList = new List<string>();
                DefaultList.Add("RentCar");

                return DefaultList;
            }

        }

        [HttpPost]
        public List<string> GetSearchedBranches([FromBody]SearchBranch brnch)
        {
            return Branches.GetSearchedBranches(brnch.BranchName);
        }//show serched branches

        [HttpPost]
        public void DeleteBranchByName(int Id)
        {
            Branches.DeleteBranchByName(Id);
        } //delete branch

        [HttpPost]
        public void AddBranch([FromBody]RentCarBranch newbranch)
        {
            Branches.AddBranch(newbranch);
        }//add new branch

        [HttpPost]
        public void UpdateBranchDetails([FromBody]RentCarBranch updatebranch)
        {
           Branches.UpdateBranchDetails(updatebranch);
        }//update branch details
    }
}
