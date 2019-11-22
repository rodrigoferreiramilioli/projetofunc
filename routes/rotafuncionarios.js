const data = require('../src/rotafuncionarios');
module.exports  = function(server){    
    server.get(
        '/:id',
        data.listData
    );
    server.post(
        '/',
        data.postDataFuncionarios
    );
    server.del(
        '/:id',
        data.deleteDataFuncionarios
    );
    server.put(
        '/:id',
        data.updateDataFuncionarios
    );
}