
var MainModule = angular.module("indexModule", ["ngRoute"]);

var latx = 31.794493;
var lngy = 34.650326;
var coordinates = { lat: latx, lng: lngy };

var count = 0;


MainModule.controller("indexControl",
    function ($scope, $timeout, $http) {

        $scope.getBrancheslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Branches/GetAllBranches').then(function (response) {
                $scope.thisBranches = response.data;
            });
        };//get all branches in list
        $scope.getBrancheslist();

        $scope.gotoAddress = function (branchL, branchB) {

            //var latX = branchL.substring(0, 9);
            //var lngY = branchB.substring(0, 9);

       

            latx = parseFloat(branchL);
            lngy = parseFloat(branchB);
            initMap();
        };

        var currTime = new Date();

        if (currTime.getHours() >= 7 && currTime.getHours() < 19) {
            $scope.status = "Open";

            $scope.StatusStyle = {
                "color": "lawngreen"
            };
        } else {
            $scope.status = "Closed";
            $scope.StatusStyle = {
                "color": "Red"
            };
        }//branches open/close status

        $scope.srch = function () {
            $scope.content = "";
        };//onclick delete search bar content

        $scope.findbrnch = function (content) {

            var searchforBranch = {
                BranchName: content
            }

            $http.post('https://rentcar.sergeyprsv.com/api/api/Branches/GetSearchedBranches', searchforBranch).then(function (response) {
                $scope.thisBranchesSearched = response.data;

                var branchCoordinates = $scope.thisBranchesSearched;
              
                if (branchCoordinates[0] !== "branchnotFound") {
                         latx = parseFloat(branchCoordinates[1]);
                lngy = parseFloat(branchCoordinates[2]);
                initMap();
                } else {
                    $scope.contentStyle = {
                        "color": "Red"
                    };
                    $scope.content = "Sorry, there is no branch there...";
                    $timeout(function () {
                        $scope.content = "Redirecting to main office";
                    },
                        4000);
                    $timeout(function () {
                        latx = 31.794493;
                        lngy = 34.650326;
                        initMap();
                    },
                        6000);
                    $timeout(function () {
                        $scope.content = "";
                    },
                        10000);
                }
           
            });
           

         
        };//branches search locations

        $scope.enterpressalert = function (keyEvent, content) {
            if (keyEvent.which === 13) {
                $scope.findbrnch(content);
            }
        };//find branch with Enter key

        if (screen.width < 767) {
            $scope.branchMobile = true;
            
        } else {
            $scope.branchMobile = false;
          
        }

    });


MainModule.controller("navControl",
    function ($scope, $http, $window, $location) {

        $scope.adminAccess = true;
        $scope.loginbody = " Login";
        $scope.styleeffect = "";
        $scope.dropdowntoggle = "";
        $scope.glyphicon = "glyphicon glyphicon-log-in";
        $scope.dropdown = "";
        $scope.dropdownmenu = "";
        $scope.hidedropmenu = true;
        $scope.logimg = true;
        $scope.set = true;
        $scope.log = true;
        $scope.myorder = true;
        $scope.logref = "/Signin_Register.html";

        $scope.pcMode = function() {
            if (screen.width < 767) {
                $scope.class = "";
            } else {
                $scope.class = "dropdown";
            }
        };//dropdown mode handler

        $scope.redirectToAbout = function() {
            $location.href = '/AboutUS.html';
        };
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

        $scope.checkCookie = function() {

            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function(response) {
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
                            $scope.myorder = false;
                            $scope.hidedropmenu = false;
                            $scope.logref = "";
                            $scope.dropdowntoggle = "dropdown-toggle";
                            $scope.dropdown = "dropdown";
                            $scope.dropdownmenu = "dropdown-menu";
                            $scope.glyphicon = "";
                            $scope.styleeffect = "padding: 0px 15px;";
                        } else {
                            document.cookie = "UserNameToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
                        }
                    }


                });

            $scope.OurCarsRent = function() {
                if ($scope.loginbody !== " Login") {
                    $window.location = 'https://rentcar.sergeyprsv.com/RentPage.html#';
                } else {
                    $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';
                }
            };
        };

        $scope.logOut = function() {

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

        $scope.MyOrders = function () {
            $('#successModal2').modal('show');

        };

     
    });


