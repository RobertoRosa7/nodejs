module.exports = function(application){
	application.get('/jogos', (req,res)=>{
		application.app.controllers.jogos.jogos(application, req, res);
	});

	application.get('/sair', (req, res)=>{
		application.app.controllers.jogos.sair(application, req, res);
	});

	application.get('/suditos', (req, res)=>{
		application.app.controllers.jogos.suditos(application, req, res);
	});

	application.get('/pergaminhos', (req, res)=>{
		application.app.controllers.jogos.pergaminhos(application, req, res);
	});

	application.post('/ordenar-acao-sudito',(req, res)=>{
		application.app.controllers.jogos.ordenarAcaoSudito(application, req, res);
	});

	application.get('/revogar-acao', (req, res)=>{
		application.app.controllers.jogos.revogarAcao(application, req, res);
	});
}