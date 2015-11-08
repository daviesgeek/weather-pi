angular.module('app', ['btford.socket-io'])
  .factory('db', function(socketFactory){
    return socketFactory()
  })
  .controller('MainCtrl', function($scope, db) {

    db.emit('connection')

    db.on('data', function (data) {
      $scope.data = data
    })

    db.on('newData', function (newData) {
      $scope.data = $scope.data.concat(newData)
    })

    db.on('forecast', function(forecast) {
      $scope.weather = forecast
    })
  })