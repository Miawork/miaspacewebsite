# Miao Shen — Personal Portfolio

A static personal portfolio built from Miao Shen's résumé and original animated pixel-art character assets.

## Live site

The `main` branch deploys the contents of `dist/` to GitHub Pages through the workflow in `.github/workflows/deploy-pages.yml`.

- Repository: `https://github.com/Miawork/miaspacewebsite`
- Site: `https://miawork.github.io/miaspacewebsite/`

## Preview locally

Serve the `dist` directory with any static server, for example:

```bash
python3 -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

## Structure

- `dist/index.html` — portfolio content and page structure
- `dist/styles.css` — responsive visual system
- `dist/script.js` — character mood selector, reveal effects, and small interactions
- `dist/assets/` — animated character GIFs and favicon
