angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope, $http) {
    $scope.name = {text:''};
    $scope.password = {text:''};
    $scope.submitbutton = function($window){
                        var postData =  {
            "username": $scope.name.text,
            "password": $scope.password.text
            };
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            var login = $http.post('http://nano.amfnano.com/user_sessions.json',JSON.stringify(postData),config)
            login.success(function (data, status, headers) {
                         
                    window.localStorage['login_token']= data.single_access_token;
                    window.localStorage['location']= data.location_id;
                    window.localStorage['id']= data.user_id;
                    window.localStorage['role']=data.role;
                    window.localStorage['first_name']=data.first_name;
                    window.localStorage['last_name']=data.last_name;
                    window.localStorage['email']=data.email;
                    window.localStorage['farm']=data.farm_id;
                    window.localStorage['username']=data.username;
                    window.localStorage['barn_id']=data.barn_id;
                          if(data.role=="BarnManager")
                          {
                           // alert(JSON.stringify(data));
                          location.href = '#/barnHome/'+data.barn_id;
                          }
                          else
                          {
                          location.href = '#/dashboard';
                          }
                          
                          });
            login.error(function (data, status, headers) {
                     alert("Invalid username or password");
            });
     }

})

.controller('dashCtrl', function($scope, $http,$timeout, $ionicLoading) {
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },3000);
//Farm GET http request
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            var url = 'http://nano.amfnano.com/farms.json?user_credentials='+window.localStorage['login_token'];
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            var farmjson = $http.get(url,config)
            farmjson.success(function (data, status, headers) {
                         $scope.farms = data;
                         var i = 0;
                         angular.forEach(data, function (count) {
                                                          
                                         $scope.getLoactions(data[i].farm_id,data[i].system_status);
                                         i++;
                        });
            });
            farmjson.error(function (data, status, headers) {
                       alert("Invalid Username or Password");
            });
//Sites GET http request
            $scope.getLoactions = function (id,st) {
            var url2 = ' http://nano.amfnano.com/farms/'+id+'/locations.json?user_credentials='+window.localStorage['login_token'];
            
            var sitejson = $http.get(url2,config)
            sitejson.success(function (data, status, headers) {
                             var ele=angular.element(document.getElementById("farmsli"+id));
                             var result;
                             if(st=="OK")
                             {
                                result = "<ul  id='locationsul"+id+"' style='display:none'>";
                             }
                             else
                             {
                                result = "<ul  id='locationsul"+id+"'>";
                             }
                             var j=0;
                             angular.forEach(data, function (count) {
                                             //alert(j+" "+data.length);
                                             if((j+1)==data.length)
                                             {
                                                result += "<li  id='locationsli" + data[j].location_id + "' style='width:100%;float:left;padding:5%;padding-left:40px'><a style='width:100%;float:left' id='" + data[j].location_id+ "' class='locationanch'><img src='img/"+data[j].system_status+"1.png' style='margin-right:20px;float:left;'/>" + data[j].name + "</a></li>";
                                                           
                                             }
                                             else
                                             {
                                                result += "<li  id='locationsli" + data[j].location_id + "' style='width:100%;float:left;border-bottom:1px solid #c3c3c3;padding:5%;padding-left:40px'><a style='width:100%;float:left' id='" + data[j].location_id+ "' class='locationanch'><img src='img/"+data[j].system_status+"1.png' style='margin-right:20px;float:left;'/>" + data[j].name + "</a></li>";
                                             }
                                             $scope.getBarrns(data[j].location_id,data[j].system_status);
                                             j++;
                                });
                                result += "</ul>";
                                           
                                ele.append(result);
                             });
            sitejson.error(function (data, status, headers) {
                           alert("Invalid Username or Password");
                        });
            
            }
            
//Barns GET http request
            $scope.getBarrns = function (id,st) {
            var url3 = 'http://nano.amfnano.com/locations/'+id+'/barns.json?user_credentials='+window.localStorage['login_token'];
            
            var barnjson = $http.get(url3,config)
            barnjson.success(function (data, status, headers) {
                             var ele = angular.element(document.getElementById("locationsli" + id));
                             var result;
                             if(st=="OK")
                             {
                                result = "<ul  id='barnsul" + id + "'  style='display:none'>";
                             }
                             else
                             {
                                result = "<ul  id='barnsul" + id + "' >";
                             }
                                           
                             var j = 0;
                             angular.forEach(data, function (count) {
                                             if((j+1)==data.length)
                                             {
                                                result += "<li style='width:100%;float:left;padding:5%;padding-left:40px'><a style='width:100%;float:left;text-decoration:none;color:black;' href='#/barnHome/"+data[j].barn_id+"'><img src='img/"+data[j].system_status+"1.png' style='margin-right:15px;float:left;'/>" + data[j].name + "</a></li>";
                                             }
                                             else{
                                                result += "<li style='width:100%;float:left;border-bottom:1px solid #c3c3c3;padding:5%;padding-left:40px'><a href='#/barnHome/"+data[j].barn_id+"' style='width:100%;float:left;text-decoration:none;color:black;'><img src='img/"+data[j].system_status+"1.png' style='margin-right:15px;float:left;' />" + data[j].name + "</a></li>";
                                             }
                                             j++;
                                        });
                             result += "</ul>";
                                           
                             ele.append(result);
                             });
            barnjson.error(function (data, status, headers) {
                           alert("Invalid Username or Password");
                    });
            }
            
        })


.controller('barnHomeCtrl', function($scope, $stateParams, $http,$timeout, $ionicLoading) {
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },2000);
            
            //$scope.barn = Farms.get($stateParams.farmId);
            var bid= $stateParams.barn_id;
            $scope.barnid=bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            var urla='http://nano.amfnano.com/barns/'+bid+'/last_reading.json?user_credentials='+window.localStorage["login_token"];
