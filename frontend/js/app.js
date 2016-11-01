
// create the module and name it pokedapp

var pokedapp = angular.module("pokedapp", ["ngRoute","ngCookies"]);


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
		controllerAs  : "pc",

	})
	.when("/login", {
		templateUrl : "templates/login.html",
		controller  : "loginController",
		controllerAs  : "lc",
	})
	.when("/logoff", {
		templateUrl : "templates/logoff.html",
		controller  : "loginController",
		controllerAs  : "lc",
	})
	.when("/newpokemon", {
		templateUrl : "templates/newpokemon.html",
		controller  : "newpokemonController",
		controllerAs  : "npc",
	})
	.when("/deletepokemon/:pokemonid/", {
		templateUrl : "templates/deletepokemon.html",
		controller  : "deletepokemonController",
		controllerAs  : "dpc",
	})
	.when("/editpokemon/:pokemonid/", {
		templateUrl : "templates/newpokemon.html",
		controller  : "editpokemonController",
	})
	.when("/master-link", {
		templateUrl : "templates/mastemplate.html",
	})

	.otherwise(
		{
			redirectTo: "/"
		}
	);
});

/**
* Variaveis globais de endereçamento e credenciais
*/
pokedapp.credentials = [{}];

pokedapp.credentials [0] = {
	username : "a",
	password : "a"
}

pokedapp.adrs = {};

pokedapp.adrs.pokeapi = "https://pokeapi.co/api/v2/";
pokedapp.adrs.hostadrs = "";


/**
* Serviço para manipulação dos objetos do serviço
*/
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

pokedapp.controller("pokemonController",['service','$scope','$location','$routeParams','$cookieStore', function(service,$scope,$location,$routeParams,$cookieStore) {
	var self = this;
	self.pokemons = [];
	self.pokemon;
	$scope.logged =  $cookieStore.get('logged');
	self.evolutions = [];
	self.similares = [];

	service.get(pokedapp.adrs.pokeapi + 'pokemon/'+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;
		//self.evolutions = self.pokemon.evolutions;
		//self.similares = self.pokemon.evolutions;

		self.pokemon.id = $routeParams.pokemonid;

		if(self.pokemon.id<=9)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(self.pokemon.id)+".png";
		else if(self.pokemon.id<=99)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(self.pokemon.id)+".png";
		else
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (self.pokemon.id)+".png";

		self.pokemon.weight /= 10;
		self.pokemon.height /= 10;
		self.pokemon.types.reverse();

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
$scope.edit = function(id){
	$location.path('/editpokemon/'+id+'/');

	console.log("EDITOU");
}

$scope.delete = function(id){
	$location.path('/deletepokemon/'+id+'/');
	console.log("DELETOU");
}



}]);

pokedapp.controller("menuController",['service','$scope','$location','$cookieStore', function(service,$scope,$location,$cookieStore) {
	var self = this;

	pokedapp.menu = function(){
		if( $cookieStore.get('logged') == true){
			self.links = [{}];

			self.links [0] = {
				name : "New pokemon",
				adrs : "newpokemon",
				icon : "fa fa-plus-circle"
			}
			self.links [1] = {
				name : "Aditional",
				adrs : "master-link",
				icon : "fa fa-smile-o"
			}
			self.links [2] = {
				name : "logoff",
				adrs : "logoff",
				icon : "fa fa-wheelchair-alt"
			}
		}
		else {
			self.links = [{}];
			self.links [0] = {
				name : "LOGIN",
				adrs : "login",
				icon : "fa fa-unlock"
			}
		}
	}
	pokedapp.menu();

}]);

pokedapp.controller("loginController",['service','$scope','$location','$cookieStore', function(service,$scope,$location,$cookieStore) {
	var self = this;

	$scope.logar = function (log){
		for (var i = 0; i < pokedapp.credentials.length; i++) {

			if (log.username == pokedapp.credentials[i].username){
				if (log.password == pokedapp.credentials[i].password){
					$cookieStore.put('logged',true);
					pokedapp.menu();
					alert("logado com sucesso");
					$location.path('/');
				}
				else {
					alert("SENHA ERRADA");
				}
			}
			else {
				alert("USUARIO NÃO CADASTRADO");
			}
		}
	}
	$scope.logoff = function (){
		$cookieStore.put('logged',false);
		pokedapp.menu();
		alert("deslogado com sucesso");
		$location.path('/');
	}

}]);



pokedapp.controller("newpokemonController",['service','$location','$scope', function(service,$location,$scope) {
	var self = this;
	self.pokemons = [];
	self.pokemon = {};

	pokedapp.pokemon = function() {
		service.post(pokedapp.adrs.hostadrs + 'adicionapk', $scope.pokemon, function(answer) {
			if (answer.id !== null) {
				alert("Cadastrado com sucesso");
				$location.path('/');
			}
		});
	}

}]);
pokedapp.controller("editpokemonController",['service','$location','$scope','$routeParams', function(service,$location,$scope,$routeParams) {
	var self = this;
	self.pokemons = [];

	service.get(pokedapp.adrs.pokeapi + 'pokemon/'+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;

		self.pokemon.id = $routeParams.pokemonid;

		if(self.pokemon.id<=9)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(self.pokemon.id)+".png";
		else if(self.pokemon.id<=99)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(self.pokemon.id)+".png";
		else
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (self.pokemon.id)+".png";

		console.log(self.pokemon);
		$scope.pokemon = self.pokemon;
	});

}]);
pokedapp.controller("deletepokemonController",['service','$location','$scope','$routeParams', function(service,$location,$scope,$routeParams) {
	var self = this;
	self.pokemons = [];

	service.get(pokedapp.adrs.pokeapi + 'pokemon/'+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;

		self.pokemon.id = $routeParams.pokemonid;

		if(self.pokemon.id<=9)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(self.pokemon.id)+".png";
		else if(self.pokemon.id<=99)
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(self.pokemon.id)+".png";
		else
		self.pokemon.sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (self.pokemon.id)+".png";

		console.log(self.pokemon);
	});



	$scope.burn = function() {

		service.delete(pokedapp.adrs.hostadrs + '/' + self.pokemon.id,function(answer){
			if (answer.id !== null) {
				alert(self.pokemon.name + " deletado com sucesso");
				$location.path('/');
			}
		});
	}

}]);
