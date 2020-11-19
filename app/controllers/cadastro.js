module.exports.cadastro = function(application, req, res) {
    res.render('cadastro', { validacao: {}, dadosForm: {} })
}

module.exports.cadastrar = function(application, req, res) {
    let dadosForm = req.body;

    req.assert('nome', "Nome não pode ser vazio").notEmpty()
    req.assert('usuario', "Usuário não pode ser vazio").notEmpty()
    req.assert('senha', "Senha não pode ser vazio").notEmpty()
    req.assert('casa', "Casa não pode ser vazio").notEmpty()

    let errors = req.validationErrors()

    if (errors) {
        res.render('cadastro', { validacao: errors, dadosForm: dadosForm })
        return
    }

    var connection = application.config.dbConnection //pega a function da conexao mas nao executa ela
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection) // Instacia a classe e passa por parametro a function da conexao 

    UsuariosDAO.insertUser(dadosForm)

    res.send('cadastro')
}