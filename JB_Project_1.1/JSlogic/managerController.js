var managerModule = angular.module("managerModule", []);





managerModule.controller("contactControler",
    function ($scope, $timeout, $http) {

        $scope.vModel1 = function(depValidation) {

            if (depValidation) {

                $scope.classmodel1 = "form-group has-success has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel1 = "form-group has-error has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-remove form-control-feedback";
   
            }
        }
        $scope.vModel2 = function (cnameValidation) {
            if (cnameValidation) {

                $scope.classmodel2 = "form-group has-success has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel2 = "form-group has-error has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-remove form-control-feedback";
 
            }
        }
        $scope.vModel3 = function (telValidation) {
            if (telValidation) {

                $scope.classmodel3 = "form-group has-success has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel3 = "form-group has-error has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-remove form-control-feedback";

            }
        }
        $scope.vModel4 = function (faxValidation) {
            if (faxValidation) {

                $scope.classmodel4 = "form-group has-success has-feedback";
                $scope.spanmodel4 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel4 = "form-group has-error has-feedback";
                $scope.spanmodel4 = "glyphicon glyphicon-remove form-control-feedback";

            }
        }
        $scope.vModel5 = function (mailValidation) {
            if (mailValidation) {

                $scope.classmodel5 = "form-group has-success has-feedback";
                $scope.spanmodel5 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel5 = "form-group has-error has-feedback";
                $scope.spanmodel5 = "glyphicon glyphicon-remove form-control-feedback";

            }
        }


        $scope.GetAllContacts = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Contacts/GetAllContacts').then(function (response) {
                $scope.mailRecipients = response.data;
            });
        };//get all Contacts in list
        $scope.GetAllContacts();

        $scope.DeleteContactById = function (id,contact) {

            var r = confirm("Are you sure you want to delete Contact " + contact+"?");
            if (r === true) {
                $http.post('https://rentcar.sergeyprsv.com/api/api/Contacts/DeleteContactById/' + id).then(function (response) {
                    console.log("ok" + response.status);
                    $scope.GetAllContacts();
                },
                    function (response) {
                        console.log("error" + response.status);
                    });
            } 

            
        };//delete Contact

        $scope.AddContact = function (department, contname, tel, fax, mail, depValidation,cnameValidation,telValidation,faxValidation,mailValidation) {

            if (depValidation && cnameValidation && telValidation &&  faxValidation && mailValidation) {
                var newContact = { Department: department, Contactname: contname, Tel: tel, Fax: fax, Mail: mail.toString() };

                $http.post('https://rentcar.sergeyprsv.com/api/api/Contacts/AddContact', newContact).then(function (response) {
                    console.log("ok" + response.status);
                    $scope.GetAllContacts();
                },
                    function (response) {
                        console.log("error" + response.status);
                        alert("you are not authorized for this action");
                    });
                $scope.clearTable();
           
            }
         

         

        };//add Contact

        $scope.UpdateContactDetails = function (id, department, contname, tel, fax, mail, depValidation, cnameValidation, telValidation, faxValidation, mailValidation) {

            if (depValidation && cnameValidation && telValidation && faxValidation && mailValidation) {
                var updateContact = {
                    Id: id,
                    Department: department,
                    Contactname: contname,
                    Tel: tel,
                    Fax: fax,
                    Mail: mail
                };
                $http.post('https://rentcar.sergeyprsv.com/api/api/Contacts/UpdateContactDetails', updateContact)
                    .then(function(response) {
                            console.log("ok" + response.status);
                            $scope.GetAllContacts();
                        },
                        function(response) {
                            console.log("error" + response.status);
                        });
            }
            $scope.clearTable();
        }; //update existing Contact

        $scope.editContact = function (department, contname, tel, fax, mail) {
            $scope.contDep = department;
            $scope.contName = contname;
            $scope.contTel = tel;
            $scope.contFax = fax;
            $scope.contMail = mail;
        };

        $scope.clearTable = function() {
            $scope.contDep  = "";
            $scope.contName = "";
            $scope.contTel  = "";
            $scope.contFax  = "";
            $scope.contMail = "";
            $scope.classmodel1 = "";
            $scope.spanmodel1 = "";
            $scope.classmodel2 = "";
            $scope.spanmodel2 = "";
            $scope.classmodel3 = "";
            $scope.spanmodel3 = "";
            $scope.classmodel4 = "";
            $scope.spanmodel4 = "";
            $scope.classmodel5 = "";
            $scope.spanmodel5 = "";
        };

    });

