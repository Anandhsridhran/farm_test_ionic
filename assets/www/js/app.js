// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngAnimate', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('login', {
               url: '/login',
               templateUrl: 'views/login.html',
               controller: 'loginCtrl'
               })
        .state('dashboard', {
               url: '/dashboard',
               templateUrl: 'views/dashboard.html',
               controller: 'dashCtrl'
               })
        .state('barnHome', {
               url: '/barnHome/:barn_id',
               templateUrl: 'views/barnHome.html',
               controller: 'barnHomeCtrl'
               })
        .state('inventory', {
               url: '/inventory/:barn_id',
               templateUrl: 'views/inventory.html',
               controller: 'inventoryCtrl'
               })
        .state('inventory2', {
               url: '/inventory2/:barn_id',
               templateUrl: 'views/inventory2.html',
               controller: 'inventoryCtrl'
               })
        
        .state('inventory3', {
               url: '/inventory3/:barn_id',
               templateUrl: 'views/inventory3.html',
               controller: 'inventoryCtrl'
               })
        .state('inventory4', {
               url: '/inventory4/:barn_id',
               templateUrl: 'views/inventory4.html',
               controller: 'inventoryCtrl'
               })
        .state('inventory5', {
               url: '/inventory5/:barn_id',
               templateUrl: 'views/inventory5.html',
               controller: 'inventoryCtrl'
               })
        .state('inventory6', {
               url: '/inventory6/:barn_id',
               templateUrl: 'views/inventory6.html',
               controller: 'inventoryCtrl'
               })
        .state('review', {
               url: '/review/:barn_id',
               templateUrl: 'views/review.html',
               controller: 'inventoryCtrl'
               });
        
    
    $urlRouterProvider.otherwise('login');
});
