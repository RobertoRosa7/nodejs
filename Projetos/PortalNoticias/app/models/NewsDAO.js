function NewsDAO(connection){
    this._conn = connection;
}
NewsDAO.prototype.readNews = function(callback){
    this._conn.query('select * from tb_noticias order by data_criacao desc', callback);
}
NewsDAO.prototype.readNewsLetters = function(id, callback){
    if(id){
        this._conn.query(`select * from tb_noticias where id_noticia = ${id}`, callback);
    }else{
        this._conn.query('select * from tb_noticias order by data_criacao desc', callback);
    }
}
NewsDAO.prototype.createNews = function(notice, callback){
    this._conn.query('insert into tb_noticias set ?',notice, callback);
}

NewsDAO.prototype.lastNews = function(callback){
    this._conn.query('select * from tb_noticias order by data_criacao desc limit 0, 5', callback);
}

module.exports = function(){
    return NewsDAO;
}