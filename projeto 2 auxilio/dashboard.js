// Particles.js Configuration
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2
        }
    }
});

// Verificar se está logado
const usuarioLogado = localStorage.getItem('usuarioLogado');
if (!usuarioLogado) {
    window.location.href = 'index.html';
}

// Mostrar nome do usuário
document.getElementById('usuarioLogado').textContent = usuarioLogado;

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
});

// Trocar abas
function switchTab(tabName) {
    // Remover active de todas as abas
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Ativar aba selecionada
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Slider FOV
const fovSlider = document.getElementById('fovSlider');
const fovValue = document.getElementById('fovValue');
const fovOverlay = document.getElementById('fovOverlay');
const fovCircle = document.getElementById('fovCircle');
const ativarFovCheckbox = document.getElementById('ativarFov');

fovSlider.addEventListener('input', (e) => {
    fovValue.textContent = e.target.value;
    // Só atualiza se já estiver injetado
    if (fovOverlay.classList.contains('active')) {
        updateFOVCircle();
    }
});

// Atualizar círculo FOV
function updateFOVCircle() {
    const fovSize = parseInt(fovSlider.value);
    // Calcular tamanho (100px a 400px)
    const circleSize = 100 + (fovSize * 30);
    fovCircle.style.width = circleSize + 'px';
    fovCircle.style.height = circleSize + 'px';
}

// Botão Injetar
document.getElementById('injetarBtn').addEventListener('click', () => {
    const ativarAuxilio = document.getElementById('ativarAuxilio').checked;
    const ativarFov = document.getElementById('ativarFov').checked;
    const fov = fovSlider.value;
    const auxilio = document.getElementById('auxilioSelect').value;
    const tipoAimbot = document.querySelector('input[name="tipoAimbot"]:checked').value;
    
    if (!ativarAuxilio && !ativarFov) {
        showNotification('⚠️ Ative pelo menos uma função!', 'error');
        return;
    }
    
    if (ativarFov) {
        // Ativar o círculo FOV
        updateFOVCircle();
        fovOverlay.classList.add('active');
    }
    
    showNotification('🎮 FUNÇÕES INJETADAS!', 'success');
    
    // Abrir Free Fire automaticamente (mais rápido)
    setTimeout(() => {
        abrirFreefire();
    }, 800);
});

// Função para abrir Free Fire
function abrirFreefire() {
    // Deep links para Free Fire
    const deepLinks = {
        android: 'com.dts.freefireth://',
        ios: 'freefire://',
        playStore: 'https://play.google.com/store/apps/details?id=com.dts.freefireth',
        appStore: 'https://apps.apple.com/app/garena-free-fire/id1300146617'
    };
    
    // Detectar plataforma
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    let appLink = '';
    let storeLink = '';
    
    if (isAndroid) {
        appLink = deepLinks.android;
        storeLink = deepLinks.playStore;
    } else if (isIOS) {
        appLink = deepLinks.ios;
        storeLink = deepLinks.appStore;
    }
    
    if (appLink) {
        showNotification('🎮 Abrindo Free Fire...', 'success');
        
        // Tentar abrir o app
        window.location.href = appLink;
        
        // Se não abrir em 2.5 segundos, redirecionar para a loja
        setTimeout(() => {
            if (confirm('Free Fire não está instalado. Deseja baixar?')) {
                window.location.href = storeLink;
            }
        }, 2500);
    }
}

// Termos de uso
document.getElementById('termosDashboard').addEventListener('click', (e) => {
    e.preventDefault();
    alert('📋 TERMOS DE USO\n\n' +
          '✓ Este é um produto 100% GRATUITO\n' +
          '✓ Não nos responsabilizamos por qualquer mal uso\n' +
          '✓ Use por sua conta e risco\n' +
          '✓ Ao utilizar, você concorda com todos os termos\n\n' +
          '⚠️ O uso inadequado pode resultar em banimento permanente.\n\n' +
          '💎 Compre o VIP aqui:\nhttps://discord.gg/RvmsaWuuET');
});

// Mostrar notificação
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 1500);
}
