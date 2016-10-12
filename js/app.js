
// create the module and name it pokedapp
var pokedapp = angular.module("pokedapp", ["ngRoute"]);

// configure our routes
pokedapp.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "templates/home.html",
		controller  : "mainController",
	})

	// route for the  page
	.when("/pokemon/:pokemonid", {
		templateUrl : "templates/pokemon.html",
		controller  : "pokemonController",
	})
	.otherwise(
		{
			redirectTo: "/"
		}
	);
});
/**
 * Serviço para manipulação dos objetos do serviço
 */

 var adrs = {};
 adrs.pokeapi = "http://pokeapi.co/api/v2/";

app.factory('Service', function($http) {
  var service = {};

  /**
   *  Função para tratar GET no serviço
   */
  service.get = function(url, callback) {
    $http.get(url).then(function(response) {
      var answer = response.data;
      callback(answer);
    });
  };


  /**
   *  Função para tratar POST no serviço
   */
  service.post = function(url, data, callback) {
    $http.post(url, data).then(function(response) {
      var answer = response.data;
      callback(answer);
    });
  };
  /**
   *  Função para tratar POST no serviço
   */
  service.delete = function(url, data, callback) {
    $http.delete(url).then(function(response) {
      var answer = response.data;
    });
  };

  return service;
});




// create the controller and inject Angular"s $scope
pokedapp.controller("mainController", function($scope) {
var self = this;
self.pokemons = [];


	service.get(hostAddress + 'pokemon', function(answer) {
		self.pokemon = answer;
	});

});

pokedapp.controller("pokemonController", function($scope) {

});
