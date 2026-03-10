# Sistema de Validação de Comprovante - Para Aplicar nos Outros Arquivos

## Arquivos que precisam ser atualizados:
1. ffh4x-todos-ios.html
2. bypass-ios.html  
3. ffh4x-modaimkill.html

## O que precisa ser adicionado:

### 1. Adicionar biblioteca Tesseract.js (antes do </head>)
```html
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js"></script>
```

### 2. Adicionar seção de comprovante no modal PIX (antes do botão "Fechar")
- Seção de upload de comprovante
- Preview da imagem
- Botão "Enviar Comprovante"
- Status de validação
- Seção do Discord (aparece após validação)

### 3. Adicionar funções JavaScript:
- previewComprovante()
- validarComprovanteOCR()
- enviarComprovante()
- enviarEmailConfirmacao()
- Variáveis: comprovanteFile, emailClienteGlobal, comprovanteValido

### 4. Atualizar função processarCompra() para salvar email

## Status:
- ✅ hs-pescoco.html - COMPLETO
- ⏳ ffh4x-todos-ios.html - PENDENTE
- ⏳ bypass-ios.html - PENDENTE
- ⏳ ffh4x-modaimkill.html - PENDENTE
