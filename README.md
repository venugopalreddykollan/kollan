# Robotics Portfolio Template

A responsive single-page portfolio template focused on robotics/software profiles.

## Project Structure

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assests/
│   └── ... media files and icons
└── README.md
```

## What Is Included

- Responsive navigation with mobile menu
- Home hero with neural-canvas interaction
- About, Skills, Projects, and Contact sections
- Contact form integration (FormSubmit)
- Theme toggle (dark/light)
- Scroll animations and interactive project media

## Use This As Your Own Template

If you want to personalize this template:

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

2. Create a local npm setup (for easier local development):

```bash
npm init -y
npm install --save-dev live-server
```

3. Add a run script in package.json:

```json
{
  "scripts": {
    "dev": "live-server --open=index.html"
  }
}
```

4. Run locally:

```bash
npm run dev
```

## Personalization Checklist

- Update name, title, and section text in index.html
- Replace project media inside assests/
- Update social links in the navigation bar
- Update contact form action email (FormSubmit)
- Adjust colors, spacing, and typography in css/styles.css
- Update neural behavior and interactions in js/script.js

## Deploy

You can deploy this as a static site on:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## License

Free to use, customize, and publish with attribution appreciated.
