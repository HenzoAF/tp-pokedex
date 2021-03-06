
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
pokedapp.adrs.hostadrs = "localhost:8080";
pokedapp.routes = {};
//pokedapp.routes.getall = pokedapp.adrs.pokeapi + 'pokemon/?limit=720';
pokedapp.routes.getall = 'mvc?logica=getpokemonall';
//pokedapp.routes.getbyid = pokedapp.adrs.pokeapi + 'pokemon/';
pokedapp.routes.getbyid = 'mvc?logica=getpokemonbyid&id=';
pokedapp.routes.getpokemonprev = 'mvc?logica=getpokemonprev&id=';
pokedapp.routes.getbytipo = 'mvc?logica=getbytipo&tipo=';


pokedapp.routes.delete = 'mvc?logica=deletepokemon';
pokedapp.routes.add = 'mvc?logica=addpokemon';
pokedapp.routes.update = 'mvc?logica=updatepokemon';






/**
* Serviço para manipulação dos objetos do serviço
*/
pokedapp.factory('service', function($http,$cookieStore) {
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
	service.islogged = function(){
		console.log("YAYYY");
		return $cookieStore.get('logged') == true;
	}

	return service;
});


// create the controller and inject Angular"s $scope
pokedapp.controller("mainController",['service','$scope', function(service,$scope) {
	var self = this;
	self.pokemons = [];


	service.get(pokedapp.routes.getall, function(answer) {


		self.pokemons = answer;
		/*
		for (var i = 0 ;i<720; i++){

		self.pokemons[i].id = i+1;

		if(i<9)
		self.pokemons[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "00"+(i+1)+".png";
		else if(i<99)
		self.pokemons[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + "0"+(i+1)+".png";
		else
		self.pokemons[i].sprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (i+1)+".png";
	}
	*/

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

	service.get(pokedapp.routes.getbyid+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;
		console.log(answer);
		self.pokemon.weight /= 10;
		self.pokemon.height /= 10;

		if(answer.prevolucao !== 0 || answer.prevolucao === null){
			self.getback(answer);
		}
		else {
			self.evolutions.push(answer);
		self.getforward(answer);
		}

		service.get(pokedapp.routes.getbytipo+answer.primary_type+"&tipo2="+answer.secondary_type,function(answer){
			self.similares = self.similares.concat(answer);
			console.log(self.similares);
		});


	});

	self.getback = function(pokemon){
		service.get(pokedapp.routes.getbyid+pokemon.prevolucao,function(answer){
			if(answer.prevolucao === 0){
				//self.evolutions.push(answer);
				console.log("ALL BACK");
				console.log(answer);
				self.evolutions.push(answer);
				self.getforward(answer);
			}
			else {
				console.log(answer);
				//self.evolutions.push(answer);
				console.log("GETTING BACK");
				self.getback(answer);
			}
		});
	}



	self.getforward = function(pokemon){
		service.get(pokedapp.routes.getpokemonprev+pokemon.id_pokemon,function(answer){
			if(answer.id !== null){
				console.log(answer);

				for (var i = 0; i < answer.length; i++) {
					self.getforward(answer[i]);
				}
				self.evolutions = self.evolutions.concat(answer);

			}
		});





	}





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

	if (!service.islogged()){
		$location.path('/');
	}

	$scope.add = function() {
		service.post(pokedapp.routes.add , $scope.pokemon, function(answer) {
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

	if (!service.islogged()){
		$location.path('/');
	}

	service.get(pokedapp.routes.getbyid+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;

		$scope.pokemon = self.pokemon;
	});

	$scope.add = function() {
		service.post(pokedapp.routes.update, $scope.pokemon, function(answer) {
			if (answer.id !== null) {
				alert("Cadastrado com sucesso");
				$location.path('/');
			}
		});
	}



}]);
pokedapp.controller("deletepokemonController",['service','$location','$scope','$routeParams', function(service,$location,$scope,$routeParams) {
	var self = this;
	self.pokemons = [];

	if (!service.islogged()){
		$location.path('/');
	}

	service.get(pokedapp.routes.getbyid+$routeParams.pokemonid, function(answer) {
		self.pokemon = answer;

		$scope.pokemon = self.pokemon;
	});

	$scope.burn = function() {
		console.log(self.pokemon);
		console.log("FOI");
		service.post(pokedapp.routes.delete , self.pokemon,function(answer){
			if (answer.id !== null) {
				alert(self.pokemon.nome + " deletado com sucesso");
				$location.path('/');
			}
		});

	}

}]);
