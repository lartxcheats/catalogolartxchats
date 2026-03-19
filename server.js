const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend Lartxcheats funcionando!',
        status: 'online'
    });
});

// Rota para criar pagamento PIX
app.post('/api/criar-pix', async (req, res) => {
    try {
        const { produto, plano, valor, email } = req.body;

        // Validação
        if (!produto || !plano || !valor || !email) {
            return res.status(400).json({ 
                error: 'Dados incompletos. Envie: produto, plano, valor e email' 
            });
        }

        // Criar pagamento no Mercado Pago
        const payment = await mercadopago.payment.create({
            transaction_amount: parseFloat(valor),
            description: `${produto} - ${plano}`,
            payment_method_id: 'pix',
            payer: {
                email: email,
                first_name: 'Cliente',
                last_name: 'Lartxcheats'
            }
        });

        // Extrair informações do PIX
        const pixInfo = payment.body.point_of_interaction.transaction_data;

        res.json({
            success: true,
            payment_id: payment.body.id,
            qr_code: pixInfo.qr_code, // Código PIX Copia e Cola
            qr_code_base64: pixInfo.qr_code_base64, // QR Code em base64
            ticket_url: pixInfo.ticket_url, // URL do ticket
            valor: valor,
            produto: produto,
            plano: plano
        });

    } catch (error) {
        console.error('Erro ao criar PIX:', error);
        res.status(500).json({ 
            error: 'Erro ao gerar pagamento PIX',
            details: error.message 
        });
    }
});

// Rota para verificar status do pagamento
app.get('/api/verificar-pagamento/:payment_id', async (req, res) => {
    try {
        const { payment_id } = req.params;

        const payment = await mercadopago.payment.get(payment_id);

        res.json({
            success: true,
            status: payment.body.status,
            status_detail: payment.body.status_detail,
            approved: payment.body.status === 'approved'
        });

    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        res.status(500).json({ 
            error: 'Erro ao verificar pagamento',
            details: error.message 
        });
    }
});

// Webhook para receber notificações do Mercado Pago
app.post('/api/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;

        if (type === 'payment') {
            const payment = await mercadopago.payment.get(data.id);
            
            console.log('Pagamento recebido:', {
                id: payment.body.id,
                status: payment.body.status,
                valor: payment.body.transaction_amount,
                descricao: payment.body.description
            });

            // Aqui você pode:
            // 1. Salvar no banco de dados
            // 2. Enviar email de confirmação
            // 3. Liberar o produto automaticamente
            // 4. Notificar no Discord
        }

        res.status(200).send('OK');

    } catch (error) {
        console.error('Erro no webhook:', error);
        res.status(500).send('Error');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
