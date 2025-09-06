# Book My PG

Book My PG is a comprehensive mobile-first web application designed to help college students easily find and manage their PG accommodations near their college campus. The app provides features like property listings, price filters, wishlist management, and essential details for student life such as college info, transport, food, and essentials.

## 🚀 Features

- **Mobile-First Design**: Optimized for smartphone usage
- **7 Core Sections**: Home, College Info, Transport, PG Listings, Food, Essentials, Get In Touch (Contact), ❤️ (Wishlist)
- **Interactive Navigation**: Bottom navigation
- **Real-time Search**: Find PG accommodations with filtering
- **Transport Guide**: Bus routes, metro lines, and airport connectivity
- **Food Discovery**: Canteens, restaurants, and street food
- **Emergency Contacts**: Quick access to essential services

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
college-city-guide/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── sections/          # Page sections
│   │   ├── navigation/        # Navigation components
│   │   └── layout/           # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── data/                  # Static data and constants
│   └── utils/                 # Utility functions
```

## ⚙ Getting Started

### Prerequisites

- Node.js 18+
- Next.js 15
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd book-my-pg
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**

Navigate to you local browser. The app will be available at [http://localhost:3000](http://localhost:3000)

5. **Build for Production**

```bash
npm run build
npm start
```

## 🌐 Deployment to Vercel

### Method 1: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Method 2: Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Deploy automatically

### Environment Variables

No environment variables required for basic functionality.

## 🎨 Design System

### Colors

- **Primary Blue**: #007BFF
- **Gray Scale**: #f8f9fa, #e9ecef, #6c757d, #333
- **Success Green**: #28a745
- **Warning Orange**: #fd7e14
- **Danger Red**: #dc3545

### Typography

- **Headings**: font-bold
- **Body**: Regular weight
- **Small Text**: text-sm

### Spacing

- **Grid System**: 8px base unit
- **Padding/Margin**: Multiples of 4px (1, 2, 3, 4, 6, 8, 12, 16, 24, 32)

## 🧩 Component Architecture

### UI Components (`/components/ui/`)

- `Card`: Reusable container component
- `Button`: Primary and secondary variants
- `Input`: Form input with validation
- `IconCard`: Card with icon and description

### Section Components (`/components/sections/`)

Each section is a self-contained component:

- `HomeSection`: Landing page with navigation cards
- `CollegeSection`: College information
- `TransportSection`: Transportation with accordion
- `PGSection`: PG listings with filtering
- `FoodSection`: Food and restaurants
- `EssentialsSection`: Emergency and essential services
- `ContactSection`: Contact form with validation
- `WishlistSection`: Wishlist to save favourite PGs.

### Hooks (`/hooks/`)

- `useActiveSection`: Manages current section state
- `useAccordion`: Handles accordion expand/collapse
- `useWishlist`: Manages wishlist

## 📱 Mobile Optimization

- Touch-friendly button sizes (minimum 44px)
- Responsive grid layouts
- Fixed navigation for easy access
- Optimized for iOS and Android browsers
- Fast loading with Next.js optimization

## 🔧 Customization

### Adding New Sections

1. Create component in `/components/sections/`
2. Add section constant to `/data/constants.ts`
3. Update navigation arrays
4. Register component in main page

### Styling Changes

- Modify `/tailwind.config.js` for theme changes
- Update `/app/globals.css` for global styles
- Component-specific styles in respective files

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript types
2. **Styling Issues**: Verify Tailwind classes
3. **Navigation Not Working**: Check section constants

### Performance

- Images are optimized with Next.js Image component
- Code splitting enabled by default
- CSS is automatically purged in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For support, email support@bookmypg.co.in or create an issue in the repository.

---

**Made with ❤️ for students by students**
