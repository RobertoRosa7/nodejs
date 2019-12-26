module.exports = function(application){
	application.get('/', function(req, res){
		// funções de callback para responde em html ou json
		res.format({
			html: function(){
				// res.send('Bem vindo a sua app NodeJS!');
				res.render('xfs');
			},
			json: function(){
				// necessário encapsular json em uma variável e enviar com res.json()
				let dados = {
					body: 'Bem vindo a sua app NodeJS!'
				}
				res.json(dados);
			}
		});
	});

	application.post('/', function(req, res){
		let dados = req.body;
		res.send(dados);
	});
}