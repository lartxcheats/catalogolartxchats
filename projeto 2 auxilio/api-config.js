// Configuração da API JSONBin.io
const API_CONFIG = {
    binId: '69af1ad2ae596e708f71ddfd',
    apiKey: '$2a$10$.SYOFVzXz21s/wO5bQVpyuy.fou3qq/mKxOcXKTfOmnGUnNjC1jVG',
    baseUrl: 'https://api.jsonbin.io/v3'
};

// Funções para gerenciar keys na API
const KeysAPI = {
    // Buscar todas as keys
    async getKeys() {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/b/${API_CONFIG.binId}/latest`, {
                method: 'GET',
                headers: {
                    'X-Master-Key': API_CONFIG.apiKey
                }
            });
            const data = await response.json();
            return data.record || [];
        } catch (error) {
            console.error('Erro ao buscar keys:', error);
            return [];
        }
    },

    // Salvar keys
    async saveKeys(keys) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/b/${API_CONFIG.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_CONFIG.apiKey
                },
                body: JSON.stringify(keys)
            });
            return response.ok;
        } catch (error) {
            console.error('Erro ao salvar keys:', error);
            return false;
        }
    },

    // Validar key VIP
    async validateKey(usuario, key) {
        const keys = await this.getKeys();
        
        const foundKey = keys.find(k => 
            k.user === usuario && 
            k.key === key && 
            k.type === 'vip' &&
            k.active === true
        );
        
        if (!foundKey) {
            return false;
        }
        
        // Verificar se não expirou
        const expiryDate = new Date(foundKey.expiry);
        const now = new Date();
        
        if (expiryDate < now) {
            return false;
        }
        
        return true;
    }
};
