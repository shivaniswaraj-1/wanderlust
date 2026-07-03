# 🌍 WanderLust

> An Airbnb-inspired full-stack vacation rental platform where users can discover, create, and manage property listings with secure authentication, image uploads, interactive maps, and user reviews.

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)
![License](https://img.shields.io/badge/License-MIT-blue)

---

# 📖 Project Overview

WanderLust is a full-stack vacation rental platform inspired by Airbnb. It allows users to browse vacation listings, create their own properties, upload images, leave reviews, and manage listings through a secure authentication system.

The project demonstrates full-stack web development concepts including authentication, authorization, CRUD operations, RESTful routing, cloud image storage, interactive maps, session management, and responsive UI development.

---

# ✨ Features

- 🔐 User Authentication (Signup/Login/Logout)
- 👤 Authorization for listing ownership
- 🏡 Create new property listings
- ✏️ Edit existing listings
- 🗑 Delete listings
- ☁️ Image upload using Cloudinary
- ⭐ User reviews and ratings
- 🗺 Interactive property location using Mapbox
- ⚡ Flash messages for user feedback
- 📱 Responsive design using Bootstrap
- 🛡 Session-based authentication using Passport.js

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- Passport.js
- Passport Local
- Express Session

## Cloud Services

- Cloudinary
- Mapbox

## Other Packages

- Joi Validation
- Method Override
- Connect Flash
- Express Error Handling
- dotenv

---

# 📂 Folder Structure

```
wanderlust/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── error.ejs
│
├── init/
├── app.js
├── cloudConfig.js
├── schema.js
├── package.json
├── .env.example
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
https://github.com/shivaniswaraj-1/wanderlust.git
```

Move into the project directory.

```bash
cd wanderlust
```

Install dependencies.

```bash
npm install
```

Create a `.env` file in the project root and add the required environment variables.

Start the application.

```bash
npm start
```

The application will run on:

```
http://localhost:8080
```

---

# 🔑 Environment Variables

Create a `.env` file and add:

```env
ATLASDB_URL=

SECRET=

CLOUD_NAME=

CLOUD_API_KEY=

CLOUD_API_SECRET=

MAP_TOKEN=
```

> Never commit your `.env` file or actual secret keys.

---

# 📸 Screenshots

Create a folder named:

```
README-assets/
```

Add screenshots such as:

- Home Page
- Listings Page
- Property Details
- Login
- Signup
- Create Listing
- Edit Listing
- Reviews

After deployment, embed them here.

---

# 🌐 Live Demo

Frontend

```
Coming Soon
```

Backend

```
Coming Soon
```

> Update these links after deployment.

---

# 🏗 Application Architecture

```
                 Browser
                    │
                    ▼
             Express.js Server
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 MongoDB Atlas             Cloudinary
        │
        ▼
      Mapbox API
```

---

# 🧪 Core Functionalities

- User Registration
- User Login
- User Logout
- Create Listing
- Edit Listing
- Delete Listing
- Upload Images
- Property Reviews
- Interactive Maps
- Secure Authentication
- Authorization
- Error Handling
- Flash Messages

---

# 🔮 Future Improvements

- ❤️ Wishlist functionality
- 📅 Booking system
- 💳 Online payment integration
- 🔍 Advanced search and filters
- 🔔 Email notifications
- 👨‍💼 Admin dashboard
- 📱 Progressive Web App (PWA)
- 🌍 Multi-language support

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Fork the repository, create a feature branch, commit your changes, and submit a pull request.

---

# 👩‍💻 Author

**Shivani Swaraj**

GitHub

https://github.com/shivaniswaraj-1

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
