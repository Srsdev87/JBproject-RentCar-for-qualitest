var logInModule = angular.module("signInModule", []);



logInModule.controller("signInController",
    function($scope, $http,$window) {

        $scope.Submit = function(uname, pass) {
            var userCredentials = {
                Username: uname,
                Password: pass
            };

            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/login', userCredentials).then(function(response) {
                    $scope.ValidUser = response.data;
                    console.log(status);

                   if ($scope.ValidUser !== "error") {

                       $scope.setCookie("UserNameToken", $scope.ValidUser, Date.now());

                       if (document.getElementById("rememberbox").checked === true) {

                           $scope.rememberMefunc(uname, pass);
                       }


                     $('#successModal').modal('show');

                     $scope.msgHeader = "Welcome!";
                     $scope.msgBody = "Welcome " + $scope.UserName;

                     $scope.UserName = "";
                     $scope.Password = "";
                    } else {
                        $('#successModal').modal('show');

                        $scope.msgHeader = "Error";
                        $scope.msgBody = "Username or Password incorrect";
                    }

                },
                function(status) {
                    console.log(status);

                });
        };

        $scope.rememberMefunc = function (uname, pass) {

            var userRememberme = {
                Username: uname,
                Password: pass
            };

            $http.post('https://rentcar.sergeyprsv.com/api/api/signin/login', userRememberme).then(function (response) {
                $scope.UserCredential = response.data;
                console.log(status);

                if ($scope.UserCredential !== "error") {

                    localStorage.setItem("memoryToken", $scope.UserCredential);
                }

            },
                function (status) {
                    console.log(status);

                });
        }

        $scope.logInEnd = function() {
            if ($scope.msgHeader !== "Error") {
                $window.location = 'https://rentcar.sergeyprsv.com/index.html#';
            }

        };

        $scope.setCookie = function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + ":" + expires + ";path=/";
        };

        $scope.checkStorage = function () {

            var userCredentials = localStorage.getItem("memoryToken");;

            var encryptedToken1 = {
                TokenReminderString: userCredentials
            };
            if (userCredentials !== null) {
                $http.post('https://rentcar.sergeyprsv.com/api/api/signin/UsersRememberMeValidation', encryptedToken1)
                    .then(function (response) {
                        $scope.decryptedUserToken = response.data;

                        var decuserToken = $scope.decryptedUserToken;

                        if (decuserToken !== "") { 
                            $scope.UserName = decuserToken[0].toString();
                            $scope.Password = decuserToken[1].toString();
                        }
                    });
            }
        };

        $scope.getCookies = function (cname) {
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

    });


