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
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Slider FOV
const fovSlider = document.getElementById('fovSlider');
const fovValue = document.getElementById('fovValue');
const fovOverlay = document.getElementById('fovOverlay');
const fovCircle = document.getElementById('fovCircle');

fovSlider.addEventListener('input', (e) => {
    fovValue.textContent = e.target.value;
    if (fovOverlay.classList.contains('active')) {
        updateFOVCircle();
    }
});

// Slider Sensibilidade VIP
const sensSlider = document.getElementById('sensSlider');
const sensValue = document.getElementById('sensValue');

sensSlider.addEventListener('input', (e) => {
    sensValue.textContent = e.target.value;
});

// Atualizar círculo FOV
function updateFOVCircle() {
    const fovSize = parseInt(fovSlider.value);
    const circleSize = 100 + (fovSize * 30);
    fovCircle.style.width = circleSize + 'px';
    fovCircle.style.height = circleSize + 'px';
}

// Botão Injetar
document.getElementById('injetarBtn').addEventListener('click', () => {
    const ativarAuxilio = document.getElementById('ativarAuxilio').checked;
    const ativarFov = document.getElementById('ativarFov').checked;
    const ativarAntiRecuo = document.getElementById('ativarAntiRecuo').checked;
    const fov = fovSlider.value;
    const sens = sensSlider.value;
    const auxilio = document.getElementById('auxilioSelect').value;
    const tipoAimbot = document.querySelector('input[name="tipoAimbot"]:checked').value;
    
    if (!ativarAuxilio && !ativarFov && !ativarAntiRecuo) {
        showNotification('⚠️ Ative pelo menos uma função VIP!', 'error');
        return;
    }
    
    if (ativarFov) {
        updateFOVCircle();
        fovOverlay.classList.add('active');
    }
    
    showNotification('👑 FUNÇÕES VIP INJETADAS!', 'success');
    
    setTimeout(() => {
        abrirFreefire();
    }, 800);
});

// Função para abrir Free Fire
function abrirFreefire() {
    const deepLinks = {
        android: 'com.dts.freefireth://',
        ios: 'freefire://',
        playStore: 'https://play.google.com/store/apps/details?id=com.dts.freefireth',
        appStore: 'https://apps.apple.com/app/garena-free-fire/id1300146617'
    };
    
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
        window.location.href = appLink;
        
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
    alert('📋 TERMOS DE USO VIP\n\n' +
          '✓ Versão VIP Premium com recursos exclusivos\n' +
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
