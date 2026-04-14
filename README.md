
---

# 🚀 retail-recommendation-engine

A production-inspired **retail recommendation system** built using a custom product catalog dataset.
This project demonstrates how to transform product metadata into **real-time recommendations** using a scalable backend architecture.

---

## 🧠 Overview

This system generates product recommendations based on **content similarity** across product attributes such as:

* product name
* brand
* category
* sub-category
* tags
* description

It uses a machine learning pipeline with **TF-IDF vectorization** and **cosine similarity** to identify similar products.

---

## ⚙️ Features

* 📊 Content-based recommendation engine
* ⚡ FastAPI backend for real-time recommendations
* 🧠 ML pipeline (preprocessing → feature engineering → similarity model)
* 🔍 Product-to-product recommendation API
* 🧱 Modular and extensible architecture

---

## 🗂️ Project Structure

```
retail-recommendation-engine/
│
├── app/                # FastAPI application
├── recommender/        # ML pipeline (preprocess, train, recommend)
├── data/raw/           # Dataset (not committed)
├── models/             # Trained model artifacts (not committed)
├── tests/              # Basic tests
├── requirements.txt
└── README.md
```

---

## 📊 Dataset

This project uses a custom retail dataset from Kaggle:

Retail Product Catalog Dataset (by Noopur Bhatt)

Sample columns:

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

---

## 🧪 How It Works

1. Load product dataset
2. Preprocess and clean text fields
3. Combine product attributes into a single text representation
4. Apply TF-IDF vectorization
5. Compute cosine similarity matrix
6. Retrieve top-N similar products

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

### 3. Start API

```
python -m uvicorn app.main:app --reload
```

---

### 4. Test API

Open:

```
http://127.0.0.1:8000/docs
```

Example endpoint:

```
GET /recommendations/1
```

---

## 📌 Example Output

```
{
  "product_id": 1,
  "recommendations": [
    {
      "product_id": 7,
      "product_name": "Almond Snack Pack",
      "category": "Groceries"
    }
  ]
}
```

---

## 🚧 Current Status

* Dataset integrated
* Model training pipeline implemented
* FastAPI recommendation service running
* End-to-end working system

---

## 🔐 Security

- Runs as non-root user
- Uses minimal slim base image
- Reduced attack surface with dockerignore
- Docker Scout compliant


---

## 🔮 Next Steps

* Improve ranking logic (category + brand + rating signals)
* Add hybrid recommendation system (ML + DL)
* Introduce user personalization layer
* Build React frontend
* Align with research paper architecture

---

## 📄 Research Alignment

This project is part of a broader research effort on **AI-based hybrid recommendation systems**, combining:

* machine learning models
* deep learning architectures
* feature engineering pipelines
* ranking optimization

The current implementation represents the **baseline system**, which will be extended into a hybrid model.

---

## 👩‍💻 Author

Noopur Bhatt
AI Engineer | Full Stack Developer

---
