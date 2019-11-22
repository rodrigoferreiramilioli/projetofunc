/**
 * @swagger
 *
 * /{route}:
 *   post:
 *     summary: Request call funcionarios
 *     description: Envio/Atualização e remoção
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nome
 *         type: string
 *         in: body
 *         required: true
 *         example: {"nome" : "Nome do funcionário"}
 *       - name: data_nascimento
 *         type: date
 *         in: body
 *         required: true
 *         example: {"data_nascimento" : "05/11/2019"}
 *       - name: idade
 *         type: int
 *         in: body
 *         required: true
 *         example: {"idade" : 11}
 *       - name: enderecos
 *         type: object
 *         in: body
 *         schema:
 *           type: object
 *           required:
 *             - endereco
 *             - bairro
 *             - estado
 *           properties:
 *             enderecos:
 *               description: Send the parameters in json pattern
 *               type: object
 *               example: {"endereco": "endereço","bairro": "nome do bairro","estado": "nome do estado"}
 *     responses:
 *       200:
 *         description: OK
 *       OK:
 *         schema:
 *           type: object
 *           required:
 *             - statusCode
 *             - message
 *           properties:
 *             message:               
 *               type: object
 *               description: The error message
 *               example: "OK" 
 */