# 🚀 retail-recommendation-engine

A production-inspired **AI-powered retail recommendation system** that combines machine learning, scalable APIs, and a modern ecommerce UI.

This project demonstrates how to transform product metadata into **real-time, user-facing recommendations** using a full-stack architecture.

---

## 🧠 Overview

RetailRec generates intelligent product recommendations using a **hybrid similarity model** built on product attributes such as:

* product name
* brand
* category
* sub-category
* tags
* description
* price & rating signals

Unlike basic systems, this project integrates:

* 🧠 Machine Learning (TF-IDF + hybrid scoring)
* ⚡ FastAPI backend
* 🎨 React frontend (ecommerce UI)
* 🐳 Dockerized deployment

---

## ⚙️ Features

* 📊 Content-based recommendation engine
* 🤖 Hybrid ranking (text + category + rating + price)
* ⚡ FastAPI backend for real-time recommendations
* 🎨 Ecommerce-style React frontend
* 🔍 Product search, filtering, and sorting
* 🛒 Add-to-cart interaction flow
* 🖼️ Product image integration
* 📦 Full Docker support (frontend + backend)

---

## 🧠 Recommendation Engine

The system uses a **hybrid similarity model**:

1. TF-IDF text similarity (product metadata)
2. Category and sub-category matching
3. Rating normalization
4. Price normalization

### Final scoring formula:

0.50 * text_similarity

* 0.20 * category_match
* 0.10 * sub_category_match
* 0.10 * rating_score
* 0.10 * price_score

---

## 🏗️ Tech Stack

### Backend

* FastAPI
* Pandas / NumPy
* Scikit-learn
* Joblib

### Frontend

* React (Vite)
* Custom CSS (ecommerce UI)

### Deployment

* Docker
* Docker Compose
* Nginx (frontend serving)

---

## 🗂️ Project Structure

```
retail-recommendation-engine/
│
├── app/                # FastAPI application
├── recommender/        # ML pipeline (preprocess, train, recommend)
├── data/               # Dataset
├── models/             # Trained model artifacts
│
├── frontend/           # React ecommerce UI
│
├── dockerfile          # Backend container
├── docker-compose.yml  # Full stack setup
├── requirements.txt
└── README.md
```

---

## 🏗️ Architecture Diagram

```mermaid
flowchart LR

%% User Layer
A[User / Browser]

%% Frontend
B[React Frontend (Vite)]

%% Backend
C[FastAPI Backend]

%% ML Layer
D[Recommendation Engine]
E[TF-IDF Vectorizer]
F[Hybrid Similarity Model]

%% Data Layer
G[Product Dataset (CSV)]
H[Trained Models (data.pkl, similarity.pkl)]

%% Static Assets
I[Product Images (Static Files)]

%% Flow
A --> B
B -->|API Calls| C

C -->|Fetch Products| H
C -->|Compute Recommendations| D

D --> E
E --> F

F --> H

C --> I

%% Labels
B -. UI Rendering .-> I
```

---

### 🧠 Architecture Overview

The system follows a **layered architecture**:

* **Frontend (React)**
  Handles UI, search, filters, and user interactions

* **Backend (FastAPI)**
  Exposes APIs for:

  * product listing
  * recommendation retrieval

* **Recommendation Engine**
  Computes similarity using:

  * TF-IDF vectorization
  * hybrid scoring (category + rating + price)

* **Static Assets**
  Product images served via FastAPI static routes

---


### ⚡ Key Design Decisions

* Precomputed similarity matrix → fast response time
* Hybrid scoring → better recommendation quality
* Static image serving → consistent UI rendering
* Dockerized services → easy deployment

---


## 📊 Dataset

This project uses a custom retail dataset (Kaggle-inspired).

### Key fields:

* product_id
* product_name
* brand
* category
* sub_category
* price
* rating
* review_count
* tags
* description
* image_url

---

## 🧪 How It Works

1. Load product dataset
2. Preprocess and clean text fields
3. Combine attributes into a single representation
4. Apply TF-IDF vectorization
5. Compute cosine similarity matrix
6. Apply hybrid scoring (category + rating + price)
7. Serve recommendations via API
8. Display results in frontend UI

---

## ▶️ Run Locally

### 1. Setup environment

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

### 2. Train the model

```
python -m recommender.train
```

---

### 3. Start backend

```
python -m uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

---

### 4. Start frontend

```
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

## 🐳 Run with Docker (Recommended)

```
docker compose up --build
```

---

### Access

| Service     | URL                        |
| ----------- | -------------------------- |
| Frontend    | http://localhost:3000      |
| Backend API | http://localhost:8000/docs |

---

## 📌 Example API

```
GET /recommendations/{product_id}
```

Example:

```
{
  "product_id": 1,
  "products": [
    {
      "product_id": 7,
      "product_name": "Almond Snack Pack",
      "category": "Groceries",
      "similarity_score": 0.68
    }
  ]
}
```

---

## 🚧 Current Status

* ✅ Dataset integrated
* ✅ ML pipeline implemented
* ✅ Hybrid recommendation system
* ✅ FastAPI backend running
* ✅ React frontend integrated
* ✅ Product images working
* ✅ Dockerized full-stack setup

---

## 🔐 Security

* Runs on minimal slim base image
* Dockerized isolation
* Reduced attack surface via `.dockerignore`

---

## 🔮 Next Steps

* Personalized recommendations (user behavior)
* Collaborative filtering
* Real-time ranking improvements
* Redis caching
* Elasticsearch search
* Cloud deployment (AWS)
* CI/CD pipeline

---

## 📄 Research Alignment

This project contributes toward research in **AI-based hybrid recommendation systems**, combining:

* content-based filtering
* feature engineering
* ranking optimization
* scalable API systems

It serves as a **baseline production-ready system** for further research expansion.

---

## 👩‍💻 Author

Noopur Bhatt
AI Engineer | Full Stack Developer

---
