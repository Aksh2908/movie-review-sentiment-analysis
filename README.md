# 🎬 Movie Review Sentiment Analysis

A full-stack application that performs real-time sentiment analysis on IMDb movie reviews using NLP and Machine Learning. It classifies user-submitted reviews as **positive** or **negative** through a clean and intuitive UI.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Dataset](#dataset)  
- [Sample Output](#sample-output)  
- [Future Enhancements](#future-enhancements) 
- [Contact](#contact)

---

## Features

- 🔍 Sentiment classification (Positive/Negative)
- 💬 Keyword extraction from reviews
- ⚡ Real-time analysis with instant results
- 🌐 React-based responsive frontend
- 🧠 ML model trained on real-world IMDb data
- 🔗 Flask backend integration

---

## Tech Stack

- **Frontend:** React.js + Tailwind CSS  
- **Backend:** Python (Flask)  
- **ML/NLP:** Scikit-learn, NLTK  
- **Dataset:** IMDb Movie Review Dataset (Kaggle)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Python 3.8+](https://www.python.org/)

---

### Backend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/Aksh2908/movie-review-sentiment-analysis.git
    cd movie-review-sentiment-analysis
    ```

2. **Create a virtual environment and activate it**

    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install backend dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Start the backend**

    ```bash
    python app.py
    ```

> Backend will run at `http://127.0.0.1:5000`

---

### Frontend Setup

1. **Install frontend dependencies**

    ```bash
    cd frontend
    npm install
    ```

2. **Start the frontend**

    ```bash
    npm run dev
    ```

> Frontend will run at `http://localhost:3000`

---

## Usage

- Enter a movie review in the input box.
- Click **Submit** to get real-time prediction.
- View whether the sentiment is **Positive** or **Negative**.
- See the extracted keywords that influence the sentiment.

---

## Dataset

- 📁 IMDb Movie Review Dataset  
- ✅ 50,000 labeled movie reviews (25,000 positive + 25,000 negative)  
- 📥 Download: [Kaggle Dataset Link](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)

---

## Sample Output

> **User Input:**  
> _"The movie had amazing cinematography, but the story was slow and boring."_

> **Predicted Sentiment:**  
> ❌ **Negative**

---

## Future Enhancements

- ➕ Add Neutral sentiment classification
- 📊 Include sentiment trend visualization (graphs/charts)
- ☁️ Deploy backend (Render, Railway) and frontend (Netlify, Vercel)
- 🧾 Enable review history with authentication
- 🐳 Dockerize for container-based deployment
- ✅ Add unit tests for API and model endpoints

---

## Contact

For queries, feedback, or collaboration:

- 💼 [LinkedIn – Akshita Chaudhary](https://www.linkedin.com/in/akshita-chaudhary/)
- 🐙 [GitHub – Akshita Chaudhary](https://github.com/Aksh2908)

Feel free to open an [issue](https://github.com/Aksh2908/movie-review-sentiment-analysis/issues) for suggestions or bug reports.

---