var urlb='http://nano.amfnano.com/barns/'+bid+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
var urlc='http://nano.amfnano.com/barns/'+bid+'/last_event_report.json?user_credentials='+window.localStorage["login_token"];
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var barnbody = "";
            var temp = "";
            var hum = "";
            var feed = "";
            var ac = "";
            var barname = "";
            var reported_at = "";
            var systemstatus = "";
            var databarn={};
            var invdata={};
            var eventsdata={};
            //alert(url);
            var barninfo1 = $http.get(urla,config);
            
            barninfo1.success(function (data, status, headers) {
                              databarn=data;
                              $scope.barname = databarn.barn_name;
                              if(databarn.temperatures.length == 0 || databarn.temperatures == undefined ){
                              $scope.temp = "NA";
                              }
                              else{
                              $scope.temp = databarn.temperatures[0].value;
                              }
                              //alert("1");
                              if(databarn.ir_feeds.length == 0 || databarn.ir_feeds == undefined ){
                              $scope.feed = "";
                              }
                              else{
                              $scope.feed = databarn.ir_feeds[0].status;
                              }
                              //alert("2");
                              if(databarn.humidity == null || databarn.humidity == undefined){
                              $scope.hum = "NA";
                              }
                              else{
                              $scope.hum = databarn.humidity;
                              }
                             // alert("3");
                              if(databarn.AC_power == null || databarn.AC_power == undefined){
                              $scope.ac = "";
                              }
                              else{
                              $scope.ac = databarn.AC_power;
                              }
                              //alert("4");
                              if(databarn.reported_at == null || databarn.reported_at == undefined){
                              $scope.reported_at = "";
                              }
                              else{
                              $scope.reported_at = databarn.reported_at;
                              }
                             // alert("5");
                              if(databarn.system_status == null || databarn.system_status == undefined){
                              $scope.systemstatus = "";
                              }
                              else{
                              $scope.systemstatus = databarn.system_status;
                              }

                              });
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                            $scope.total_inventory=data.total_inventory;
                              $scope.report_date=data.report_date;
              
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                             else
                              {
                              $scope.pig_death=data.pig_deaths[0].count;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments[0].count;;
                              }
                             // $scope.datetemp=data.report_date;
                             // alert($scope.datetemp);

                             // $scope.dt=Date.parse($scope.date);
                                                            });
            var barninfo3 = $http.get(urlc,config);
            barninfo3.success(function (data, status, headers) {
                             // alert(JSON.stringify(data));
                              $scope.eventdescription=data.description;
                              $scope.eventreported_at=data.reported_at;
                              //alert($scope.barn_events);
                              });
            
            

            })

.controller('inventoryCtrl', function($scope, $stateParams, $http,$filter) {
            
            // Setup the loader
           /* $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },2000);*/
            
            $scope.pignoshipment = {text:''};
            $scope.supplier = {text:''};
            $scope.pignodeath = {text:''};
            $scope.pigntreated = {text:''};

            $scope.date = $filter("date")(Date.now(), 'MMM dd,yyyy');
            var bid= $stateParams.barn_id;
           
            $scope.barn_id=bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            
            var urlb='http://nano.amfnano.com/barns/'+bid+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                              //alert(data.reported_date);
                              //alert(JSON.stringify(data));
                              $scope.reported_at=data.report_date;
                              $scope.Intials=data.user_initials;
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths[0].count;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments[0].count;;
                              }

                              });
            
            $scope.submitShipment=function(){
          
            var bookData = {
            "barn_id": bid,
            "shipment_date": $scope.date,
            "total_pigs": $scope.pignoshipment.text,
            "total_doa":"",
            "pig_supplier":$scope.supplier.text
            
            };
            var shipmenturl= 'http://nano.amfnano.com/shipments.json?user_credentials='+window.localStorage["login_token"];
            var shipment= $http.post(shipmenturl,JSON.stringify(bookData),config);
            shipment.success(function (data, status, headers) {
                             location.href="#/barnHome"+bid;
                             });
            
            
            }
            $scope.pigdeathsonchange=function()
            {
            
            var ele = angular.element(document.getElementById("deathPigDiv"));
            var result='';
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            result+='<label class="item item-input item-select">';
            result+='<div class="input-label">Pig '+(i+1)+'</div><select>';
            
            result+='<options elected>Belly Rupture</option>';
            result+='<option >Scrotal Rupture</option>';
            result+='<option>Lame/BadLeg</option>';
            result+='<option>Humpback</option>';
            result+='<option>Strep</option>';
            result+='<option>Greasy pig</option>';
            result+='<option>Tail Bite</option>';
            result+='<option>Prolapse</option>';
            result+='<option>Abcess</option>';
            result+='<option>Hematoma Ear</option>';
            result+='<option>Euthanized</option>';
             result+='<option>Dead On Arrival</option>';
            result+='<option>Dead within 24 hrs.</option>';
            result+='</select>';
            result+='</label>';
            }
          
            ele.html(result);
            }
            $scope.pigtreatedonchange=function()
            {
            
            var ele = angular.element(document.getElementById("treatPigDiv"));
            var result='';
            for (var i=0; i<$scope.pigntreated.text; i++)
            {
            result+='<label class="item">';
            result+='<div class="input-label">Pig '+(i+1)+'</div>';
            result+='<input type="text" placeholder="Name of Medicine" />';
            result+='<input type="text" placeholder="Dosage" />';
            result+='<input type="text" placeholder="Route of Adminstration" />';
            result+='</label>';
            }
            
            ele.html(result);
            }

            })