var ReturnVehicleModule = angular.module("returnVehicleModule", []);

ReturnVehicleModule.controller("returnVehiclesControler",
    function ($scope, $timeout, $http, $window) {

        $scope.username = "";
        $scope.msgHeader = "end deal";
        $scope.carPic = "/vehiclesFleet/defaultcar.png";
        var tokenExpireDate;

        $scope.RentedCars = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/returnvehicle/GetRentedCars').then(function (response) {
                $scope.rentedCars = response.data;
            });
        };//get all cars in list
        $scope.RentedCars();

        $scope.getBrancheslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Branches/GetAllBranches').then(function (response) {
                $scope.thisBranches = response.data;
            });
        };//get all branches in list
        $scope.getBrancheslist();

      

      

        $scope.UpdateCar = function (id, picture, licensenumber, manufacturer, model, gear, mileage, yearOfManufacture, properForRent, avaliableForRent,
            branch, dailyCost, overdueCost, category) {


            var updateCar = {
                ID: id,
                Picture: picture, LicenseNumber: licensenumber, Manufacturer: manufacturer, Model: model, Gear: document.getElementById("selgear").value, Mileage: mileage,
                YearOfManufacture: document.getElementById("selyear").value, ProperForRent: document.getElementById("selpfr").value, AvaliableForRent: document.getElementById("selafr").value, Branch: branch,
                DailyCost: dailyCost, OverdueCost: overdueCost, Category: category
            };

         
                $http.post('https://rentcar.sergeyprsv.com/api/api/Fleet/UpdateCarDetails', updateCar).then(function (response) {
                    console.log("ok" + response.status);
                    $scope.getFleetslist();
                },
                    function (response) {
                        console.log("error" + response.status);
                    });

                //*********************************updating picture************************************//
                var data = new FormData();

                var files = $("#fileUpload2").get(0).files;

                // Add the uploaded image content to the form data collection
                if (files.length > 0) {
                    data.append("UploadedImage", files[0]);
                }
                data.append("licensenumber", licensenumber);
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "https://rentcar.sergeyprsv.com/api/api/Fleet/UpdateCarPicture",
                    contentType: false,
                    processData: false,
                    data: data
                });

                ajaxRequest.done(function (xhr, textStatus) {
                    console.log("ok " + textStatus);


                    $scope.getFleetslist();

                });
                $scope.clearTable();
            


        }; //update existing car

        $scope.editCar = function (picture, licensenumber, manufacturer, model, mileage, year, branch, daycost, overcost, daterented, datereturned, returnto, total, username) {

            $scope.carPic = picture;
            $scope.carLisNum = licensenumber;
            $scope.carManfc = manufacturer;
            $scope.carModel = model;    
            $scope.carMlg = mileage;
            $scope.carYoMnf = year;
            $scope.carBrnch = branch;
            $scope.DailyCost = daycost ;
            $scope.OverCost = overcost ;
            $scope.DateRented = daterented;
            $scope.DateReturned = datereturned;
            $scope.ReturnBrnch = returnto;
            $scope.TotalCost = total ;
            $scope.username = username;

        };

        $scope.clearTable = function () {
            $scope.carPic = "/vehiclesFleet/defaultcar.png";
            $scope.carLisNum = "";
            $scope.carManfc = "";
            $scope.carModel = "";
            $scope.carMlg = "";
            $scope.carYoMnf = "";
            $scope.carBrnch = "RentCar Ashdod Main Office";
            $scope.DailyCost = "";
            $scope.OverCost = "";
            $scope.DateRented = "";
            $scope.ReturnBrnch = "";
            $scope.TotalCost = "";
            $scope.TotalCost = "";
            $scope.DateReturned = "";
            $scope.FinalTotalCost = "";
            $scope.returntoBrnch = "";
            $scope.actualRetDate = "";
        };

        
     
    


        $scope.searchOrder = function (licencenumber) {

           // $scope.getCookie();

            var carParameter = {
                LicenceNumber: licencenumber

            };

        

            $scope.RentedCars = function () {
                $http.post('https://rentcar.sergeyprsv.com/api/api/returnvehicle/GetRentedCarByLicNum', carParameter).then(function (response) {
                    $scope.rentedCars = response.data;
                });
            };
            $scope.RentedCars();

            //if (tokenExpireDate < 900000) {

            //}
            //else {
            //    document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            //    $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
            //}


        }


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

        $scope.CalcDealTotal = function () {
            var parsedReturnDate = Date.parse($scope.DateReturned);
            var overdueDays = ($scope.actualRetDate - parsedReturnDate) / 86400000;
            var transporterTax = 0;
            $scope.overduedays = overdueDays;

            var overdueNumarr = $scope.OverCost.split('$');
            var overdueNum = overdueNumarr[0];
            var overdueNumVal = overdueNum.split(':');
            var overValue = overdueNumVal[1];

            var totalNumarr = $scope.TotalCost.split('$');
            var totalNum = totalNumarr[0];
            var totalNumVal = totalNum.split(' ');
            var totalValue = totalNumVal[1];
           

            if ($scope.ReturnBrnch !== $scope.returntoBrnch) {
                transporterTax = 80;

            }

            $scope.FinalTotalCost = parseInt(totalValue) + (parseInt(overValue) * parseInt(overdueDays)) + parseInt(transporterTax) + "$";
        }

    

        $scope.ReturnVehicle = function () {
          

            var parsedReturnDate = Date.parse($scope.DateReturned);
            var parsedDateRented = Date.parse($scope.DateRented);
            var overdueDays = ($scope.actualRetDate - parsedReturnDate) / 86400000;
            $scope.overduedays = overdueDays;
        


            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function(response) {
                    $scope.decryptedToken = response.data;


                    var decToken = $scope.decryptedToken;
                    var datenow = Date.now();
                    tokenExpireDate = (datenow - parseInt(decToken[2]));

                    if (tokenExpireDate < 900000) {
                        if ($scope.returntoBrnch !== undefined && $scope.actualRetDate !== undefined && $scope.DateReturned !== undefined) {
                            if ((parsedDateRented / 86400000) > (($scope.actualRetDate) / 86400000)) {
                                $scope.msgHeader = "Warning";
                                $scope.errorMsg = "Date of Return can't be before the date of Renting, please check the date.";
                                $scope.validDeal = true;
                                $scope.confirmDeal = true;
                                $('#successModal1').modal('show');

                            } else {
                               
                                    $scope.msgHeader = "Order Details (Finish deal)";
                                    $scope.validDeal = false;
                                    $scope.confirmDeal = false;
                                    $scope.errorMsg = "";
                                    $('#successModal1').modal('show');
                                
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

                });
        }

        $scope.UpdateAvaliability = function (licensenumber) {
            alert("deal ended!");
            var updateCar = {
                LicenseNumber: licensenumber,
                AvaliableForRent: "Avaliable"
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/returnvehicle/UpdateRentedStatus', updateCar).then(function (response) {
                console.log("ok" + response.status);
                $scope.RentedCars();

                 
                },
                function (response) {
                    console.log("error" + response.status);
                });
        };


        $scope.EndDeal = function (username, pic, licensenumber, manufacturer, model, mileage, year, branch, daycost, overcost, fromdate, todate, actualretdate, returntobrnch, finaltotalcost) {
            var data = new FormData();

            data.append("username", username);
            data.append("picture", pic);
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
            data.append("actualreturndate", actualretdate);
            data.append("returntobrnch", returntobrnch);
            data.append("finaltotalcost", finaltotalcost);

            // Make Ajax request with the contentType = false, and procesDate = false

            var ajaxRequest = $.ajax({
                type: "POST",
                url: "https://rentcar.sergeyprsv.com/api/api/returnvehicle/AddNewOrderToHistory",
                contentType: false,
                processData: false,
                data: data
            });

            ajaxRequest.done(function (xhr, textStatus) {
                console.log("ok " + textStatus);
                $scope.UpdateAvaliability(licensenumber);
                $scope.RentedCars();
                $scope.clearTable();
               // $('#successModal3').modal('show');
            });
        }



    });


