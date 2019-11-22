const dataRequest = require('../model/rotafuncionarios');
module.exports.listData = function (req, res, next){    
    async function getData(){          
        const data = await dataRequest.getFuncionario(req.params.id);
        return data;
    }
    getData().then((data) =>{
        let response = data;
        var message = {
            statusCode: '200',
            funcionarios: {
                data: response
            }
        }
        res.send(200, message);
        return next();        
    })
}
module.exports.postDataFuncionarios = function (req, res, next){
    async function insFuncionario(){        
        var nome = req.body.nome;        
        var data = req.body.data_nascimento;
        var idade = req.body.idade;
        var enderecos = req.body.enderecos;  
        var result = await dataRequest.insFuncionario(nome, data, idade, enderecos);
        return result;
    }
    insFuncionario().then((data) =>{
        var nessage = {
            statusCode: '200',
            "message": "OK"
        }
        res.send(nessage);
        return next();
    }); 
}

module.exports.deleteDataFuncionarios = function (req, res, next){
    async function getData(){                  
        const data = await dataRequest.delFuncionario(req.params.id);
        return data;
    }
    console.log(req.params.id);
    if(req.params.id == ""){
        var message = {
            statusCode: '400',
            message: 'Id não informado'
        }
        res.send(200, message);
        return next();        
    } else {
        getData().then((data) =>{
            let response = data;
            var message = {
                statusCode: '200',
                message: 'OK'
            }
            res.send(200, message);
            return next();        
        })
    }
    
}
module.exports.updateDataFuncionarios = function (req, res, next){
    async function getData(){ 
        var nome;
        var data;
        var idade;
        var enderecos;        
        if(req.body.nome != "")                 
            nome = req.body.nome;  
        if(req.body.data_nascimento != "")       
            data = req.body.data_nascimento;
        if(req.body.idade != "") 
            idade = req.body.idade;
        if(req.body.enderecos != "") 
            enderecos = req.body.enderecos;  
        var result = await dataRequest.updateFuncionario(req.params.id,nome, data, idade, enderecos);
        return result;
    }    
    if(req.params.id == ""){
        var message = {
            statusCode: '400',
            message: 'Id não informado'
        }        
        res.send(200, message);
        return next();        
    } else {
        getData().then((data) =>{
            let response = data;
            if(data == true){
                var message = {
                    statusCode: '200',
                    message: 'OK'
                }
            }else{
                var message = {
                    statusCode: '200',
                    message: 'É necessário id_sequencial para atualizar endereços ex: {id_sequencial : 1, bairro : teste}'
                }
            }
            res.send(200, message);
            return next();        
        })
    }
    
}