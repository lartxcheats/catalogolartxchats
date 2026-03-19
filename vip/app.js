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

// Particles.js Configuration - Partículas Douradas VIP
particlesJS("particles-js", {
    particles: {
        number: { 
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: { 
            value: ["#FFD700", "#FFA500", "#FF8C00"]
        },
        shape: {
            type: ["circle", "triangle"],
            stroke: {
                width: 0,
                color: "#FFD700"
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#FFD700",
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.8
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then(reg => console.log('Service Worker registrado'))
        .catch(err => console.log('Erro ao registrar Service Worker', err));
}

// Install PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});

// App Logic
const userInput = document.getElementById('userInput');
const noteInput = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const errorMessage = document.getElementById('errorMessage');

// Login VIP com key fixa
saveBtn.addEventListener('click', () => {
    const usuario = userInput.value.trim();
    const key = noteInput.value.trim();
    
    errorMessage.style.display = 'none';
    
    if (!usuario || !key) {
        showError('Por favor, preencha todos os campos!');
        return;
    }
    
    // Credenciais VIP fixas
    const VIP_USER = 'LARTX-VIP-01';
    const VIP_KEY = 'lartxvip2024premium';
    
    if (usuario !== VIP_USER || key !== VIP_KEY) {
        showError('Usuário ou Key VIP incorretos!');
        return;
    }
    
    // Login bem-sucedido
    localStorage.setItem('usuarioLogado', usuario);
    window.location.href = 'dashboard.html';
});

// Validar key VIP (função antiga, não usada mais)
function validateKey(usuario, key) {
    // Buscar keys do admin
    const keys = JSON.parse(localStorage.getItem('lartxKeys') || '[]');
    
    // Procurar key correspondente
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

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Termos de uso
document.getElementById('termosLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('📋 TERMOS DE USO VIP\n\n' +
          '✓ Versão VIP Premium com recursos exclusivos\n' +
          '✓ Não nos responsabilizamos por qualquer mal uso\n' +
          '✓ Use por sua conta e risco\n' +
          '✓ Ao utilizar, você concorda com todos os termos\n\n' +
          '⚠️ O uso inadequado pode resultar em banimento permanente.\n\n' +
          '💎 Compre o VIP aqui:\nhttps://discord.gg/RvmsaWuuET');
});