ReturnVehicleModule.controller("navControl",
    function ($scope, $http, $window) {


        $scope.adminAccess = true;
        $scope.loginbody = " Login";

        $scope.dropdowntoggle = "";
        $scope.glyphicon = "glyphicon glyphicon-log-in";
        $scope.dropdown = "";
        $scope.dropdownmenu = "";
        $scope.hidedropmenu = true;
        $scope.logimg = true;
        $scope.set = true;
        $scope.log = true;

        $scope.logref = "/Signin_Register.html";


        $scope.pcMode = function () {
            if (screen.width < 767) {
                $scope.class = "";
            } else {
                $scope.class = "dropdown";
            }
        };//dropdown mode handler


        $scope.msg = "";


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
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function (response) {
                    $scope.decryptedToken = response.data;

                    var decToken = $scope.decryptedToken;
                    var datenow = Date.now();
                    var tokenExpireDate = datenow - parseInt(decToken[2]);
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

                        } else {
                            document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
                        }
                    }


                });


            $scope.OurCarsRent = function () {
                if ($scope.loginbody !== " Login") {
                    $window.location = 'https://rentcar.sergeyprsv.com/RentPage.html#';
                } else {
                    $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
                }
            };




        };


        $scope.logOut = function () {

            document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            $window.location = 'https://rentcar.sergeyprsv.com/index.html';
        };


        $scope.Settings = function () {
            $scope.msgHeader = "Settings";
            $('#successModal2').modal('show');

        };

        $scope.logInEnd = function () {
            if ($scope.msgHeader !== "Error") {
                $window.location = 'https://rentcar.sergeyprsv.com/index.html#';
            }

        };

    });

ReturnVehicleModule.controller("settingsController",
    function ($scope, $http, $timeout) {
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

        $scope.msgHeader = "Settings";
        $scope.Settings = function () {

            $('#successModal2').modal('show');

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

                        var files = $("#fileUpload1").get(0).files;

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
    });