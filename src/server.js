const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const equipamentos = [];

app.get('/', (req, res) => {
    res.status(200).send('Arsenal Real API está online.');
});

app.get('/equipamentos', (req, res) => {
    res.status(200).json({
        mensagem: 'Lista de equipamentos registrados:',
        equipamentos: equipamentos
    });
});

app.get('/equipamentos/:id', (req, res) => {
    const id = req.params.id;
    const equipamentoEncontrado = equipamentos.find((equipamento) => equipamento.id === Number(id));

    if (!equipamentoEncontrado) {
        res.status(404).send({
            mensagem: 'Equipamento não encontrado.'
        });
        return;
    } else {
       res.status(200).send(equipamentoEncontrado); 
    }
});

app.post('/equipamentos', (req, res) => {
    const dadosEquipamento = req.body;
    const id = equipamentos.length + 1;
    const novoEquipamento = { id, ...dadosEquipamento };
    equipamentos.push(novoEquipamento);
    res.status(201).json(novoEquipamento);
});

app.listen(PORT, () => {
    console.log(`Arsenal Real API está rodando na porta ${PORT}.`);
});