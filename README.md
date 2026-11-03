# 💰 Auto Expense Leakage Detector

## 📌 About the Project

The **Auto Expense Leakage Detector** is a Python-based web application designed to help users track expenses, monitor spending patterns, and identify unnecessary or abnormal expenses.

The application allows users to add expenses manually or upload bill images. It uses OCR (Optical Character Recognition) to extract text from uploaded bills and automatically identifies expense categories.

## ✨ Features

- **User Login:** Login-based access to the application.
- **Manual Expense Entry:** Add expenses with date, category, and amount.
- **Bill Image Upload:** Upload bill images for expense processing.
- **OCR Integration:** Extract text from uploaded bills using Tesseract OCR.
- **Automatic Categorization:** Categorize expenses based on extracted keywords.
- **Expense Dashboard:** View total expenses, monthly limits, and savings.
- **Expense Alerts:** Get alerts when spending exceeds category or monthly limits.
- **Data Visualization:** View category-wise and monthly expense charts.
- **Database Management:** Store expense records using SQLite.

## 🛠️ Technologies Used

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** SQLite
- **OCR:** Tesseract OCR, Pytesseract
- **Image Processing:** Pillow
- **Data Visualization:** Matplotlib

## 📂 Project Structure

```text
Final_Year_Project/
│
└── folder of project/
    │
    ├── app.py
    ├── model.py
    ├── database.py
    ├── database.db
    ├── expenses.db
    ├── requirements.txt
    │
    ├── templates/
    │   ├── dashboard.html
    │   ├── index.html
    │   └── login.html
    │
    └── static/
        ├── style.css
        ├── script.js
        ├── uploads/
        └── charts/
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd Final_Year_Project
cd "folder of project"
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

The application also imports Pytesseract and Pillow, which should be installed if they are not already available:

```bash
pip install pytesseract Pillow
```

### 4. Install Tesseract OCR

Install Tesseract OCR on your system and configure its executable path in `app.py`.

The current code uses a Windows installation path. Update it if Tesseract is installed elsewhere or if you use another operating system.

### 5. Initialize the Database

Run:

```bash
python database.py
```

### 6. Run the Application

```bash
python app.py
```

### 7. Open in Browser

```text
http://127.0.0.1:5000
```

## 📊 Application Modules

| Module | Description |
|---|---|
| Login | Provides login-based access |
| Expense Entry | Adds expenses manually |
| Bill Upload | Uploads bill images |
| OCR Processing | Extracts text from bills |
| Category Detection | Identifies expense categories |
| Dashboard | Displays expense summaries |
| Charts | Visualizes expense data |
| Alerts | Monitors spending limits |

## 🎯 Project Objective

The main objective of this project is to simplify personal expense tracking, improve spending awareness, and help users manage their finances through automated bill processing and visual expense analysis.

## 🚀 Future Enhancements

- Machine Learning-based expense classification.
- Improved OCR accuracy and amount extraction.
- Monthly and yearly financial reports.
- User registration and personalized accounts.
- Export expense reports as PDF or Excel.

## 👨‍💻 Author

**Sweedal Dsouza**

- GitHub: https://github.com/Sweedal313
- Portfolio: https://sweedals-portfolio.netlify.app/

---

⭐ If you find this project useful, consider giving the repository a star!
