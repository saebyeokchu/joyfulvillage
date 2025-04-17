# 🌿 typescript-joyful-front — JoyfulVillage Frontend (Next.js + TypeScript)

**typescript-joyful-front** is the official frontend for [JoyfulVillage](https://joyfulvillage.co.kr), a user-driven accommodation platform that allows anyone to upload, browse, and manage unique stays across peaceful village-like communities.

This frontend is built with **Next.js** and **TypeScript**, offering a clean, responsive, and user-friendly interface integrated with the Django backend.

---

## 🖼️ Features

- 🏠 Upload, browse, and manage accommodations
- 🔐 User authentication and role-based access
- 🖼️ Image upload with preview and validation
- 🔄 Integrated with Django backend via REST APIs
- 📱 Fully responsive (mobile/tablet/desktop)
- ⚡ Fast performance with SSR and dynamic routing (Next.js App Router)

---

## 🛠 Tech Stack

| Layer         | Tech                         |
|---------------|------------------------------|
| Framework     | [Next.js](https://nextjs.org/) (App Router) |
| Language      | TypeScript                   |
| UI Styling    | Tailwind CSS                 |
| State Mgmt    | React Context / useState     |
| HTTP Client   | Axios                        |
| Auth          | Token-based (JWT)            |
| Hosting       | Vercel / AWS                 |

---

## 📁 Project Structure

```bash
typescript-joyful-front/
├── app/                    # App Router pages and layout
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── rooms/              # List and detail of accommodations
│   ├── upload/             # Accommodation creation form
├── components/             # Reusable UI components (e.g. Header, Card)
├── lib/                    # API and utility functions
├── styles/                 # Global styles and Tailwind config
├── public/                 # Static assets
├── .env.local              # Local environment config
├── next.config.js
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.joyfulvillage.co.kr
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/saebyeokchu/typescript-joyful-front.git
cd typescript-joyful-front
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 🔗 Backend Integration

This frontend communicates with the Django API served by:

🔗 [`python-joyfulvillage-back`](https://github.com/saebyeokchu/python-joyfulvillage-back)

Make sure your Django backend is running and CORS is properly configured to allow frontend requests.

---

## ✨ Pages & Routes

| Page                  | Description                           |
|-----------------------|---------------------------------------|
| `/`                   | Home page                             |
| `/rooms`              | Browse accommodations                 |
| `/upload`             | Upload a new room (authenticated)     |
| `/login`              | User login                            |
| `/register`           | User registration                     |
| `/rooms/[id]`         | View individual room details          |

---

## 📦 Future Enhancements

- [ ] Availability calendar integration
- [ ] User dashboards (host/guest view)
- [ ] Review & rating system
- [ ] Admin approval flow
- [ ] Progressive Web App (PWA) support

---

## 🙌 Contributing

Have suggestions or ideas to make JoyfulVillage better?  
Feel free to fork the repo, submit issues, or open a pull request!

---

## 📄 License

MIT License

---

Crafted with ☀️ and care by [@saebyeokchu](https://github.com/saebyeokchu)  
Frontend of **JoyfulVillage** — a cozy home-sharing experience 🏡
