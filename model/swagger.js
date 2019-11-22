var restifySwaggerJsdoc = require('restify-swagger-jsdoc');
module.exports.swagger =  function(server){
    restifySwaggerJsdoc.createSwaggerPage({
        title: 'Funcionarios', 
        version: '1.0.0',
        server: server,
        path: "/docs",
        apis: ['./docs/*']
    });
}