managerModule.controller("branchesControler",
    function ($scope, $timeout, $http) {

        $scope.vModel6 = function (depValidation) {

            if (depValidation) {

                $scope.classmodel6 = "form-group has-success has-feedback";
                $scope.spanmodel6 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel6 = "form-group has-error has-feedback";
                $scope.spanmodel6 = "glyphicon glyphicon-remove form-control-feedback";
              
            }
        }
        $scope.vModel7 = function (cnameValidation) {
            if (cnameValidation) {

                $scope.classmodel7 = "form-group has-success has-feedback";
                $scope.spanmodel7 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel7 = "form-group has-error has-feedback";
                $scope.spanmodel7 = "glyphicon glyphicon-remove form-control-feedback";
               
            }
        }
        $scope.vModel8 = function (telValidation) {
            if (telValidation) {

                $scope.classmodel8 = "form-group has-success has-feedback";
                $scope.spanmodel8 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel8 = "form-group has-error has-feedback";
                $scope.spanmodel8 = "glyphicon glyphicon-remove form-control-feedback";
             
            }
        }
        $scope.vModel9 = function (faxValidation) {
            if (faxValidation) {

                $scope.classmodel9 = "form-group has-success has-feedback";
                $scope.spanmodel9 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel9 = "form-group has-error has-feedback";
                $scope.spanmodel9 = "glyphicon glyphicon-remove form-control-feedback";
             
            }
        }
        $scope.vModel10 = function (mailValidation) {
            if (mailValidation) {

                $scope.classmodel10 = "form-group has-success has-feedback";
                $scope.spanmodel10 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel10 = "form-group has-error has-feedback";
                $scope.spanmodel10 = "glyphicon glyphicon-remove form-control-feedback";
              
            }
        }


        $scope.getBrancheslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Branches/GetAllBranches').then(function (response) {
                $scope.thisBranches = response.data;
            });
        };//get all branches in list
        $scope.getBrancheslist();

        $scope.RemoveBranch = function (id,branch) {

            var r = confirm("Are you sure you want to delete Branch " + branch+"?");
            if (r === true) {
$http.post('https://rentcar.sergeyprsv.com/api/api/Branches/DeleteBranchByName/' + id).then(function(response) {
                    console.log("ok" + response.status);
                    $scope.getBrancheslist();
                },
                function(response) {
                    console.log("error" + response.status);
                });
            } 
            
        };//delete branch


        $scope.addBranch = function(branches,
            address,
            latitude,
            longitude,
            status,
            brnchvalidation,
            adrsValidation,
            latValidation,
            lngValidation,
            statValidation) {


            var newBranch = {
                branches: branches,
                address: address,
                latitude: document.getElementById("lat").value.toString(),
                longitude: document.getElementById("lng").value.toString(),
                status: status
            };


            if (brnchvalidation && adrsValidation && latValidation && lngValidation && statValidation) {


                $http.post('https://rentcar.sergeyprsv.com/api/api/Branches/AddBranch', newBranch).then(function(response) {
                        console.log("ok" + response.status);
                        $scope.getBrancheslist();
                    },
                    function(response) {
                        console.log("error" + response.status);
                    });

            }

        }; //add branch


        $scope.UpdateBranch = function(id,
            branches,
            address,
            latitude,
            longitude,
            status,
            brnchvalidation,
            adrsValidation,
            latValidation,
            lngValidation,
            statValidation) {

            if (!brnchvalidation) {
                $scope.contentStyle6 = {
                    "color": "Red"
                };
                $scope.brName = "Enter Branch";
            }

            var updateBranch = {
                Id: id,
                Branches: branches,
                Address: address,
                Latitude: document.getElementById("lat").value.toString(),
                Longitude: document.getElementById("lng").value.toString(),
                Status: status
            };


            if (brnchvalidation && adrsValidation && latValidation && lngValidation && statValidation) {

                $http.post('https://rentcar.sergeyprsv.com/api/api/Branches/UpdateBranchDetails', updateBranch)
                    .then(function(response) {
                            console.log("ok" + response.status);
                            $scope.getBrancheslist();
                        },
                        function(response) {
                            console.log("error" + response.status);
                        });
            }

       
        };//update existing branch

  


       

       

        $scope.editBranch = function (branch, address, latitude, longitude, status) {
            $scope.brName = branch;
            $scope.brAddress = address;
            $scope.brLat = latitude;
            $scope.brLng = longitude;
            $scope.brStat = status;
        };


        $scope.clearTable = function() {
            $scope.brName = "";
            $scope.brAddress = "";
            $scope.brLat = "";
            $scope.brLng = "";
            $scope.brStat = "";
            $scope.classmodel6 = "";
            $scope.spanmodel6 = "";
            $scope.classmodel7 = "";
            $scope.spanmodel7 = "";
            $scope.classmodel8 = "";
            $scope.spanmodel8 = "";
            $scope.classmodel9 = "";
            $scope.spanmodel9 = "";
            $scope.classmodel10 = "";
            $scope.spanmodel10 = "";
        };

        $scope.clear = function () {

            if ($scope.brName === "Enter Branch") {
                $scope.contentStyle6 = {
                    "color": "#555"
                };
                $scope.brName = "";
            }

            if ($scope.brAddress === "Enter Address") {
                $scope.contentStyle7 = {
                    "color": "#555"
                };
                $scope.brAddress = "";
            }

            if ($scope.brLat === "Enter Lat") {
                $scope.contentStyle8 = {
                    "color": "#555"
                };
                $scope.brLat = "";
            }

            if ($scope.brLng === "Enter Lng") {
                $scope.contentStyle9 = {
                    "color": "#555"
                };
                $scope.brLng = "";
            }

            if ($scope.brStat === "Enter Status") {
                $scope.contentStyle10 = {
                    "color": "#555"
                };
                $scope.brStat = "";
            }

        };

    });

