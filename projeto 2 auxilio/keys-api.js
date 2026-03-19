// API para sincronizar keys online
// Usando JSONBin.io (gratuito)

const API_KEY = '$2a$10$SEU_API_KEY_AQUI'; // Pegue em jsonbin.io
const BIN_ID = 'SEU_BIN_ID_AQUI'; // ID do seu bin

// Salvar keys online
async function saveKeysOnline(keys) {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ keys: keys })
        });
        
        if (response.ok) {
            console.log('✅ Keys salvas online');
            return true;
        }
    } catch (error) {
        console.error('❌ Erro ao salvar keys:', error);
    }
    return false;
}

// Carregar keys online
async function loadKeysOnline() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Keys carregadas online');
            return data.record.keys || [];
        }
    } catch (error) {
        console.error('❌ Erro ao carregar keys:', error);
    }
    return [];
}
