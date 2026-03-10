# 🚀 Guia Completo de Instalação - Lartxcheats

## 📋 O que você precisa

1. ✅ Conta no Mercado Pago (gratuita)
2. ✅ Node.js instalado no computador
3. ✅ Editor de código (VS Code recomendado)
4. ✅ Navegador web

---

## 🎯 PASSO 1: Criar Conta no Mercado Pago

1. Acesse: https://www.mercadopago.com.br
2. Clique em "Criar conta"
3. Complete o cadastro
4. Ative sua conta vendedor

---

## 🔑 PASSO 2: Obter Credenciais (Access Token)

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login
3. Clique em "Suas integrações"
4. Clique em "Criar aplicação"
5. Escolha um nome (ex: "Lartxcheats")
6. Vá em "Credenciais"
7. **COPIE o Access Token de TESTE** (para testar)
8. Depois copie o **Access Token de PRODUÇÃO** (para usar de verdade)

---

## 💻 PASSO 3: Instalar Node.js

### Windows:
1. Baixe: https://nodejs.org/
2. Execute o instalador
3. Clique em "Next" até finalizar
4. Abra o CMD e digite: `node --version`
5. Se aparecer a versão, está instalado!

### Verificar instalação:
```bash
node --version
npm --version
```

---

## 📦 PASSO 4: Configurar o Backend

### 4.1 Abrir terminal na pasta do projeto

**Windows:**
- Abra a pasta do projeto
- Clique com botão direito
- Escolha "Abrir no Terminal" ou "Git Bash Here"

### 4.2 Instalar dependências

```bash
cd backend
npm install
```

Aguarde alguns minutos...

### 4.3 Configurar variáveis de ambiente

1. Na pasta `backend`, copie o arquivo `.env.example`
2. Renomeie a cópia para `.env`
3. Abra o arquivo `.env` e edite:

```env
MERCADOPAGO_ACCESS_TOKEN=SEU_TOKEN_AQUI
PORT=3000
FRONTEND_URL=http://localhost:5500
```

**⚠️ IMPORTANTE:** Cole o Access Token que você copiou do Mercado Pago!

### 4.4 Iniciar o servidor

```bash
npm start
```

Você verá:
```
🚀 Servidor rodando na porta 3000
📍 http://localhost:3000
```

**✅ Backend funcionando!**

---

## 🌐 PASSO 5: Configurar o Frontend

### 5.1 Adicionar script no HTML

Abra cada arquivo HTML de produto e adicione ANTES do `</body>`:

```html
<script src="../api-client.js"></script>
```

### 5.2 Testar o site

1. Abra o arquivo `index.html` no navegador
2. Ou use Live Server no VS Code
3. Navegue até um produto
4. Selecione um plano
5. Faça login
6. O PIX será gerado automaticamente!

---

## 🧪 PASSO 6: Testar Pagamento

### Modo TESTE (não cobra de verdade):

1. Use o **Access Token de TESTE**
2. Gere um PIX
3. Use cartões de teste do Mercado Pago:
   - https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing

### Modo PRODUÇÃO (cobra de verdade):

1. Troque para **Access Token de PRODUÇÃO**
2. Reinicie o servidor
3. Agora os pagamentos são reais!

---

## 🚀 PASSO 7: Colocar Online (Deploy)

### Opção 1: Render.com (GRÁTIS e FÁCIL)

**Backend:**
1. Crie conta em: https://render.com
2. Clique em "New +" → "Web Service"
3. Conecte seu GitHub
4. Selecione o repositório
5. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
6. Adicione variáveis de ambiente:
   - `MERCADOPAGO_ACCESS_TOKEN`
   - `PORT` = 3000
   - `FRONTEND_URL` = URL do seu site
7. Clique em "Create Web Service"
8. Aguarde o deploy (5-10 minutos)
9. Copie a URL gerada (ex: `https://seu-app.onrender.com`)

**Frontend:**
1. Hospede no GitHub Pages, Vercel ou Netlify
2. Edite o arquivo `api-client.js`:
   ```javascript
   const API_URL = 'https://seu-app.onrender.com/api';
   ```
3. Faça upload dos arquivos

### Opção 2: Railway.app (GRÁTIS)

Similar ao Render, mas mais rápido:
1. https://railway.app
2. Conecte GitHub
3. Deploy automático!

---

## 🔧 Configurar Webhook (Notificações Automáticas)

1. Acesse: https://www.mercadopago.com.br/developers
2. Vá em "Webhooks"
3. Adicione URL: `https://seu-backend.com/api/webhook`
4. Selecione evento: "Pagamentos"
5. Salve

Agora você receberá notificações automáticas quando alguém pagar!

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] Conta Mercado Pago criada
- [ ] Access Token copiado
- [ ] Backend instalado (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] Servidor rodando (`npm start`)
- [ ] Frontend atualizado com `api-client.js`
- [ ] Teste realizado
- [ ] Deploy feito (opcional)
- [ ] Webhook configurado (opcional)

---

## 🐛 Problemas Comuns

### "Erro ao criar PIX"
- ✅ Verifique se o Access Token está correto
- ✅ Verifique se o servidor está rodando
- ✅ Veja o console do navegador (F12)

### "CORS Error"
- ✅ Configure `FRONTEND_URL` no `.env`
- ✅ Reinicie o servidor

### "Cannot find module"
- ✅ Execute `npm install` novamente
- ✅ Verifique se está na pasta `backend`

### Pagamento não aparece
- ✅ Verifique os logs do servidor
- ✅ Teste com Access Token de TESTE primeiro

---

## 📞 Suporte

- Discord: discord.gg/J6YbmjEV
- Email: suporte@lartxcheats.com

---

## 🎉 Pronto!

Seu sistema de pagamentos PIX está funcionando!

Agora os clientes podem:
1. Selecionar o produto
2. Escolher o plano
3. Gerar PIX com valor correto
4. Pagar e receber automaticamente

**Boa sorte com as vendas! 🚀💰**