managerModule.controller("usersControler",
    function ($scope, $timeout, $http) {

        var regData = new RegExp("^([0-9]{2}(-|.|\\|\/)){2}[0-9]{4}$");

        $scope.vModel11 = function (fnameValidation) {

            if (fnameValidation) {

                $scope.classmodel11 = "form-group has-success has-feedback";
                $scope.spanmodel11 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel11 = "form-group has-error has-feedback";
                $scope.spanmodel11 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel12 = function (unameValidation) {
            if (unameValidation) {

                $scope.classmodel12 = "form-group has-success has-feedback";
                $scope.spanmodel12 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel12 = "form-group has-error has-feedback";
                $scope.spanmodel12 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel13 = function (dateValidation) {
            if (dateValidation && regData.exec($scope.usrBdate)) {

                $scope.classmodel13 = "form-group has-success has-feedback";
                $scope.spanmodel13 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel13 = "form-group has-error has-feedback";
                $scope.spanmodel13 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel14 = function (passValidation) {
            if (passValidation) {

                $scope.classmodel14 = "form-group has-success has-feedback";
                $scope.spanmodel14 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel14 = "form-group has-error has-feedback";
                $scope.spanmodel14 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel15 = function (emailValidation) {
            if (emailValidation) {

                $scope.classmodel15 = "form-group has-success has-feedback";
                $scope.spanmodel15 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel15 = "form-group has-error has-feedback";
                $scope.spanmodel15 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }

       
        $scope.getUserslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Users/GetAllusers').then(function (response) {
                $scope.thisUsers = response.data;
            });
        };//get all users in list
        $scope.getUserslist();

        $scope.RemoveUser = function (id, uName) {

            var r = confirm("Are you sure you want to delete User " + uName + "?");
            if (r === true) {
                $http.post('https://rentcar.sergeyprsv.com/api/api/Users/DeleteUserById/' + id).then(function (response) {
                    console.log("ok" + response.status);
                    $scope.clearTable();
                    $scope.getUserslist();
                },
                    function (response) {
                        console.log("error" + response.status);
                    });
            } 
           
        };//delete user

        $scope.addUser = function (picture, fullname, username, birthdate, gender, password, email,isadmin,
            fnameValidation, unameValidation, dateValidation, passValidation, emailValidation) {

            var data = new FormData();

                var files = $("#fileUpload").get(0).files;

                // Add the uploaded image content to the form data collection
                if (files.length > 0) {
                    data.append("UploadedImage", files[0]);
                }
                data.append("fullname", fullname);
                data.append("userName", username);
                data.append("birthdate", birthdate);
                data.append("gender", gender);
                data.append("password", password);
                data.append("email", email);
                data.append("isadmin", isadmin);
              
                // Make Ajax request with the contentType = false, and procesDate = false
                if (fnameValidation && unameValidation && dateValidation && passValidation && emailValidation && regData.exec($scope.usrBdate)) {
                    var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "https://rentcar.sergeyprsv.com/api/api/Users/Adduser",
                    contentType: false,
                    processData: false,
                    data: data
                });

                ajaxRequest.done(function (xhr, textStatus) {
                    console.log("ok " + textStatus);
                    $scope.getUserslist();
                    $scope.clearTable();
                 
                });
            }
            
 
        
        };//add user


        $scope.UpdateUser = function (id, picture, fullname, username, birthdate, gender, password, email,isadmin,
            fnameValidation, unameValidation, dateValidation, passValidation, emailValidation) {


            

            //*********************************updating picture************************************//
            var data = new FormData();

            var files = $("#fileUpload").get(0).files;

            // Add the uploaded image content to the form data collection
            if (files.length > 0) {
                data.append("UploadedImage", files[0]);
            }
            data.append("userName", username);
         
            if (fnameValidation && unameValidation && dateValidation && passValidation && emailValidation ) {
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "https://rentcar.sergeyprsv.com/api/api/Users/UpdateUserPicture",
                    contentType: false,
                    processData: false,
                    data: data
                }, function (response) {
                    console.log("error" + response.status);
                });

                ajaxRequest.done(function(xhr, textStatus) {
                    console.log("ok " + textStatus);


                    $scope.getUserslist();

                });

                var updateUser = {
                    ID: id,
                    Picture: picture,
                    FullName: fullname,
                    UserName: username,
                    BirthDate: birthdate,
                    Gender: gender,
                    Password: password,
                    Email: email,
                    IsAdmin: isadmin
                };

                $http.post('https://rentcar.sergeyprsv.com/api/api/Users/UpdateUserDetails', updateUser).then(function(response) {
                        console.log("ok" + response.status);
                        $scope.getUserslist();
                    },
                    function(response) {
                        console.log("error" + response.status);
                    });


                $scope.clearTable();
            }


        }; //update existing user

        $scope.editBranch = function (picture, fullname, username, birthdate, gender, password, email,isadmin ) {
            $scope.usrPic = picture;
            $scope.usrFName = fullname;
            $scope.usrUname = username;
            $scope.usrBdate = birthdate;
            $scope.usrGen = gender;
            $scope.usrPass = password;
            $scope.usrMail = email;
            $scope.IsAdmin = isadmin;
        };

        $scope.clearTable = function () {
            $scope.usrFName = "";
            $scope.usrUname = "";
            $scope.usrBdate = "";
            $scope.usrGen = "Male";
            $scope.usrMail = "";
            $scope.usrPass = "";
            $scope.usrPic = "";
            $scope.IsAdmin = "false";
            $scope.classmodel11 = "";
            $scope.spanmodel11 = "";
            $scope.classmodel12 = "";
            $scope.spanmodel12 = "";
            $scope.classmodel13 = "";
            $scope.spanmodel13 = "";
            $scope.classmodel14 = "";
            $scope.spanmodel14 = "";
            $scope.classmodel15 = "";
            $scope.spanmodel15 = "";
        };


        $scope.get = function() {
            var fileVal = document.getElementById("fileUpload");
            var cut = fileVal.value.substring(12, fileVal.length);
            $scope.usrPic = cut;
            alert($scope.usrPic);
        };

        $(function () {
            $scope.usrGen = "Male";
            $("#sel1").val($scope.usrGen);
            $scope.IsAdmin = "false";
            $("#sel2").val($scope.IsAdmin);
        });

    });

managerModule.controller("vehiclesControler",
    function ($scope, $timeout, $http) {

        $scope.vModel16 = function (licenumValidation) {

            if (licenumValidation) {

                $scope.classmodel16 = "form-group has-success has-feedback";
                $scope.spanmodel16 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel16 = "form-group has-error has-feedback";
                $scope.spanmodel16 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel17 = function (manufacValidation) {
            if (manufacValidation) {

                $scope.classmodel17 = "form-group has-success has-feedback";
                $scope.spanmodel17 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel17 = "form-group has-error has-feedback";
                $scope.spanmodel17 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel18 = function (cmodelValidation) {
            if (cmodelValidation) {

                $scope.classmodel18 = "form-group has-success has-feedback";
                $scope.spanmodel18 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel18 = "form-group has-error has-feedback";
                $scope.spanmodel18 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel19 = function (mileageValidation) {
            if (mileageValidation) {

                $scope.classmodel19 = "form-group has-success has-feedback";
                $scope.spanmodel19 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel19 = "form-group has-error has-feedback";
                $scope.spanmodel19 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel20 = function (dcostValidation) {
            if (dcostValidation) {

                $scope.classmodel20 = "form-group has-success has-feedback";
                $scope.spanmodel20 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel20 = "form-group has-error has-feedback";
                $scope.spanmodel20 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }
        $scope.vModel21 = function (ovcostValidation) {
            if (ovcostValidation) {

                $scope.classmodel21 = "form-group has-success has-feedback";
                $scope.spanmodel12 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel21 = "form-group has-error has-feedback";
                $scope.spanmodel21 = "glyphicon glyphicon-remove form-control-feedback";
                $(document).ready(function () {
                    $('[data-toggle="popover"]').popover();
                });
            }
        }

        $scope.getFleetslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Fleet/GetFleetVehicles').then(function (response) {
                $scope.thisCars = response.data;
            });
        };//get all cars in list
        $scope.getFleetslist();

        $scope.getBrancheslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Branches/GetAllBranches').then(function (response) {
                $scope.thisBranches = response.data;
            });
        };//get all branches in list
        $scope.getBrancheslist();

        $scope.RemoveCar = function (id,pic, model, lisnumber) {

            var r = confirm("Are you sure you want to delete car: " + model + " Lisence number: " + lisnumber+"?");
            if (r === true) {
                $http.post('https://rentcar.sergeyprsv.com/api/api/Fleet/DeleteCarByLicenceNumber/' + id).then(function (response) {
                    console.log("ok" + response.status);
                    $scope.clearTable();
                    $scope.getFleetslist();
                },
                    function (response) {
                        console.log("error" + response.status);
                    });
            } 
           
        };//delete cars

        $scope.addNewCar = function (picture, licensenumber, manufacturer, model, gear, mileage, yearOfManufacture, properForRent, avaliableForRent,
            branch, dailyCost, overdueCost, category, licenumValidation, manufacValidation, cmodelValidation, mileageValidation, dcostValidation, ovcostValidation) {

            var data = new FormData();

            var files = $("#fileUpload2").get(0).files;

            // Add the uploaded image content to the form data collection
            if (files.length > 0) {
                data.append("UploadedImage", files[0]);
            }
            data.append("licensenumber", licensenumber);
            data.append("manufacturer", manufacturer);
            data.append("model", model);
            data.append("gear", gear);
            data.append("mileage", mileage);
            data.append("yearOfManufacture", yearOfManufacture);
            data.append("properForRent", properForRent);
            data.append("avaliableForRent", avaliableForRent);
            data.append("branch", branch);
            data.append("dailyCost", dailyCost);
            data.append("overdueCost", overdueCost);
            data.append("category", category);

            // Make Ajax request with the contentType = false, and procesDate = false
            if (licenumValidation && manufacValidation &&  cmodelValidation && mileageValidation && dcostValidation && ovcostValidation) {
                 var ajaxRequest = $.ajax({
                type: "POST",
                url: "https://rentcar.sergeyprsv.com/api/api/Fleet/AddNewCar",
                contentType: false,
                processData: false,
                data: data
            });

            ajaxRequest.done(function (xhr, textStatus) {
                console.log("ok " + textStatus);
                $scope.getFleetslist();
                $scope.clearTable();

            });
            }
           

        };//add Car


        $scope.UpdateCar = function (id, picture, licensenumber, manufacturer, model, gear, mileage, yearOfManufacture, properForRent, avaliableForRent,
            branch, dailyCost, overdueCost, category, licenumValidation, manufacValidation, cmodelValidation, mileageValidation, dcostValidation, ovcostValidation) {


                var updateCar = {
                    ID:id,
                    Picture: picture, LicenseNumber: licensenumber, Manufacturer: manufacturer, Model: model, Gear: document.getElementById("selgear").value, Mileage: mileage,
                    YearOfManufacture: document.getElementById("selyear").value, ProperForRent: document.getElementById("selpfr").value, AvaliableForRent: document.getElementById("selafr").value, Branch: branch,
                    DailyCost: dailyCost, OverdueCost: overdueCost, Category: category
            };

            if (licenumValidation &&
                manufacValidation &&
                cmodelValidation &&
                mileageValidation &&
                dcostValidation &&
                ovcostValidation) {
                $http.post('https://rentcar.sergeyprsv.com/api/api/Fleet/UpdateCarDetails', updateCar).then(function(response) {
                        console.log("ok" + response.status);
                        $scope.getFleetslist();
                    },
                    function(response) {
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

                ajaxRequest.done(function(xhr, textStatus) {
                    console.log("ok " + textStatus);


                    $scope.getFleetslist();

                });
                $scope.clearTable();
            }


        }; //update existing car

        $scope.editCar = function(picture,
            licensenumber,
            manufacturer,
            model,
            gear,
            mileage,
            yearOfManufacture,
            properForRent,
            avaliableForRent,
            branch,
            dailyCost,
            overdueCost, category) {
            $scope.carPic = picture;
            $scope.carLisNum = parseInt(licensenumber);
            $scope.carManfc = manufacturer.toString();
            $scope.carModel = model.toString();
            $scope.carGear = gear.toString();
            $scope.carMlg = parseInt(mileage);
            $scope.carYoMnf = yearOfManufacture.toString();
            $scope.carPfR = properForRent.toString();
            $scope.carAfR = avaliableForRent.toString();
            $scope.carBrnch = branch.toString();
            $scope.carDailyC = parseInt(dailyCost);
            $scope.carOverCost = parseInt(overdueCost);
            $scope.carCategory = category.toString();
        };

        $scope.clearTable = function() {
            $scope.carLisNum = "";
            $scope.carManfc = "";
            $scope.carModel = "";
            $scope.carCategory = "Mini";
            $scope.carGear = "Automatic";
            $scope.carMlg = "";
            $scope.carYoMnf = "2017";
            $scope.carPfR = "Avaliable";
            $scope.carAfR = "Avaliable";
            $scope.carBrnch = "RentCar Ashdod Main Office";
            $scope.carDailyC = "";
            $scope.carOverCost = "";
            $scope.classmodel16 = "";
            $scope.spanmodel16 = "";
            $scope.classmodel17 = "";
            $scope.spanmodel17 = "";
            $scope.classmodel18 = "";
            $scope.spanmodel18 = "";
            $scope.classmodel19 = "";
            $scope.spanmodel19 = "";
            $scope.classmodel20 = "";
            $scope.spanmodel20 = "";
            $scope.classmodel21 = "";
            $scope.spanmodel21 = "";
        };

        $(document).ready(function () {

            $('#btnUploadFile2').on('click', function () {

                var data = new FormData();

                var files = $("#fileUpload2").get(0).files;


                // Add the uploaded image content to the form data collection
                if (files.length > 0) {
                    data.append("UploadedImage", files[0]);
                }
                

                // Make Ajax request with the contentType = false, and procesDate = false
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "https://rentcar.sergeyprsv.com/api/api/Fleet/uploadfile",
                    contentType: false,
                    processData: false,
                    data: data
                });

                ajaxRequest.done(function (xhr, textStatus) {
                    // Do other operation
                });
            });



        });//ajax request

        $scope.get = function () {
            var fileVal = document.getElementById("fileUpload2");
            var cut = fileVal.value.substring(12, fileVal.length);
            $scope.usrPic = cut;
            alert($scope.usrPic);
        };


        $(function () {
            $scope.carGear = "Automatic";
            $("#selgear").val($scope.carGear);

            $scope.carYoMnf = "2017";
            $("#selyear").val($scope.carYoMnf);

            $scope.carPfR = "Avaliable";
            $("#selpfr").val($scope.carPfR);

            $scope.carAfR = "Avaliable";
            $("#selafr").val($scope.carAfR);

            $scope.carBrnch = "RentCar Ashdod Main Office";
            $("#selbranch").val($scope.carBrnch);

            $scope.carCategory = "Mini";
            $("#selcategory").val($scope.carCategory);


        });



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


    });

managerModule.controller("navControl",
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
            $('#successModal1').modal('show');

        };

        $scope.logInEnd = function () {
            if ($scope.msgHeader !== "Error") {
                $window.location = 'https://rentcar.sergeyprsv.com/index.html#';
            }

        };

    });

managerModule.controller("settingsController",
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

            $('#successModal1').modal('show');

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


managerModule.controller("serverErrorControler",
    function ($scope, $timeout, $http) {

        $scope.getErrorsLoglist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Home/GetErrorsLog').then(function (response) {
                $scope.serverErrorLogs = response.data;
            });
        };//get all branches in list
        $scope.getErrorsLoglist();
    });


