# 📖 DevJobs Web App

> A user‑friendly web application where developers can dynamically view and filter job listings.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)  
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)

## 🔍 Project Overview

**DevJobs Web App** is a project we built together with **Gökdeniz Keleş** at **Acunmedya Akademi**. It dynamically fetches developer job listings from a `jobs.json` data file and lets users filter them by various criteria.

The app makes discovering jobs, accessing detailed information, and customizing the theme **easy**, **fast**, and **interactive**.

![image](https://github.com/user-attachments/assets/f3e1335b-271e-4b91-ab00-951226d88d4a)

## 🚀 Key Features

### 🔸 Dynamic Data Fetching  
- Job listings from `jobs.json` are fetched via the `fetch()` API and rendered dynamically on the page.  

### 🔸 Advanced Filtering & Search  
- **Text search**: filters by position title, company name, and expertise field.  
- **Location filter**: searches by city only.  
- **Job type**: shows only full‑time positions.  
Each filter updates results in real time without reloading the page.  

![image](https://github.com/user-attachments/assets/c354b268-30b7-443b-b683-78ee17fc8cef)

### 🔸 Theme Toggle (Light / Dark)  
- Users can switch between light and dark modes.  
- Preference is saved in `localStorage` so it persists across page reloads.

![image](https://github.com/user-attachments/assets/8912b651-1687-405e-bca1-83a2f2ea2ee1)

### 🔸 Mobile‑Friendly & Responsive Design  
- Built mobile‑first using **Flexbox** and **Media Queries**.  
- Ensures a seamless browsing and reading experience on all devices.

### 🔸 Detailed Job View  
- When a job card is clicked, a detail panel opens showing:  
  - Company logo  
  - Position title and description  
  - **What You Will Do**  
  - **Requirements**  
  - “Apply Now” button (links to the external application page)  

![image](https://github.com/user-attachments/assets/ab37b3d8-dd19-4680-af09-13b9d27c1b78)

## 🌐 Live Demo

🔗 https://jobs-draft.vercel.app/


## 🗂️ Project Structure

```bash
📦 assets
 ┣ 📂 css
 ┃ ┗ 📄 devjobs.css       # Stylesheet
 ┣ 📂 img                 # Images (icons, screenshots)
 ┣ 📂 js
 ┃ ┗ 📄 devjobs.js        # Core logic: fetch, render, filter, theme toggle
 ┗ 📂 logos               # Company logos

📦 .vscode                # VSCode settings
├ README.md               # Project documentation
├ data.json               # Job listings data (JSON)
└ index.html              # Main HTML template
