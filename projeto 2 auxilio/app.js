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

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
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

// Credenciais corretas (você pode mudar aqui)
const USUARIO_CORRETO = 'LARTX-CHEATS-01';
const KEY_CORRETA = 'lartxcheats01detodas';

// Login
saveBtn.addEventListener('click', () => {
    const usuario = userInput.value.trim();
    const key = noteInput.value.trim();
    
    errorMessage.style.display = 'none';
    
    if (!usuario || !key) {
        showError('Por favor, preencha todos os campos!');
        return;
    }
    
    if (usuario !== USUARIO_CORRETO || key !== KEY_CORRETA) {
        showError('Usuário ou Key incorretos!');
        return;
    }
    
    // Login bem-sucedido
    localStorage.setItem('usuarioLogado', usuario);
    window.location.href = 'dashboard.html';
});

// Termos de uso
document.getElementById('termosLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('📋 TERMOS DE USO\n\n' +
          '✓ Este é um produto 100% GRATUITO\n' +
          '✓ Não nos responsabilizamos por qualquer mal uso\n' +
          '✓ Use por sua conta e risco\n' +
          '✓ Ao utilizar, você concorda com todos os termos\n\n' +
          '⚠️ O uso inadequado pode resultar em banimento permanente.\n\n' +
          '💎 Compre o VIP aqui:\nhttps://discord.gg/RvmsaWuuET');
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    displayNotes(notes);
}

// Display notes
function displayNotes(notes) {
    const notesList = document.getElementById('notesList');
    if (!notesList) return;
    
    if (notes.length === 0) {
        notesList.innerHTML = '<div class="empty-state">Nenhuma nota ainda. Adicione uma acima!</div>';
        return;
    }

    notesList.innerHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-text">${note.text}</div>
            <small style="color: #999;">${note.date}</small>
            <div class="note-actions" style="margin-top: 10px;">
                <button class="btn-small btn-share" onclick="shareNote(${note.id})">
                    Compartilhar
                </button>
                <button class="btn-small btn-delete" onclick="deleteNote(${note.id})">
                    Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// Share note
async function shareNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes.find(n => n.id === id);
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Minha Nota',
                text: note.text
            });
        } catch (err) {
            console.log('Erro ao compartilhar', err);
        }
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(note.text);
        alert('Nota copiada para a área de transferência!');
    }
}

// Delete note
function deleteNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const filtered = notes.filter(n => n.id !== id);
    localStorage.setItem('notes', JSON.stringify(filtered));
    displayNotes(filtered);
}
