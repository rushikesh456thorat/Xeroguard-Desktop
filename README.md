# Xerox Shop Owner Frontend (React)

## 📌 Overview
This is the **frontend application for Xerox shop owners**, built using **React.js**. The app allows shop owners to receive files uploaded by customers, manage requests, and process printing tasks efficiently. Customers scan a **unique QR code** to upload files directly to the shop's system.

## 🚀 Features
- **User Authentication** (Login/Register)
- **Unique QR Code Generation** for each shop
- **File Preview & Management**


## 🏗️ Tech Stack
- **Frontend**: React.js, Tailwind CSS

## 🎯 Project Structure
```
frontend-xerox-shop/
│── public/             # Static assets (favicons, images)
│── src/                # Main source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (Dashboard, Login, Register)
|   ├── utilis/
│   ├── App.jsx          # Main App Component
│   ├── main.jsx        # React Entry Point
│── .env                # API Base URL & Configurations
│── package.json        # Dependencies
│── README.md           # Project Documentation
```

## 🔧 Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/rushikesh456thorat/Xeroguard-Desktop
```

### 2️⃣ Install dependencies
```bash
npm install   # OR yarn install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the root directory and add:(no need of this)
```env
REACT_APP_API_BASE_URL=https://your-backend-url.com 
```

### 4️⃣ Run the application
```bash
npm start   # OR yarn start
```

The application will be available at `http://localhost:3000/`


## 🚀 Deployment
### 1️⃣ Build the project
```bash
npm run build   # OR yarn build
```


## 🛠️ Future Improvements
- ✅ Implement **file preview & delete option**
- ✅ Enhance **real-time notifications**
- ✅ Add **multi-language support**
- ✅ Optimize **performance for large file uploads**

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repo & create a new branch.
2. Make changes and commit.
3. Submit a pull request.

## 📜 License
This project is **open-source** and available under the [Custom License](LICENSE).

---
🚀 **Built with ❤️ by Rushikesh Thorat**

