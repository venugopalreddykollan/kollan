# Venu's Portfolio Website

A modern, responsive web portfolio that showcases your projects, skills, and experience.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── script.js       # JavaScript for interactivity
├── images/             # Folder for project images
└── README.md           # This file
```

## 🎨 Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Modern Layout**: Clean and professional design with smooth animations
- **Interactive Navigation**: Mobile-friendly hamburger menu
- **Sections Included**:
  - Hero section with call-to-action buttons
  - About section with statistics
  - Skills showcase with icons
  - Projects gallery with hover effects
  - Contact form
  - Social media links
  - Footer

## 🚀 How to Host

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository named `portfolio`
2. Push all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose the main branch
6. Your site will be available at `https://yourusername.github.io/portfolio`

### Option 2: Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your portfolio folder
4. Your site will be live with a random domain (or connect a custom domain)

### Option 3: Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your project from GitHub or upload directly
4. Deploy with one click

### Option 4: Traditional Web Hosting
1. Upload all files to your web hosting provider (via FTP/cPanel)
2. Ensure `index.html` is in the root directory
3. Access your site via your domain name

## 📝 Customization

### Edit Personal Information
- Open `index.html` and replace:
  - Your name in the hero section
  - Your bio and stats in the about section
  - Your skills in the skills section
  - Your projects in the projects section

### Update Colors
- Open `css/styles.css`
- Edit the CSS variables at the top:
  ```css
  :root {
      --primary-color: #6366f1;
      --secondary-color: #ec4899;
      /* ... other colors ... */
  }
  ```

### Add Project Images
- Add images to the `images/` folder
- Update the image paths in `index.html`:
  ```html
  <img src="images/your-image.jpg" alt="Project">
  ```

### Add Social Links
- Update the social media links in the contact section
- Change the `href` attributes to your profiles

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Interactive features and animations
- **Font Awesome**: Icons for skills and social links

## 💡 Tips

- Keep project images optimized and properly sized
- Update your contact form to actually send emails (consider using a service like Formspree)
- Add your actual projects and descriptions
- Update the stats and experience details
- Add a proper profile image if desired
- Test on mobile devices before deploying

## 📧 Contact Integration

To make the contact form functional, you can:

1. **Using Formspree** (Easy, Free):
   - Go to [formspree.io](https://formspree.io)
   - Create a form
   - Replace the form action in `index.html`

2. **Using Netlify Forms** (If hosting on Netlify):
   - Add `netlify` attribute to the form
   - Netlify will handle submissions automatically

3. **Using Backend Service**:
   - Set up a backend service to handle form submissions
   - Update the form action to your endpoint

## 🎓 Next Steps

1. Customize with your actual information
2. Add high-quality project images
3. Add your real projects and achievements
4. Test all links and functionality
5. Deploy to your chosen hosting platform
6. Share with potential clients or employers!

## 📄 License

Feel free to use this template for your portfolio. Modify and customize as needed!

---

Happy coding! 🎉
