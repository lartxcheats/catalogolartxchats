// Cliente API para comunicação com o backend
const API_URL = 'http://localhost:3000/api'; // ALTERE para URL do seu backend em produção

class PaymentAPI {
    
    /**
     * Cria um pagamento PIX
     * @param {Object} dados - {produto, plano, valor, email}
     * @returns {Promise<Object>} Dados do PIX gerado
     */
    static async criarPix(dados) {
        try {
            const response = await fetch(`${API_URL}/criar-pix`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar pagamento PIX');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    /**
     * Verifica o status de um pagamento
     * @param {string} paymentId - ID do pagamento
     * @returns {Promise<Object>} Status do pagamento
     */
    static async verificarPagamento(paymentId) {
        try {
            const response = await fetch(`${API_URL}/verificar-pagamento/${paymentId}`);

            if (!response.ok) {
                throw new Error('Erro ao verificar pagamento');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }
}

// Exportar para uso global
window.PaymentAPI = PaymentAPI;
