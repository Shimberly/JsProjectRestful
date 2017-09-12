var http     = require('http'),
	express  = require('express'),
	pg    = require('pg'),
 util = require('util'),
	parser   = require('body-parser');

pg.defaults.ssl = true;
var conString = "postgres://postgres:postgres@localhost:5432/JSPROJECT";
//Database connection


var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        	console.log("bien");
        });
        


var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);


//GET API
app.get("/usuarios", function(req,res){
	 client.query('SELECT * FROM usuario ORDER BY idusuario', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response[0].data.rows));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});


app.get("/cuentos", function(req,res){
	 client.query('SELECT * FROM cuento ORDER BY idcuento', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response[0].data.rows));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

app.get("/preguntas", function(req,res){
	 client.query('SELECT * FROM pregunta ORDER BY idcuento', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response[0].data.rows));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

app.get("/paginas", function(req,res){
	 client.query('SELECT * FROM pagina ORDER BY idcuento', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response[0].data.rows));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});




//GET by id 
app.get('/usuario/:id', function (req,res) {
	var id = req.params.id;
	console.log(id);
	client.query('SELECT * from usuario where idusuario ='+ id + ';', function(err, rows, fields) {
  		if (!err){
  			var response = [];
 
			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}
			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response[0].data.rows));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});




//POST API			
 app.post('/usuario/add/', function(req , res){     
     var id = null, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.usuario !== 'undefined' && 
		typeof req.body.pass !== 'undefined' && 
		typeof req.body.nombre !== 'undefined'

	) {
		var  nombre = req.body.nombre, usuario = req.body.usuario, pass = req.body.pass;
		//console.log(id+' '+nombre+' '+usuario+' '+pass);


		client.query("INSERT INTO usuario (usuario, pass, nombre) VALUES ('"+usuario+"','"+pass+"','"+nombre+"');", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

app.post('/cuento/add/', function(req , res){     
     var id = null, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.descripcion !== 'undefined' && 
		typeof req.body.creditos !== 'undefined' && 
		typeof req.body.idusuario !== 'undefined' && 
		typeof req.body.nombre !== 'undefined'

	) {
		var  nombre = req.body.nombre, descripcion = req.body.descripcion, idusuario = req.body.idusuario,creditos = req.body.creditos;
		//console.log(id+' '+nombre+' '+usuario+' '+pass);


		client.query("INSERT INTO cuento (nombre, descripcion, creditos, idusuario) VALUES ('"+nombre+"','"+descripcion+"','"+creditos+"','"+idusuario+"');", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

app.post('/pagina/add/', function(req , res){     
     var id = null, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.imagen !== 'undefined' && 
		typeof req.body.audio !== 'undefined' && 
		typeof req.body.idcuento !== 'undefined'
	) {
		var  imagen = req.body.imagen, audio = req.body.audio, idcuento = req.body.idcuento;
		//console.log(id+' '+nombre+' '+usuario+' '+pass);


		client.query("INSERT INTO pagina (imagen, audio, idcuento) VALUES ('"+imagen+"','"+audio+"','"+idcuento+"');", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

app.post('/pregunta/add/', function(req , res){     
     var id = null, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.img1 !== 'undefined' && 
		typeof req.body.img2 !== 'undefined' && 
		typeof req.body.audio !== 'undefined' && 
		typeof req.body.respuesta !== 'undefined' && 
		typeof req.body.idcuento !== 'undefined'
	) {
		var  img1 = req.body.img1, img2 = req.body.img2, audio = req.body.audio,respuesta = req.body.respuesta,idcuento = req.body.idcuento;
		//console.log(id+' '+nombre+' '+usuario+' '+pass);


		client.query("INSERT INTO pregunta (img1, img2, audio, respuesta,idcuento) VALUES ('"+img1+"','"+img2+"','"+audio+"','"+respuesta+"','"+idcuento+"');", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

//PUT API
app.put('/usuario/edit/:id', function (req,res) {
	var id = req.params.id, response = [];

	if (
		typeof req.body.usuario !== 'undefined' && 
		typeof req.body.pass !== 'undefined' && 
		typeof req.body.nombre !== 'undefined'

	) {
		var usuario = req.body.usuario, pass = req.body.pass, nombre = req.body.nombre;

		client.query("UPDATE usuario SET usuario = '"+usuario+"', pass = '"+pass+"', nombre = '"+nombre+"' WHERE idusuario = "+id+";",function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
 			            console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

app.put('/cuento/edit/:id', function(req , res){     
     var id = req.params.id, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.descripcion !== 'undefined' && 
		typeof req.body.creditos !== 'undefined' && 
		typeof req.body.idusuario !== 'undefined' && 
		typeof req.body.nombre !== 'undefined'

	) {
		var  nombre = req.body.nombre, descripcion = req.body.descripcion, idusuario = req.body.idusuario,creditos = req.body.creditos;
		//console.log(id+' '+nombre+' '+descripcion+' '+idusuario+ ' '+creditos);


		client.query("UPDATE cuento SET nombre = '"+nombre+"', descripcion = '"+descripcion+"', idusuario = '"+idusuario+"', creditos = '"+creditos+"' WHERE idcuento = "+id+";", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

app.put('/pagina/edit/:id', function(req , res){     
     var id = req.params.id, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.imagen !== 'undefined' && 
		typeof req.body.audio !== 'undefined' && 
		typeof req.body.idcuento !== 'undefined'
	) {
		var  imagen = req.body.imagen, audio = req.body.audio, idcuento = req.body.idcuento;
		//console.log(id+' '+nombre+' '+usuario+' '+pass);


		client.query("UPDATE pagina SET imagen = '"+imagen+"', audio = '"+audio+"', idcuento = '"+idcuento+"' WHERE idpagina = "+id+";", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

app.put('/pregunta/edit/:id', function(req , res){     
     var id = req.params.id, response = [];  
		//console.log("miau "+util.inspect(req,false,null)); 
	if (
		typeof req.body.img1 !== 'undefined' && 
		typeof req.body.img2 !== 'undefined' && 
		typeof req.body.audio !== 'undefined' && 
		typeof req.body.respuesta !== 'undefined' && 
		typeof req.body.idcuento !== 'undefined'
	) {
		var  img1 = req.body.img1, img2 = req.body.img2, audio = req.body.audio,respuesta = req.body.respuesta,idcuento = req.body.idcuento;
		//console.log(id+' '+nombre+' '+usuario+' '+pass);


		client.query("UPDATE pregunta SET img1 = '"+img1+"', img2 = '"+img2+"', audio = '"+audio+"', respuesta = '"+respuesta+"', idcuento = '"+idcuento+"' WHERE idpregunta = "+id+";", 
			function(err, result) {
		  		if (!err){
 
					if (result.affectedRows != 0) {
						response.push({'result' : 'Se ha realizado con exito'});
					} else {
						response.push({'msg' : 'Resultado no encontrado'});
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				console.error('error running query', err);
				    res.status(400).send(err);
			  	}
			});
 
	} else {
		response.push({'result' : 'error', 'msg' : 'Por favor rellena todos los campos'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
		//console.log(id+' '+nombre+' '+usuario+' '+pass);
	}
});

// DELETE API
app.delete('/usuario/delete/:id', function (req,res) {
	var id = req.params.id;

	client.query('DELETE FROM usuario WHERE idusuario =' +id+ ';', function(err, result) {
  		if (!err){
  			var response = [];

			if (result.affectedRows != 0) {
				response.push({'result' : 'Se ha realizado con exito'});
			} else {
				response.push({'msg' : 'Resultado no encontrado'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    console.error('error running query', err);
		    res.status(400).send(err);
	  	}
	});
});

app.delete('/pagina/delete/:id', function (req,res) {
	var id = req.params.id;

	client.query('DELETE FROM pagina WHERE idpagina =' +id+ ';', function(err, result) {
  		if (!err){
  			var response = [];

			if (result.affectedRows != 0) {
				response.push({'result' : 'Se ha realizado con exito'});
			} else {
				response.push({'msg' : 'Resultado no encontrado'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

app.delete('/pregunta/delete/:id', function (req,res) {
	var id = req.params.id;

	client.query('DELETE FROM pregunta WHERE idpregunta =' +id+ ';', function(err, result) {
  		if (!err){
  			var response = [];

			if (result.affectedRows != 0) {
				response.push({'result' : 'Se ha realizado con exito'});
			} else {
				response.push({'msg' : 'Resultado no encontrado'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

app.delete('/cuento/delete/:id', function (req,res) {
	var id = req.params.id;

	client.query('DELETE FROM cuento WHERE idcuento =' +id+ ';', function(err, result) {
  		if (!err){
  			var response = [];

			if (result.affectedRows != 0) {
				response.push({'result' : 'Se ha realizado con exito'});
			} else {
				response.push({'msg' : 'Resultado no encontrado'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});



http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
