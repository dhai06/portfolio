# Portfolio Project Structure Guide

## 📁 Project Overview

This is a **Next.js 16** portfolio with a Hinge-style scrollable feed interface. It uses **TypeScript**, **Tailwind CSS**, and **Framer Motion** for animations.

---

## 🗂️ File Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, metadata)
│   │   ├── globals.css        # Global styles & colors
│   │   └── page.tsx           # Home page (entry point)
│   ├── components/
│   │   ├── ProfileFeed.tsx    # Main feed container
│   │   ├── PhotoBlock.tsx     # Photo card with like button
│   │   ├── PromptBlock.tsx    # Question/answer card
│   │   ├── InfoPillsBlock.tsx # Info tags display
│   │   ├── DetailsPage.tsx    # Full-screen profile details
│   │   └── Menu.tsx           # Navigation overlay
│   └── data/
│       └── portfolioData.ts   # Your content & data
├── public/
│   └── images/                # Your images
└── package.json               # Dependencies
```

---

## 📄 Key Files Explained

### 1. **`src/data/portfolioData.ts`** 📝
**What it does:** Stores ALL your portfolio content (text, images, links)

**Structure:**
```typescript
{
  id: '1',
  type: 'about' | 'project' | 'contact',
  name: 'Display Name',
  verified: true/false,
  images: ['/images/photo1.png', ...],
  prompts: [
    { question: 'Prompt...', answer: 'Your answer...' }
  ],
  infoPills: [
    { label: 'Tag text' }
  ],
  details: {
    stack: ['React', 'TypeScript'],
    github: 'https://...',
    demo: 'https://...',
    email: 'you@example.com',
    socials: [{ label: 'Twitter', url: '...' }]
  }
}
```

**How to modify:**
- **Add content:** Add objects to the `portfolioData` array
- **Change text:** Edit `name`, `prompts.answer`, etc.
- **Add images:** Put images in `public/images/` and reference as `/images/filename.png`
- **Add projects:** Create new object with `type: 'project'`

---

### 2. **`src/components/ProfileFeed.tsx`** 🎡
**What it does:** Main container that manages which profile is displayed

**Key features:**
- Navigation state (`currentIndex`)
- Details page visibility (`showDetails`)
- Interleaves photos and prompts
- Shows header, content blocks, nav buttons

**How to modify:**
- **Change navigation:** Edit `handleNext`/`handlePrevious` logic
- **Modify layout:** Change the `className` props
- **Add animations:** Edit the `motion.main` props

---

### 3. **`src/components/PhotoBlock.tsx`** 🖼️
**What it does:** Displays a photo with a heart button overlay

**How to modify:**
- **Button position:** Change `bottom-4 right-4` classes
- **Image aspect ratio:** Change `aspect-[4/5]`
- **Corner radius:** Change `rounded-xl`
- **Remove like button:** Delete the button element

---

### 4. **`src/components/PromptBlock.tsx`** 💬
**What it does:** Displays question/answer cards with like buttons

**How to modify:**
- **Text styling:** Edit `text-xl font-serif` classes
- **Background color:** Change `bg-white`
- **Padding:** Change `p-6`
- **Remove question:** Delete the first `<p>` tag

---

### 5. **`src/components/InfoPillsBlock.tsx`** 🏷️
**What it does:** Shows tags/pills with your info

**How to modify:**
- **Pill shape:** Change `rounded-full`
- **Colors:** Edit `bg-[var(--background)]`
- **Size:** Change `px-4 py-2 text-sm`

---

### 6. **`src/components/DetailsPage.tsx`** 📋
**What it does:** Full-screen page with complete profile info (opens on heart click)

**Contains 3 layouts:**
- `AboutDetails` - For personal profiles
- `ProjectDetails` - For project showcases
- `ContactDetails` - For contact pages

**How to modify:**
- **Layout per type:** Edit the specific function (`AboutDetails`, etc.)
- **Animation speed:** Change `transition` props
- **Background:** Edit wrapper `bg-[var(--background)]`

---

### 7. **`src/components/Menu.tsx`** ☰
**What it does:** Hamburger menu overlay for quick navigation

**How to modify:**
- **Menu items text:** Edit the button children
- **Position:** Change `top-3 right-14`
- **Animation:** Edit `motion.div` props

---

### 8. **`src/app/globals.css`** 🎨
**What it does:** Defines color palette and global styles

**Color variables:**
```css
--background: #faf9f7  (cream)
--foreground: #1a1a1a  (near-black)
--card-bg: #ffffff     (white)
--accent: #1a1a1a      (black)
--border: #e5e5e5      (light gray)
```

**How to modify:**
- **Change theme:** Update hex values in `:root`
- **Add new colors:** Add `--my-color: #...` and reference as `bg-[var(--my-color)]`

---

### 9. **`src/app/layout.tsx`** 🔤
**What it does:** Sets up fonts and page metadata

**How to modify:**
- **Change fonts:** Replace `Inter` and `Playfair_Display` imports
- **Update title/description:** Edit the `metadata` object

---

### 10. **`src/app/page.tsx`** 🏠
**What it does:** Entry point - renders ProfileFeed

**How to modify:**
- Rarely needs changes
- Just passes `portfolioData` to `ProfileFeed`

---

## 🛠️ Common Customizations

### Add a New Project
```typescript
{
  id: '4',
  type: 'project',
  name: 'My Cool App',
  verified: false,
  images: ['/images/myapp.png'],
  prompts: [
    { question: 'What it does', answer: 'Description here' }
  ],
  infoPills: [{ label: 'React' }, { label: 'Node.js' }],
  details: {
    stack: ['React', 'Node.js'],
    github: 'https://github.com/...',
    demo: 'https://myapp.com'
  }
}
```

### 📸 Adding Multiple Photos & Text Blocks
To add multiple photos and text blocks to a single project, simply add more items to the `images` and `prompts` arrays in `src/data/portfolioData.ts`.

**How they appear:**
The project feed **interleaves** them in order. If you have 3 photos and 2 prompts, it will show:
1. Photo 1
2. Prompt 1
3. Photo 2
4. Prompt 2
5. Photo 3

**Example:**
```typescript
{
  id: 'project-id',
  type: 'project',
  name: 'My Big Project',
  images: [
    '/images/photo1.png', 
    '/images/photo2.png', 
    '/images/photo3.png'
  ],
  prompts: [
    { question: 'The Mission', answer: 'To build something great.' },
    { question: 'The Result', answer: 'It was successful!' }
  ],
  // ... other fields
}
```

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --background: #yourcolor;
  --foreground: #yourcolor;
}
```

### Add More Navigation Buttons
Edit `src/components/ProfileFeed.tsx` - duplicate the button structure in the "Navigation Buttons" section

### Remove Heart Buttons
Delete the `<button>` from `PhotoBlock.tsx` and `PromptBlock.tsx`

### Change Photo Layout
Edit `src/components/PhotoBlock.tsx` - change `aspect-[4/5]` to `aspect-[16/9]` or `aspect-square`

---

## 🚀 Development Commands

```bash
npm run dev    # Start dev server
npm run build  # Build for production
```

---

## 📝 Quick Reference

- **Add content** → `portfolioData.ts`
- **Change colors** → `globals.css`
- **Modify layout** → `ProfileFeed.tsx`
- **Edit cards** → `PhotoBlock.tsx`, `PromptBlock.tsx`
- **Customize details** → `DetailsPage.tsx`
