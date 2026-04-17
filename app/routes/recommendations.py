from fastapi import APIRouter
import joblib
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
MODELS_DIR = BASE_DIR / "models"

df = joblib.load(MODELS_DIR / "data.pkl")
similarity = joblib.load(MODELS_DIR / "similarity.pkl")


@router.get("/{product_id}")
def get_recommendations(product_id: int, top_k: int = 5):

    # -----------------------------
    # Find product index
    # -----------------------------
    matches = df[df["product_id"].astype(str) == str(product_id)]

    if matches.empty:
        return {"error": "Product not found"}

    idx = matches.index[0]

    # -----------------------------
    # FILTER: same category only
    # -----------------------------
    product_category = df.iloc[idx]["category"]

    same_category_indices = df[df["category"] == product_category].index

    # -----------------------------
    # Get similarity scores
    # -----------------------------
    scores = list(enumerate(similarity[idx]))

    # Keep only same-category products
    scores = [s for s in scores if s[0] in same_category_indices and s[0] != idx]

    # Sort by score
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    top_results = scores[:top_k]

    # -----------------------------
    # Build response
    # -----------------------------
    results = []

    for i, score in top_results:
        product = df.iloc[i].to_dict()

        product["similarity_score"] = float(score)
        product["final_score"] = float(score)

        results.append(product)

    return {"products": results}