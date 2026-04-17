import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
from pathlib import Path

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "data" / "products.csv"
MODELS_DIR = BASE_DIR / "models"

MODELS_DIR.mkdir(exist_ok=True)

print(f"📂 Loading dataset from: {DATA_FILE}")

# -----------------------------
# Load dataset
# -----------------------------
if not DATA_FILE.exists():
    raise FileNotFoundError(f"❌ Dataset not found at {DATA_FILE}")

df = pd.read_csv(DATA_FILE)

# -----------------------------
# Clean data
# -----------------------------
df = df.fillna("")

# Ensure correct types
df["price"] = pd.to_numeric(df["price"], errors="coerce").fillna(0)
df["rating"] = pd.to_numeric(df["rating"], errors="coerce").fillna(0)

# -----------------------------
# Create combined text
# -----------------------------
df["combined"] = (
    df["product_name"].astype(str) + " " +
    df["category"].astype(str) + " " +
    df["sub_category"].astype(str) + " " +
    df["brand"].astype(str) + " " +
    df["tags"].astype(str) + " " +
    df["description"].astype(str)
)

print("🧠 Creating TF-IDF vectors...")

# -----------------------------
# TF-IDF Vectorization
# -----------------------------
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["combined"])

# -----------------------------
# Base similarity (text)
# -----------------------------
text_similarity = cosine_similarity(tfidf_matrix)

print("⚙️ Building hybrid similarity...")

# -----------------------------
# Hybrid Features
# -----------------------------

# Normalize rating
df["rating_norm"] = df["rating"] / 5.0

# Normalize price (lower price = better)
max_price = df["price"].max() if df["price"].max() > 0 else 1
df["price_norm"] = 1 - (df["price"] / max_price)

# Category similarity (fixed)
category_values = df["category"].to_numpy()

category_matrix = (
    category_values[:, None] ==
    category_values[None, :]
).astype(int)

# -----------------------------
# Final Hybrid Similarity
# -----------------------------
hybrid_similarity = (
    0.6 * text_similarity +
    0.2 * category_matrix +
    0.1 * np.outer(df["rating_norm"], df["rating_norm"]) +
    0.1 * np.outer(df["price_norm"], df["price_norm"])
)

print("💾 Saving models...")

# -----------------------------
# Save models
# -----------------------------
joblib.dump(df, MODELS_DIR / "data.pkl")
joblib.dump(hybrid_similarity, MODELS_DIR / "similarity.pkl")

print("✅ Training complete!")
print(f"📦 Saved data.pkl and similarity.pkl in {MODELS_DIR}")
print(f"📊 Total products: {len(df)}")