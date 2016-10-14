
// create the module and name it pokedapp
var pokedapp = angular.module("pokedapp", ["ngRoute"]);

// configure our routes
pokedapp.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "templates/home.html",
		controller  : "mainController",
		controllerAs  : "mc",
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

pokedapp.adrs = {};

pokedapp.adrs.pokeapi = "http://pokeapi.co/api/v2/";

pokedapp.factory('service', function($http) {
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
pokedapp.controller("mainController",['service','$scope', function(service,$scope) {
	var self = this;
	self.pokemons = [];


	service.get(pokedapp.adrs.pokeapi + 'pokemon/?limit=811', function(answer) {
		self.pokemons = answer.results;

		for (var i = 0 ;i<769; i++){

			self.pokemons[i].id = i+1;

			if(i<9)
			self.pokemons[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(i+1)+".png";
			else if(i<99)
			self.pokemons[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(i+1)+".png";
			else
			self.pokemons[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (i+1)+".png";
		}
		console.log(self.pokemons);
	});

}]);

pokedapp.controller("pokemonController", function($scope) {

});