MainModule.controller("settingsController",
    function ($scope, $http, $timeout) {

        $scope.loadOrdersHistory = function() {
            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function(response) {
                    $scope.decryptedToken = response.data;

                    var decToken = $scope.decryptedToken;

                    var uName = {
                        Username: decToken[0]
                    };

                    $scope.getOrdersHistory = function() {
                        $http.post('https://rentcar.sergeyprsv.com/api/api/users/GetOrdersHistory', uName).then(function(response) {
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

       

        var uniquepass;
        $scope.warningmsg = true;
        $scope.vModel1 = function(mailValidation) {

            if (mailValidation) {

                $scope.classmodel1 = "form-group has-success has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel1 = "form-group has-error has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };
        $scope.vModel2 = function(uniqueValidation) {

            if (uniqueValidation) {

                $scope.classmodel2 = "form-group has-success has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel2 = "form-group has-error has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };
        $scope.vModel3 = function(passValidation) {

            if (passValidation) {

                $scope.classmodel3 = "form-group has-success has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel3 = "form-group has-error has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-remove form-control-feedback";

            }
        };
        $scope.vModel4 = function(confpassValidation) {

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

        $scope.UpdateUserPic = function() {

            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };
            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function(response) {
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

                        ajaxRequest.done(function(xhr, textStatus) {
                                console.log("ok " + textStatus);


                                $scope.getUserslist();

                            },
                            function(response) {
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


        $scope.ChangePass = function(userMail, mailValidation) {
            var user = $scope.getCookie("UserNameToken");


            var encryptedToken = {
                TokenString: user
            };

            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function(response) {
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
                            .then(function(response) {
                                    console.log("ok" + response.status);

                                    $scope.errorMsg = "Mail was sent";
                                    $scope.warningmsg = false;
                                    $scope.alertStatus = "alert alert-success";
                                },
                                function(response) {
                                    console.log("error" + response.status);


                                });
                    } else {
                        $scope.errorMsg = "Error mail send";
                        $scope.warningmsg = false;
                        $scope.alertStatus = "alert alert-danger";
                    }
                });
        };

        $scope.UpdatePass = function(uniquenum, pass, confpass, validunique, validpass, validconfpass) {

            var user = $scope.getCookie("UserNameToken");

            var encryptedToken = {
                TokenString: user
            };

            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/userstokenvalidation', encryptedToken)
                .then(function(response) {
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
                                    .then(function(response) {
                                            console.log("ok" + response.status);
                                            $scope.warningmsg = false;
                                            $scope.alertStatus = "alert alert-success";
                                            $scope.errorMsg = "Password updated!";
                                        },
                                        function(response) {
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

        $scope.closeWarning = function() {
            $scope.warningmsg = true;
        };

    
       
    });


MainModule.controller("ContactControl",
    function ($scope, $http) {

        $scope.vModel1 = function(fromValidation) {

            if (fromValidation) {

                $scope.classmodel1 = "form-group has-success has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel1 = "form-group has-error has-feedback";
                $scope.spanmodel1 = "glyphicon glyphicon-remove form-control-feedback";
            
            }
        };
        $scope.vModel2 = function(toValidation) {
            if (toValidation) {

                $scope.classmodel2 = "form-group has-success has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel2 = "form-group has-error has-feedback";
                $scope.spanmodel2 = "glyphicon glyphicon-remove form-control-feedback";
               
            }
        };
        $scope.vModel3 = function(subjectValidation) {
            if (subjectValidation) {

                $scope.classmodel3 = "form-group has-success has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-ok form-control-feedback";
            } else {
                $scope.classmodel3 = "form-group has-error has-feedback";
                $scope.spanmodel3 = "glyphicon glyphicon-remove form-control-feedback";
             
            }
        };

        $scope.GetAllContacts = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Contacts/GetAllContacts').then(function (response) {
                $scope.mailRecipients = response.data;
            });
        };//get all Contacts in list
        $scope.GetAllContacts();

        $scope.submitMail = function (isFrom, isTo, isSubmit,from,to,subject,mail) {

            var mailvalidation = {
                From: from,
                To: to,
                Subject: subject,
                Mail: mail
            };

            if (isFrom && isTo) {
                if (isSubmit) {
                   // alert("Your feedback was sent");

                    $scope.msgHeader = "Your feedback was sent";
                    $scope.msg1 = "Thank you for contacting us!";
                    $scope.msg2 = "We allyays happy to be in touch!";
                    $('#successModal3').modal('show');

                    $scope.From = "";
                    $scope.To = "";
                    $scope.Subject = "";
                    $scope.Mail = "";
                    //this function will send ajax request to server and evaluate a mail send.......

                    $http.post('https://rentcar.sergeyprsv.com/api/api/Home/sendFeedback', mailvalidation).then(function (response) {
                        console.log("ok" + response.status);
                      
                    },
                        function (response) {
                            console.log("error" + response.status);
                        });

                } else {
                    var validation = confirm("Subject is empty, send mail anyway?");
                    if (validation) {
                        $scope.msgHeader = "Your feedback was sent";
                        $scope.msg1 = "Thank you for contacting us!";
                        $scope.msg2 = "We allyays happy to be in touch!";
                        $('#successModal3').modal('show');

                        $scope.From = "";
                        $scope.To = "";
                        $scope.Subject = "";
                        $scope.Mail = "";

                        //this function will send ajax request to server and evaluate a mail send.........
                        $http.post('https://rentcar.sergeyprsv.com/api/api/Home/sendFeedback', mailvalidation).then(function (response) {
                            console.log("ok" + response.status);

                        },
                            function (response) {
                                console.log("error" + response.status);
                            });
                    }
                }
            } else {

                if (!isFrom) {
                    $scope.msgHeader = "Error";
                    $scope.msg1 = "Enter a valid sender eMail";
                    $scope.msg2 = "";
                    $('#successModal3').modal('show');
                } else if (!isTo) {
                    $scope.msgHeader = "Error";
                    $scope.msg1 = "Enter a valid recipient eMail";
                    $scope.msg2 = "";
                    $('#successModal3').modal('show');
                } else {
                    $scope.msgHeader = "Error";
                    $scope.msg1 = "Error mail send";
                    $scope.msg2 = "";
                    $('#successModal3').modal('show');
                }

            }
        };//send feedback mail (contact us)
        $scope.sendToRecipient = function(respmail) {
            $scope.To = respmail;
        };

        $scope.btnRefresh = function () {
            $scope.From = "";
            $scope.To = "";
            $scope.Subject = "";
            $scope.Mail = "";
        };//Clear feedback fields
    });


MainModule.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "index.html"
        })
        .when("/aboutus", {
            templateUrl: "AboutUS.html"
        })
        .when("/useragreement", {
            templateUrl: "UserAgreement.html"
        })
        .when("/signin_register", {
            templateUrl: "Signin_Register.html"
        })
        .when("/rentpage", {


            templateUrl: "Signin_Register.html"


        });

});


function initMap() {
    coordinates = { lat: latx, lng: lngy };

    count++;
    var infowindow = new google.maps.InfoWindow();
    var marker;
    var brName;
    var btLat;
    var brLng;
   
    var map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 12,
            center: coordinates
        });

    //var ctaLayer = new google.maps.KmlLayer({
    //    url: 'https://raw.githubusercontent.com/Srsdev87/KMLmap/master/RentCarBranches2017.kml',

    //    map: map,
    //    preserveViewport: true
    //});

    if (count<2) {
     

    $.get('https://rentcar.sergeyprsv.com/api/api/Branches/GetBranchesLocations',
        function (data, status) {
            var response = data;

            for (var i = 0; i < response.length; i++) {
                var splittedBranchCoordinates = response[i].split(':');

               brName = splittedBranchCoordinates[0];
               btLat = splittedBranchCoordinates[1];
               brLng = splittedBranchCoordinates[2];

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(btLat), parseFloat(brLng)),
                    map: map
                });


                infowindow = new google.maps.InfoWindow({
                    content: brName + "<img src=\"images/logo.png\" style=\"width: 40px; height: auto\"/>"

                });
                infowindow.open(map, marker);
            }
        });
    } else {
     
        $.post('https://rentcar.sergeyprsv.com/api/api/Branches/GetBranchesNameByLocations',
            {
                Lat: latx,
                Lng: lngy
            },
            function (data, status) {
                var response = data;

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(latx), parseFloat(lngy)),
                    map: map
                });

                infowindow = new google.maps.InfoWindow({
                    content: response + "<img src=\"images/logo.png\" style=\"width: 40px; height: auto\"/>"

                });
                infowindow.open(map, marker);

            });
    }

    google.maps.event.addListener(map,
        'click',
        function(event) {
            marker = new google.maps.Marker({ position: event.latLng, map: map });
            document.getElementById("lat").value = event.latLng.lat().toString();
            document.getElementById("lng").value = event.latLng.lng().toString();

         
        });

}//google map









