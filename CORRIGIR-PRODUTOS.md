# Como Corrigir os Produtos

O arquivo `hs-pescoco.html` está funcionando perfeitamente. Os outros produtos precisam ter o mesmo código JavaScript.

## Solução Rápida

Abra cada arquivo HTML no editor e substitua MANUALMENTE a seção `<script>` (após as bibliotecas) pelo código do `hs-pescoco.html`.

## Arquivos que precisam ser corrigidos:

1. **bypass-ios.html**
2. **ffh4x-modaimkill.html** 
3. **ffh4x-todos-ios.html**

## O que copiar do hs-pescoco.html:

Copie TODO o código JavaScript que está entre:
```html
<script>
    particlesJS("particles-js", {
        ...
    });
```

Até:

```html
</script>
</body>
</html>
```

## Alterações necessárias em cada produto:

### bypass-ios.html
- Título: `BYPASS IOS VIA WIFI`
- Badge: `🚀 Novo`
- Imagem: Manter a imagem atual
- Descrição: Manter a descrição atual
- Planos: Manter os planos atuais

### ffh4x-modaimkill.html
- Título: `FFH4X MODAIMKILL`
- Badge: `💎 Premium`
- Imagem: Manter a imagem atual
- Descrição: Manter a descrição atual
- Planos: Manter os planos atuais

### ffh4x-todos-ios.html
- Título: `FFH4X TODOS IOS`
- Badge: `⭐ Destaque`
- Imagem: Manter a imagem atual
- Descrição: Manter a descrição atual
- Planos: Manter os planos atuais

## IMPORTANTE:

O código JavaScript é IDÊNTICO em todos os produtos. A única diferença é o HTML (título, descrição, planos).

O problema está no código JavaScript minificado (tudo em uma linha) nos outros arquivos. Precisa ser substituído pelo código formatado do hs-pescoco.html.
