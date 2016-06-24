// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items', ['$firebaseArray', function($firebaseArray) {
  //var itemsRef = new Firebase('https://ionic-fb-demo.firebaseio.com/items');
  var itemsRef = firebase.database().ref();
  var syncObject =  $firebaseArray(itemsRef);
  return syncObject;
}])

.controller('ListCtrl', function($scope, $firebaseObject, $ionicListDelegate, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('What do you need to buy?');
    if (name) {
      $scope.items.$add({
        'name': name
      });
      $scope.items.$save(name.$id);
    }
  };

  $scope.purchaseItem = function(item) {
    //var itemRef = new Firebase('https://ionic-fb-demo.firebaseio.com/items/' + item.$id);
    var itemRef = firebase.database().ref(item.$id);
    //var obj = $firebaseOjbect(itemRef);
    itemRef.child('status').set('done');
    $ionicListDelegate.closeOptionButtons();
  };
});
