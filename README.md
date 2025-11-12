<h1 align="center">AI News Explorer</h1>

<p align="center">
  <b>A modern React-based news website that fetches real-time news using the GNews API.</b><br />
  Built with React Router, React Query & Tailwind CSS.
</p>


## Overview

**AI News Explorer** is a responsive web application that displays the latest news articles categorized under **Technology**, **Business**, and **Health**.  
It allows users to search for specific topics, view trending articles, and explore detailed news insights — all powered by the **GNews API**.


## Features

• Clean and modular React components  
• Category-wise news pages (Technology, Business, Health)  
• Live search with instant dropdown results  
• API data fetching via **React Query**  
• Beautiful UI with **Tailwind CSS**  
• Fully responsive for all screen sizes  
• Error handling and loading states  


## Tech Stack

 Technology | Purpose |
|-------------|----------|
| React | UI Framework.
| React Router | Navigation between pages.
| React Query | API data fetching and caching.
| Tailwind CSS | Styling.
| Axios | API requests.
| GNews API | News data source.
| Vite | Fast development environment.


## Folder Structure
```bash 
ai-news-explorer-app/
├── public/
│ ├── favicon.ico
│ ├── ai-banner.jpg
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── NewsCard.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ └── About.jsx
│ ├── utils/
│ │ └── api.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Installation

1 Clone the repository
```bash
git clone https://github.com/ShivaniGit009/news-explorer-app
```

2 Install dependencies
npm install

3 Run the project
npm run dev
