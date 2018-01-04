var RentCareModule = angular.module("rentCarModule", []);

RentCareModule.controller("rentCarControler",
    function ($scope, $timeout, $http, $window, $location) {
        var tokenExpireDate;
        $scope.carPic = "/vehiclesFleet/defaultcar.png";
        $scope.adminAccess = true;
        $scope.loginbody = " Login";
        $scope.msgHeader = "Settings";
        $scope.dropdowntoggle = "";
        $scope.glyphicon = "glyphicon glyphicon-log-in";
        $scope.dropdown = "";
        $scope.dropdownmenu = "";
        $scope.hidedropmenu = true;
        $scope.logimg = true;
        $scope.set = true;
        $scope.log = true;
        $scope.msg = "";
        $scope.logref = "/Signin_Register.html";
        var count = 0;

        $scope.pcMode = function () {
            if (screen.width < 767) {
                $scope.class = "";
            } else {
                $scope.class = "dropdown";
            }
        };//dropdown mode handler

        $scope.redirectToAbout = function () {
            $location.href = '/AboutUS.html';
        };
      
        $scope.getCookie = function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(':');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {

                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };

        $scope.checkCookie = function () {

            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken).then(function (response) {
                $scope.decryptedToken = response.data;

                var decToken = $scope.decryptedToken;
                var datenow = Date.now();
                 tokenExpireDate = (datenow - parseInt(decToken[2]));
                if ($scope.decToken !== null) {

                    if (decToken[3] === "true") {
                        $scope.adminAccess = false;
                    }

                    if (tokenExpireDate < 900000) {
                        $scope.loginbody = decToken[0];
                        $scope.pic = decToken[1];
                        $scope.logimg = false;
                        $scope.set = false;
                        $scope.log = false;
                        $scope.hidedropmenu = false;
                        $scope.logref = "";
                        $scope.dropdowntoggle = "dropdown-toggle";
                        $scope.dropdown = "dropdown";
                        $scope.dropdownmenu = "dropdown-menu";
                        $scope.glyphicon = "";

                    }
                    else {
                        document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
                    }
                }


            });

        }

        $scope.logOut = function () {

            document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            $window.location = 'https://rentcar.sergeyprsv.com/index.html';
        }

        $scope.Settings = function () {
            $scope.msgHeader = "Settings";
            $('#successModal2').modal('show');

        };

        $scope.logInEnd = function () {
            if ($scope.msgHeader !== "Error") {
                $window.location = 'https://rentcar.sergeyprsv.com/index.html#';
            }

        };

        $scope.endDeal = function () {
            if ($scope.msgHeader !== "Error") {
                $window.location = 'https://rentcar.sergeyprsv.com/RentPage.html#';
            }

        };

        //**********LOGIN*****************************************

        $scope.CalcCost = function() {
            var dayinit = (($scope.toDate - $scope.fromDate) / 86400000);
          
            $scope.totalCost = "Total: "+ dayinit * parseInt($scope.anualCost) + "$";
        };
       
        $scope.LoadCarsList = function () {

            $scope.getFleetslist = function() {
                $http.get('https://rentcar.sergeyprsv.com/api/api/rentcarcustomer/GetAvaliableForRentCars')
                    .then(function(response) {
                        $scope.thisCars = response.data;
                    });
            };         
                 $scope.getFleetslist();
                 $scope.checkCookie();
        };

        $scope.getBrancheslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Branches/GetAllBranches').then(function (response) {
                $scope.thisBranches = response.data;
            });
        };//get all branches in list

        $scope.getBrancheslist();

        $scope.getSearchParams = function() {
            $scope.getFleetslist = function() {
                $http.get('https://rentcar.sergeyprsv.com/api/api/rentcarcustomer/GetAvaliableForRentCars')
                    .then(function(response) {
                        $scope.thisCars = response.data;
                    });
            }; //get all cars in list
            $scope.getFleetslist();
        };

        $scope.editCar = function (picture, licensenumber, manufacturer, model, mileage, yearOfManufacture, branch,daycost,overcost) {
         
            $scope.getCookie();

            if (tokenExpireDate < 900000) {
                $scope.carPic = picture;
                $scope.carLisNum = licensenumber;
                $scope.carManfc = manufacturer;
                $scope.carModel = model;
                $scope.carMlg = "Mileage:" + mileage;
                $scope.carYoMnf = "Year:" + yearOfManufacture;
                $scope.carsBrnch = branch;
                $scope.anualCost = daycost;
                $scope.overCost = "Overdue Cost:" + overcost + "$";
                $scope.carCost = "Daily Cost: " + daycost + "$";
            }
            else {
                document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
            }

            
           count++;
            localStorage.setItem("count", JSON.stringify(count));
            count = JSON.parse(localStorage.getItem("count"));

            if (count>4) {
                count = 0;
            }
            if (count===1) {
                 var viewsObject1 = [
               { Picture: picture },
               { LisNumber: licensenumber },
               { Manufacturer: manufacturer },
               { Model: model },
               { Mileage: mileage },
               { Year: yearOfManufacture },
               { Branch: branch },
               { DayCost: daycost +'$' },
               { OverCost: overcost }
                ];

                 for (var i = 0; i < viewsObject1.length; i++) {
                     localStorage.setItem("viewsObject1", JSON.stringify(viewsObject1));
                 }
                 $scope.viewedCars1 = JSON.parse(localStorage.getItem("viewsObject1"));
                 $scope.test1 = $scope.viewedCars1;
            }
            if (count===2) {
                  var viewsObject2 = [
               { Picture: picture },
               { LisNumber: licensenumber },
               { Manufacturer: manufacturer },
               { Model: model },
               { Mileage: mileage },
               { Year: yearOfManufacture },
               { Branch: branch },
               { DayCost: daycost+'$' },
               { OverCost: overcost }
                ];

                  for (var j = 0; j < viewsObject2.length; j++) {
                      localStorage.setItem("viewsObject2", JSON.stringify(viewsObject2));
                  }
                  $scope.viewedCars2 = JSON.parse(localStorage.getItem("viewsObject2"));
                  $scope.test2 = $scope.viewedCars2;
            }
            if (count===3) {
                var viewsObject3 = [
                    { Picture: picture },
                    { LisNumber: licensenumber },
                    { Manufacturer: manufacturer },
                    { Model: model },
                    { Mileage: mileage },
                    { Year: yearOfManufacture },
                    { Branch: branch },
                    { DayCost: daycost+'$' },
                    { OverCost: overcost }
                ];

                for (var k = 0; k < viewsObject3.length; k++) {
                    localStorage.setItem("viewsObject3", JSON.stringify(viewsObject3));
                }
                $scope.viewedCars3 = JSON.parse(localStorage.getItem("viewsObject3"));
                $scope.test3 = $scope.viewedCars3;
            }
            if (count === 4) {
                var viewsObject4 = [
                    { Picture: picture },
                    { LisNumber: licensenumber },
                    { Manufacturer: manufacturer },
                    { Model: model },
                    { Mileage: mileage },
                    { Year: yearOfManufacture },
                    { Branch: branch },
                    { DayCost: daycost + '$' },
                    { OverCost: overcost }
                ];

                for (var r = 0; r < viewsObject4.length; r++) {
                    localStorage.setItem("viewsObject4", JSON.stringify(viewsObject4));
                }
                $scope.viewedCars4 = JSON.parse(localStorage.getItem("viewsObject4"));
                $scope.test4 = $scope.viewedCars4;
            }
        
       
        };


        $scope.viewedCars1 = JSON.parse(localStorage.getItem("viewsObject1"));
       

        $scope.viewedCars2 = JSON.parse(localStorage.getItem("viewsObject2"));
     

        $scope.viewedCars3 = JSON.parse(localStorage.getItem("viewsObject3"));
     

        $scope.viewedCars4 = JSON.parse(localStorage.getItem("viewsObject4"));


        $scope.editLastViewedCars = function(pic) {

            $http.get('https://rentcar.sergeyprsv.com/api/api/fleet/DetailByPicture?pic=' + pic).then(function(response) {
                    console.log("ok" + response.status);
                    $scope.viewedCar = response.data;
                    var viewedCarDetailsArr = $scope.viewedCar;
                    $scope.getCookie();

                    if (tokenExpireDate < 900000) {
                        $scope.carPic = viewedCarDetailsArr[0];
                        $scope.carLisNum = viewedCarDetailsArr[1];
                        $scope.carManfc = viewedCarDetailsArr[2];
                        $scope.carModel = viewedCarDetailsArr[3];
                        $scope.carMlg = "Mileage:" + viewedCarDetailsArr[4];
                        $scope.carYoMnf = "Year:" + viewedCarDetailsArr[5];
                        $scope.carsBrnch = viewedCarDetailsArr[6];
                        $scope.anualCost = viewedCarDetailsArr[7];
                        $scope.overCost = "Overdue Cost:" + viewedCarDetailsArr[8] + "$";
                        $scope.carCost = "Daily Cost: " + viewedCarDetailsArr[7] + "$";
                    } else {
                        document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
                    }
                },
                function(response) {
                    console.log("error" + response.status);
                });
        };


        $scope.clearTable = function () {
            $scope.carLisNum = "";
            $scope.carManfc = "";
            $scope.carModel = "";
            $scope.carMlg = "";
            $scope.carBrnch = "";
            $scope.carYoMnf = "";
            $scope.carCost = "";
            $scope.overCost = "";
            $scope.fromDate = "";
            $scope.toDate = "";
            $scope.totalCost = "";
            $scope.returnToBrnch = "RentCar Ashdod Main Office";
        };

        $scope.Rent = function () {

            var datenow = Date.now();

            $scope.getCookie();

            if (tokenExpireDate < 900000) {
                if ($scope.returnToBrnch !== undefined && $scope.toDate !== undefined && $scope.fromDate !== undefined) {
                    if ((datenow / 86400000) > ((($scope.fromDate) / 86400000) + 1)) {
                        $scope.msgHeader = "Warning";
                        $scope.errorMsg = "The date of Rent is over, please check the date.";
                        $scope.validDeal = true;
                        $scope.confirmDeal = true;
                        $('#successModal1').modal('show');

                    } else {
                        if (($scope.toDate - $scope.fromDate) > 0) {
                            $scope.msgHeader = "Confirm Order Details";
                            $scope.validDeal = false;
                            $scope.confirmDeal = false;
                            $scope.errorMsg = "";
                            $scope.CalcCost();
                            $('#successModal1').modal('show');
                        } else {
                            $scope.msgHeader = "Warning";
                            $scope.errorMsg = "Date of Return can't be before the date of Renting, please check the date.";
                            $scope.validDeal = true;
                            $scope.confirmDeal = true;
                            $('#successModal1').modal('show');
                        }
                    }
                } else {
                    $scope.msgHeader = "Warning";
                    $scope.errorMsg = "Please Fill All Fields.";
                    $scope.validDeal = true;
                    $scope.confirmDeal = true;
                    $('#successModal1').modal('show');
                }

            }
            else {
                document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
            }

          
        };

        $scope.ProcessDeal = function(pic,username,picture,licensenumber,manufacturer,model,mileage,year,branch,daycost,overcost,fromdate,todate,returntoBrnch,totalcost) {
   
          
            var data = new FormData();

            data.append("userpic", pic);
            data.append("username", username);
            data.append("picture", picture);
            data.append("licensenumber", licensenumber);
            data.append("manufacturer", manufacturer);
            data.append("model", model);
            data.append("mileage", mileage);
            data.append("yearOfManufacture", year);
            data.append("branch", branch);
            data.append("dailyCost", daycost);
            data.append("overduecost", overcost);
            data.append("rentfromdate", fromdate);
            data.append("renttodate", todate);
            data.append("returntobranch", returntoBrnch);
            data.append("totalcost", totalcost);

            // Make Ajax request with the contentType = false, and procesDate = false

            var ajaxRequest = $.ajax({
                type: "POST",
                url: "https://rentcar.sergeyprsv.com/api/api/rentcarcustomer/AddNewOrder",
                contentType: false,
                processData: false,
                data: data
            });

            ajaxRequest.done(function(xhr, textStatus) {
                console.log("ok " + textStatus);
                $scope.UpdateCarAvaliable(licensenumber);
                $scope.getFleetslist();
                $scope.clearTable();
                $('#successModal3').modal('show');
            });
        }

        $scope.SortAvaliableCars = function(gear,year,manufacturer,model,category,branch,yourtext) {

            $scope.getCookie();

            if (tokenExpireDate < 900000) {

              var  yourtextStr = "Gear like \'%" + yourtext + "%\' or  YearOfManufacture like \'%" + yourtext + "%\' or Manufacturer like \'%" + yourtext + "%\' or Model like \'%" + yourtext + "%\' or Category like \'%" + yourtext + "%\' or  Branch like \'%" + yourtext + "%\'";
           
                var carParameter = {
                    Gear: "Gear:" + gear,
                    Year: "YearOfManufacture:" + year,
                    Manufacturer: "Manufacturer:" + manufacturer,
                    Model: "Model:" + model,
                    Category: "Category:" + category,
                    Branch: "Branch:" + branch,
                    YourText: ":" + yourtextStr
                };

               
                    $http.post('https://rentcar.sergeyprsv.com/api/api/rentcarcustomer/GetListOFcarsBySearchParameter', carParameter).then(function (response) {
                        
                        if (response.data === null) {
                            $('#successModal5').modal('show');
                        } else {
                            $scope.thisCars = response.data;
                        }
                    });
                //get all cars in listrentcarcustomer
                  
                 
            }
            else {
                document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
            }

            $scope.carGear = undefined;
            $scope.carYoMnf = undefined;
            $scope.manufacturer = undefined;
            $scope.model = undefined;
            $scope.carCategory = undefined;
            $scope.carBrnch = undefined;
            $scope.yourtext = undefined;
        }
        
        var thisYear = new Date();

        $scope.yearsArr = [
            { Year: thisYear.getFullYear().toString() },
            { Year: (thisYear.getFullYear() - 1).toString() },
            { Year: (thisYear.getFullYear() - 2).toString() },
            { Year: (thisYear.getFullYear() - 3).toString() },
            { Year: (thisYear.getFullYear() - 4).toString() },
            { Year: (thisYear.getFullYear() - 5).toString() },
            { Year: (thisYear.getFullYear() - 6).toString() },
            { Year: (thisYear.getFullYear() - 7).toString() },
            { Year: (thisYear.getFullYear() - 8).toString() }
        ];

        var uniquepass;
        $scope.warningmsg = true;
        $scope.vModel1 = function (mailValidation) {

            if (mailValidation) {

                $scope.classmodel1 = "form-group has-success has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel1 = "form-group has-error has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };
        $scope.vModel2 = function (uniqueValidation) {

            if (uniqueValidation) {

                $scope.classmodel2 = "form-group has-success has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel2 = "form-group has-error has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };
        $scope.vModel3 = function (passValidation) {

            if (passValidation) {

                $scope.classmodel3 = "form-group has-success has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel3 = "form-group has-error has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };
        $scope.vModel4 = function (confpassValidation) {

            if (confpassValidation) {

                $scope.classmodel4 = "form-group has-success has-feedback";
                $scope.spanmodel4 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel4 = "form-group has-error has-feedback";
                $scope.spanmodel4 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };

        $scope.UpdateUserPic = function () {

            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function (response) {
                    $scope.decryptedToken = response.data;

                    var decToken = $scope.decryptedToken;

                    if ($scope.decToken !== null) {

                        var uname = decToken[0];
                        var data = new FormData();

                        var files = $("#fileUpload").get(0).files;

                        // Add the uploaded image content to the form data collection
                        if (files.length > 0) {
                            data.append("UploadedImage", files[0]);
                            $scope.warningmsg = false;
                            $scope.alertStatus = "alert alert-success";
                            $scope.errorMsg = "Picture updated!";
                        } else {
                            $scope.warningmsg = false;
                            $scope.alertStatus = "alert alert-danger";
                            $scope.errorMsg = "No Picture Selected";
                        }
                        data.append("userName", uname);


                        var ajaxRequest = $.ajax({
                            type: "POST",
                            url: "https://rentcar.sergeyprsv.com/api/api/Users/UpdateUserPicture",
                            contentType: false,
                            processData: false,
                            data: data


                        });

                        ajaxRequest.done(function (xhr, textStatus) {
                            console.log("ok " + textStatus);


                            $scope.getUserslist();

                        },
                            function (response) {
                                console.log("error" + response.status);

                                $scope.alertStatus = "alert alert-danger";
                                $scope.warningmsg = false;
                                $scope.errorMsg = "Error Picture Update!";
                            });
                    }
                });


        };

        $scope.ChangePass = function (userMail, mailValidation) {
            var user = $scope.getCookie("UserNameToken");


            var encryptedToken = {
                TokenString: user
            };

            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function (response) {
                    $scope.decryptedToken = response.data;

                    var decToken = $scope.decryptedToken;
                    var d = new Date();

                    uniquepass = Math.floor(Math.random() * 999999 + 1).toString();

                    if (userMail !== "" && mailValidation) {

                        var mailvalidation = {
                            From: "serve23@gmail.com",
                            To: userMail,
                            Subject: "RentCar password change",
                            Mail: "Hello " +
                            decToken[0] +
                            "</br> You requested to change password at: " +
                            d +
                            "</br>" +
                            "If you didn't make this request just ignore this mail.</br>" +
                            "Your unique password is: <h4 style=\"Color:red\">" +
                            uniquepass +
                            "</h4>." +
                            "</br> Have a good ride with RentCar! </br> Contact us at: </br>Tel: +972545429565</br>Fax: +8728512431</br>Mail:Sergey_pr_sv@outlook.com"
                        };


                        $http.post('https://rentcar.sergeyprsv.com/api/api/Home/sendFeedback', mailvalidation)
                            .then(function (response) {
                                console.log("ok" + response.status);

                                $scope.errorMsg = "Mail was sent";
                                $scope.warningmsg = false;
                                $scope.alertStatus = "alert alert-success";
                            },
                            function (response) {
                                console.log("error" + response.status);


                            });
                    } else {
                        $scope.errorMsg = "Error mail send";
                        $scope.warningmsg = false;
                        $scope.alertStatus = "alert alert-danger";
                    }
                });
        };

        $scope.UpdatePass = function (uniquenum, pass, confpass, validunique, validpass, validconfpass) {

            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };

            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function (response) {
                    $scope.decryptedToken = response.data;

                    var decToken = $scope.decryptedToken;

                    if (validunique && validpass && validconfpass) {
                        if (uniquenum === uniquepass) {
                            if (pass === confpass) {

                                var updateUserPass = {
                                    Password: pass,
                                    Username: decToken[0]
                                };
                                $http.post('https://rentcar.sergeyprsv.com/api/api/Home/UpdateUserPassword', updateUserPass)
                                    .then(function (response) {
                                        console.log("ok" + response.status);
                                        $scope.warningmsg = false;
                                        $scope.alertStatus = "alert alert-success";
                                        $scope.errorMsg = "Password updated!";
                                    },
                                    function (response) {
                                        console.log("error" + response.status);
                                        $scope.warningmsg = false;
                                        $scope.alertStatus = "alert alert-danger";
                                        $scope.errorMsg = "Error password update";
                                    });
                            } else {

                                $scope.warningmsg = false;
                                $scope.alertStatus = "alert alert-danger";
                                $scope.errorMsg = "Password not match confirm!";
                            }
                        } else {


                            $scope.warningmsg = false;
                            $scope.alertStatus = "alert alert-danger";
                            $scope.errorMsg = "Uniqie pass not match!";
                        }
                    } else {
                        $scope.warningmsg = false;
                        $scope.alertStatus = "alert alert-danger";
                        $scope.errorMsg = "One or more fields are empty or incorrect. please fill all fields";
                    }
                });


        };

        $scope.closeWarning = function () {
            $scope.warningmsg = true;
        };

        $scope.UpdateCarAvaliable = function (licensenumber) {

            var updateCar = {
                LicenseNumber: licensenumber,
                AvaliableForRent: "Not Avaliable"

        };
            $http.post('https://rentcar.sergeyprsv.com/api/api/rentcarcustomer/UpdateCarAvaliability', updateCar).then(function (response) {
                    console.log("ok" + response.status);
                    $scope.getFleetslist();
                },
                    function (response) {
                        console.log("error" + response.status);
                    });
        }; //update existing car

        $scope.MyOrders = function () {
            $('#successModal4').modal('show');

        };

        $scope.loadOrdersHistory = function () {
            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function (response) {
                    $scope.decryptedToken = response.data;

                    var decToken = $scope.decryptedToken;

                    var uName = {
                        Username: decToken[0]
                    };

                    $scope.getOrdersHistory = function () {
                        $http.post('https://rentcar.sergeyprsv.com/api/api/users/GetOrdersHistory', uName).then(function (response) {
                            $scope.orderHistory = response.data;
                        });
                    }; //get all branches in list
                    $scope.getOrdersHistory();
                });
        };

        if (screen.width < 767) {
            $scope.historyMobile = true;
            $scope.valWidth = "100%";
        } else {
            $scope.historyMobile = false;
            $scope.valWidth = "100%";
        }

    });

