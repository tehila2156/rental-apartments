# 🏡 Vacation Rentals – Full-Stack Project (Node.js + React)

A final project demonstrating a **Full-Stack application** built with **Node.js (Backend)** and **React (Frontend)** for managing and renting vacation apartments.  
The system allows users to register, log in, publish their own apartments, update and delete listings, and browse/filter all available rentals.  

---

## ✨ **Features**
- 🔐 **User Management** – registration, login, JWT authentication, personal profile updates.  
- 🏠 **Apartment Management** – add, edit, and delete apartments by advertisers.  
- 🔎 **Search & Filters** – by city, category, price range, and number of beds.  
- 📋 **Apartment Listings** – dynamic UI with visual indicators for price ranges.  
- 🗂️ **Apartment Details** – full details including description, image, category, city, price, and advertiser’s contact info.  
- 🚪 **Access Control** – public vs. private routes with redirects for unauthorized users.  

---

## 🖥️ **System Structure**

### **Backend (Node.js + Express)**
- **User/Advertiser model** – unique email, password, phone numbers, and apartments array.  
- **City model** – auto-generated code and city name.  
- **Category model** – auto-generated code and name (e.g., cabin, vacation unit, rental apartment).  
- **Apartment model** – name, description, image, city, category, price, beds, extras, advertiser reference.  
- **Authentication** – JWT-based secure access.  

### **Frontend (React)**
- **Home Page** – images, ads, and navigation links.  
- **Login** – email + password form.  
- **Register** – new user form.  
- **All Apartments** – display all listings with filters.  
- **Apartment Details** – full apartment info + advertiser’s contact.  
- **My Apartments** – advertiser’s personal listings with edit/delete options.  
- **Personal Area** – update personal details and add new apartments.  

---

## 🛠️ **Technologies**
- **Frontend**: React, CSS  
- **Backend**: Node.js, Express  
- **Authentication**: JWT  
- **Database**: MongoDB (or other, depending on setup)  

---

## 🚀 **Getting Started**
Clone the repository:  
   ```bash
   git clone https://github.com/username/repository.git
   cd repository
Install and run the backend:

bash
Copy code
cd backend
npm install
npm start
Install and run the frontend:

bash
Copy code
cd frontend
npm install
npm start
Access the app: http://localhost:3000

📚 Project Goals

Demonstrate Full-Stack development with Node.js + React.

Implement full CRUD functionality (Create, Read, Update, Delete).

Practice JWT-based authentication.

Explore search and filtering features on both client and server sides.
