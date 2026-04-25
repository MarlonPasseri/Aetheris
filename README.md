# Aetheris — HTML, CSS e JavaScript

Versão estática do site Aetheris, sem React, Vite ou Tailwind.

## Como rodar

Abra o `index.html` no navegador ou use a extensão **Live Server** no VS Code.

## Configurar API

Por padrão o formulário envia para:

```txt
http://localhost:3333/api/contact
```

Para produção, edite no começo do `script.js`:

```js
const API_URL = "https://sua-api.com/api/contact";
```

## Deploy

Como é HTML/CSS/JS puro, pode subir em Hostinger hospedagem comum, Netlify, Vercel, GitHub Pages ou Cloudflare Pages. Não precisa de build.
