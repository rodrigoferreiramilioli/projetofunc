
/*
ALGUNS DADOS ESTÃO DISPONÍVEIS NA DOCUMENTAÇÃO DO SWAGGER.
FIZ SEM ORM.
MUDAR DAO > rotafuncionarios.js para o seu banco de dados.
Iniciar o projeto com node index e acessar na porta 3000
Será necessário consumir put ou post de um aplicativo de envios exemplo postman
Prints dos dados e funcionamento soltos na pasta

Create Table funcionarios (
    id_funcionario INT NOT NULL IDENTITY(1,1),
	nome_funcionario varchar(255) NOT NULL,
	data_nascimento datetime NOT NULL,
	idade INT,
	data_geracao datetime,
	data_atualizacao datetime,
	user_atualizacao INT
CONSTRAINT [PK_FUNCIONARIOS_ID] PRIMARY KEY CLUSTERED 
(
	id_funcionario ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
ALTER TABLE funcionarios ADD  CONSTRAINT [DF_FUNCIONARIOS_DATA_GER]  DEFAULT GETDATE() FOR data_geracao
ALTER TABLE funcionarios ADD  CONSTRAINT [DF_FUNCIONARIOS_DATA_ATUALIZACAO]  DEFAULT GETDATE() FOR data_atualizacao

Create table funcionarios_enderecos (
	id_sequencial INT NOT NULL IDENTITY(1,1),
	id_funcionario INT NOT NULL,
	endereco_funcionario varchar(255) NOT NULL,
	nome_bairro varchar(50) NOT NULL,
	nome_estado varchar(2) NOT NULL,
	nome_pais varchar(2) NOT NULL
CONSTRAINT [PK_FUNCIONARIOS_ENDERECOS] PRIMARY KEY CLUSTERED 
(
	id_sequencial ASC,
	id_funcionario ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

INSERT INTO funcionarios values ('Rodrigo Milioli','05/01/1993',26,getdate(),'',2)
INSERT INTO funcionarios values ('Rodrigo Ferreira','05/01/1993',26,getdate(),'',2)
INSERT INTO funcionarios_enderecos values (1,'Rua tal em tal lugar','Acaasda','MG','BR')
INSERT INTO funcionarios_enderecos values (2,'Rua xxx em xxxxx lugar','XXXXX','MG','BR')

*/
/*
exemplos de chamada
POST
localhost:3000/
Enviar no <body>
{
	"nome": "AAAA",
	"data_nascimento": "05/01/1992",
	"idade" : 14,
	"enderecos" : 
	[	{
			"endereco":"casa",			
			"bairro":"xaaaaa",
			"estado":"MG"
		},
	 {
			"endereco":"XXA",			
			"bairro":"AAA",
			"estado":"MG"
		}
	]
}

PUT
localhost:3000/:id
{
	"nome": "XITOSxx",
	"data_nascimento": "05/01/1992",
	"idade" : 14,
	"enderecos" : 
		{
			"id_sequencial":3,
			"bairro":"xaaaaa"
		}	
}

GET
localhost:3000/:id
ID especifico
localhost:3000/
Todos


*/