
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
	.when("/:pokemonid", {
		templateUrl : "templates/pokemon.html",
		controller  : "pokemonController",
		controllerAs  : "pc",

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

pokedapp.adrs.pokeapi = "https://pokeapi.co/api/v2/";

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


	service.get(pokedapp.adrs.pokeapi + 'pokemon/?limit=720', function(answer) {
		self.pokemons = answer.results;

		for (var i = 0 ;i<720; i++){

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

pokedapp.controller("pokemonController",['service','$scope','$routeParams', function(service,$scope,$routeParams) {
	var self = this;
	self.pokemons = [];
	self.pokemon;
	self.evolutions = [];
	self.similares = [];

	service.get(pokedapp.adrs.pokeapi + 'pokemon/'+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;
		//self.evolutions = self.pokemon.evolutions;
		//self.similares = self.pokemon.evolutions;

		self.pokemon.id = $routeParams.pokemonid;

		if(self.pokemon.id<9)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(self.pokemon.id)+".png";
		else if(self.pokemon.id<99)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(self.pokemon.id)+".png";
		else
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (self.pokemon.id)+".png";


/*
		for (var i = 0 ;i<self.evolutions.lenght(); i++){

			self.evolutions[i].id = i+1;

			if(i<9)
			self.evolutions[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(i+1)+".png";
			else if(i<99)
			self.evolutions[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(i+1)+".png";
			else
			self.evolutions[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (i+1)+".png";
		}
		console.log(self.evolutions);

*/




	//console.log(self.similares);
		console.log(self.pokemon);
	});


}]);
