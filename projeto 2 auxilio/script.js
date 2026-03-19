const botao = document.getElementById('meuBotao');
const mensagem = document.getElementById('mensagem');

let contador = 0;

botao.addEventListener('click', function() {
    contador++;
    mensagem.textContent = `Você clicou ${contador} ${contador === 1 ? 'vez' : 'vezes'}!`;
});
