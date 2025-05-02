# 🌍 GeoNeo

GeoNeo is a modern React application that allows users to explore countries around the world using the REST Countries API. Users can search for countries, filter them by region or language, and view detailed information such as capital, population, and flag. Optional user authentication (login/signup) is implemented for enhanced features.

## 🔗 Live Demo

🌐 [Live on Netlify](https://your-netlify-site.netlify.app) 

---

## 📌 Features

* 🔍 Search countries by name
* 🌐 Filter countries by region and language
* 📖 View detailed country info (capital, population, languages, etc.)
* 🎬 Intro animation on first load
* 👤 User authentication (Login/Signup)
* 💻 Responsive UI with a modern CSS framework (Tailwind)
* ⚡ Dynamic data rendering without page refresh
* ✅ Tested with Jest
* 🚀 Deployed on Netlify

---

## 🛠️ Tech Stack

| Frontend      | Backend        | Styling     | Hosting      | Version Control |
| ------------- | -------------- | ----------- | ------------ | --------------- |
| React (Hooks) | Node.js/Express| TailwindCSS | Netlify      | Git + GitHub    |

---

## 📦 API Integration

Using the [REST Countries API](https://restcountries.com/), 

* `GET /all` – List of all countries
* `GET /name/{name}` – Search by country name
* `GET /region/{region}` – Filter countries by region
* `GET /alpha/{code}` – Get full country details by code
---

## 🧭 Navigation & Routes

| Route             | Component       | Description                        |
| ----------------- | --------------- | ---------------------------------- |
| `/`               | `Home`          | Main landing page                  |
| `/login`          | `Login`         | User login page                    |
| `/register`       | `Signup`        | New user registration              |
| `/search-country` | `SearchCountry` | Search bar for countries           |
| `/search-result`  | `SearchResult`  | Displays countries based on search |
| `/search-regions` | `Regions`       | Region filter                      |
| `/languages`      | `Languages`     | Filter countries by language       |
| `/continents`     | `Continents`    | Optional continent grouping        |

---

## ⚙️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/HirushiniChandrasoma/explore-countries-restapi.git
cd explore-countries-restapi
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm start
```

4. **Run backend**

```bash
cd backend
npm install
node server.js
```

---

## 🔐 User Authentication

User login/signup features are implemented with:

* JWT (JSON Web Tokens)
* Token storage in `localStorage`
* Route guards for protected components

---

## ✅ Testing

This project includes unit and integration testing using:

* **Jest**

To run tests:

```bash
npm test
```

---

## 🚀 Deployment

The frontend is deployed on **Netlify**.

Steps:

1. Push code to GitHub
2. Connect Netlify to the GitHub repo
3. Set build command: `npm run build`
4. Set publish directory: `build/`
5. Click **Deploy**

Backend : Deploy separately using **Render**.

---

## 📁 Project Structure

```
explore-countries-restapi/
│
├── public/
├── src/
│   ├── App.js
│   ├── Header.js
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   ├── SearchCountry.js
│   ├── SearchResult.js
│   ├── Regions.js
│   ├── Languages.js
│   ├── Continents.js
│   └── IntroAnimation.js
│
├── backend/ (Optional)
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
└── README.md
```


---


## 📸 Screenshots

