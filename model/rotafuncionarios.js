const sql = require('mssql');
const request = require('request');
const config = require('../dao/rotafuncionarios').configSql();

async function getFuncionario(idFuncionario){ 
    let aCmdSql = "";    
    if(idFuncionario != "")
        aCmdSql = ' Where (a.id_funcionario = '+idFuncionario.toString()+')';
    let conn = await sql.connect(config);
    aCmdSql = 'Select \
                    a.nome_funcionario,        \
                    a.data_nascimento,         \
                    a.idade,                   \
                    a.data_atualizacao,        \
                    b.endereco_funcionario,    \
                    b.nome_bairro,             \
                    b.nome_estado              \
                from funcionarios a            \
                Inner join funcionarios_enderecos b \
                    ON a.id_funcionario = b.id_funcionario'+ aCmdSql;
    let result = await conn.request()               
        .query(aCmdSql);                
    await sql.close(conn);   
    return result.recordset;
}

async function insFuncionario(nome, data, idade, enderecos){     
    let conn = await sql.connect(config);
    let result = await conn.request()       
        .input("nome", sql.VarChar(50), nome)
        .input("data", sql.DateTime2, data) 
        .input("idade", sql.INT, idade)       
        .query("INSERT INTO funcionarios (nome_funcionario, data_nascimento, idade) values (@nome, @data, @idade) SELECT SCOPE_IDENTITY() as result");
    var idFuncionario = result.recordset[0].result;
    var keys = Object.keys(enderecos);
    for (var i = 0; i < keys.length; i++) {  
        let endereco = (enderecos[keys[i]].endereco);
        let bairro = (enderecos[keys[i]].bairro);
        let estado = (enderecos[keys[i]].estado);         
        let result = await conn.request()               
            .input("idFuncionario", sql.INT, idFuncionario)
            .input("endereco", sql.VarChar(255), endereco) 
            .input("bairro", sql.VarChar(50), bairro) 
            .input("estado", sql.VarChar(2), estado) 
            .input("pais", sql.VarChar(2), "BR")       
            .query("INSERT INTO funcionarios_enderecos (id_funcionario, endereco_funcionario, nome_bairro, nome_estado, nome_pais) \
                values (@idFuncionario, @endereco, @bairro, @estado, @pais)");        
        
    }
    await sql.close(conn);   
    return result.recordset;
}

async function delFuncionario(idFuncionario){     
    let conn = await sql.connect(config);
    let result = await conn.request()       
        .input("idFuncionario", sql.INT, idFuncionario)
        .query("delete from funcionarios_enderecos where id_funcionario = @idFuncionario; delete from funcionarios where id_funcionario = @idFuncionario")
        await sql.close(conn);   
    return true;
}

async function updateFuncionario(idFuncionario, nome, data, idade, enderecos){   
    var aCmdSql = "UPDATE FUNCIONARIOS SET ";
    if(nome != undefined)
        aCmdSql = aCmdSql + " nome_funcionario = '" + nome.toString() + "'";
    if(data != undefined){
        if(nome != undefined)
            aCmdSql = aCmdSql + " , data_nascimento = '" + data.toString() + "'";
        else    
            aCmdSql = aCmdSql + " data_nascimento = '"+data.toString() + "'";
    }        
    if(idade != undefined){
        if((nome != undefined)||(data != undefined))
            aCmdSql = aCmdSql + ", idade = " + idade.toString();     
        else
            aCmdSql = aCmdSql + " idade = " + idade.toString();        
    }        
    aCmdSql = aCmdSql + ", data_atualizacao = getdate()  Where id_funcionario = " + idFuncionario.toString();
    let conn = await sql.connect(config);  
    let result = await conn.request()
        .query(aCmdSql);
    await sql.close(conn); 
    if(enderecos != undefined){
        var keys = Object.keys(enderecos);
        if(keys[0] == "id_sequencial"){
            for (var i = 0; i < keys.length; i++) { 
                var aCmdSql = "";
                if(keys[i] == "endereco"){
                    aCmdSql = aCmdSql + "UPDATE funcionarios_enderecos SET endereco_funcionario = '" + enderecos[keys[i]].toString() + "' \
                    Where id_sequencial = "+ enderecos[keys[0]] +" and id_funcionario = " + idFuncionario.toString() + "; ";
                }
                if(keys[i] == "bairro"){
                    aCmdSql = aCmdSql + "UPDATE funcionarios_enderecos SET nome_bairro = '"+enderecos[keys[i]].toString() + "' \
                    Where id_sequencial = "+ enderecos[keys[0]] +" and id_funcionario = " + idFuncionario.toString() + "; ";
                }        
                if(keys[i] == "estado"){
                    aCmdSql = aCmdSql + "UPDATE funcionarios_enderecos SET nome_estado = '" + enderecos[keys[i]].toString() + "' \
                    Where id_sequencial = "+enderecos[keys[0]] +" and id_funcionario = " + idFuncionario.toString() + "; ";
                } 
            }        
            console.log(aCmdSql);
            let conn = await sql.connect(config);  
            let result = await conn.request()
                .query(aCmdSql);
            await sql.close(conn); 
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

module.exports.getFuncionario = getFuncionario;
module.exports.insFuncionario = insFuncionario;
module.exports.delFuncionario = delFuncionario;
module.exports.updateFuncionario = updateFuncionario;