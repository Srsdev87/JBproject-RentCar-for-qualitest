var managerModule = angular.module("registerModule", []);


managerModule.controller("usersregister",
    function ($scope, $http, $window) {

        
        var regData = new RegExp("^([0-9]{2}(-|.|\\|\/)){2}[0-9]{4}$");


        $scope.vModel11 = function(fnameValidation) {

            if (fnameValidation) {

                $scope.classmodel11 = "form-group has-success has-feedback";
                $scope.spanmodel11 = "glyphicon glyphicon-ok form-control-feedback";
            } else if (fnameValidation === false) {
                $scope.classmodel11 = "form-group has-error has-feedback";
                $scope.spanmodel11 = "glyphicon glyphicon-remove form-control-feedback";
              
            }
        };
        $scope.vModel12 = function(unameValidation) {
            if (unameValidation) {

                $scope.classmodel12 = "form-group has-success has-feedback";
                $scope.spanmodel12 = "glyphicon glyphicon-ok form-control-feedback";
            } else if (unameValidation===false){
                $scope.classmodel12 = "form-group has-error has-feedback";
                $scope.spanmodel12 = "glyphicon glyphicon-remove form-control-feedback";
               
            }
        };
        $scope.vModel13 = function(dateValidation) {
            if (dateValidation && regData.exec($scope.usrBdate)) {

                $scope.classmodel13 = "form-group has-success has-feedback";
                $scope.spanmodel13 = "glyphicon glyphicon-ok form-control-feedback";
            } else if (dateValidation === false && regData.exec($scope.usrBdate)===false){
                $scope.classmodel13 = "form-group has-error has-feedback";
                $scope.spanmodel13 = "glyphicon glyphicon-remove form-control-feedback";
               
            }
        };
        $scope.vModel14 = function(passValidation) {
            if (passValidation) {

                $scope.classmodel14 = "form-group has-success has-feedback";
                $scope.spanmodel14 = "glyphicon glyphicon-ok form-control-feedback";
            } else if (passValidation===false){
                $scope.classmodel14 = "form-group has-error has-feedback";
                $scope.spanmodel14 = "glyphicon glyphicon-remove form-control-feedback";
               
            }
        };
        $scope.vModel15 = function(emailValidation) {
            if (emailValidation) {

                $scope.classmodel15 = "form-group has-success has-feedback";
                $scope.spanmodel15 = "glyphicon glyphicon-ok form-control-feedback";
            } else if (emailValidation===false){
                $scope.classmodel15 = "form-group has-error has-feedback";
                $scope.spanmodel15 = "glyphicon glyphicon-remove form-control-feedback";
              
            }
        };

        $scope.getUserslist = function () {
            $http.get('https://rentcar.sergeyprsv.com/api/api/Users/GetAllusers').then(function (response) {
                $scope.thisUsers = response.data;
            });
        };//get all users in list

        $scope.addUser = function (picture, fullname, username, birthdate, gender, password, email,
            fnameValidation, unameValidation, dateValidation, passValidation, emailValidation) {

            var data = new FormData();

            var files = $("#fileUpload").get(0).files;


            var checkUserCredentialValidation = {
                Username: username,
                Email: email
            }


            $http.post('https://rentcar.sergeyprsv.com/api/api/users/checkuserexistance', checkUserCredentialValidation).then(function (response) {
                $scope.existanceresponse = response.data;
                console.log("ok" + response.status);
                var credentialsCheck = $scope.existanceresponse;

                if (credentialsCheck[0] === "usernameValid" && credentialsCheck[1] === "mailValid") {

                    if (files.length > 0) {
                        data.append("UploadedImage", files[0]);
                    }
                    data.append("fullname", fullname);
                    data.append("userName", username);
                    data.append("birthdate", birthdate);
                    data.append("gender", gender);
                    data.append("password", password);
                    data.append("email", email);



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

                            $scope.msgHeader = "Welcome!";
                            $scope.msgBody = "You registered successfully! Welcome " + fullname;
                            $('#successModal').modal('show');
                            $scope.getUserslist();
                            $scope.clearTable();
                            $window.location = 'https://rentcar.sergeyprsv.com/Signin_Register.html#';

                        });
                    } else {
                        $scope.msgHeader = "Warning!";
                        $scope.msgBody = "One or more fields are empty or incorrect....please try again.";
                        $('#successModal').modal('show');
                    }

                }

                if (credentialsCheck[0] === "usernameExist") {
                 
                    $scope.msgHeader = "Warning!";
                    $scope.msgBody = "This Username alredy Exist, try another one..";
                    $('#successModal').modal('show');
                }

                if (credentialsCheck[1] === "mailExist") {
                    $scope.msgHeader = "Warning!";
                    $scope.msgBody = "User with this eMail alredy registered, try another one..";
                    $('#successModal').modal('show');
                }

            },
                function (response) {
                    console.log("error" + response.status);

                });
        

           
           


        };//add user


        $scope.uservalidation = function (username, email) {
            var checkUserCredentialValidation = {
                Username: username,
                Email: email
            }

           
                $http.post('https://rentcar.sergeyprsv.com/api/api/users/checkuserexistance', checkUserCredentialValidation).then(function (response) {
                    $scope.existanceresponse = response.data;
                    console.log("ok" + response.status);
                    var credentialsCheck = $scope.existanceresponse;

                    if (credentialsCheck[0] === "usernameValid" && credentialsCheck[1] === "mailValid") {

                        alert("usernameValid");
                    }

                    if (credentialsCheck[0] === "usernameExist") {
                            alert("usernameExist - error");
                        }

                    if (credentialsCheck[1] === "mailExist") {
                       alert("mailExist - error");
                    } 
  
                },
                function (response) {
                    console.log("error" + response.status);

                });
            //get all users in list
        }

        $scope.clearTable = function () {
            $scope.usrFName = "";
            $scope.usrUname = "";
            $scope.usrBdate = "";
            $scope.usrGen = "Male";
            $scope.usrMail = "";
            $scope.usrPass = "";
            $scope.usrPic = "";
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

        $scope.get = function () {
            var fileVal = document.getElementById("fileUpload");
            var cut = fileVal.value.substring(12, fileVal.length);
            $scope.usrPic = cut;
            alert($scope.usrPic);
        };

        $(function () {
            $scope.usrGen = "Male";
            $("#sel1").val($scope.usrGen);
        });

        $scope.logInEnd = function () {
          
                $window.location = 'https://rentcar.sergeyprsv.com/index.html#';
            

        };

    });

