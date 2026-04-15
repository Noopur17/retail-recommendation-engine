from fastapi import APIRouter
import joblib
from pathlib import Path

router = APIRouter()

MODELS_DIR = Path("models")
DATA_PATH = MODELS_DIR / "data.pkl"


@router.get("/products")
def get_products(limit: int = 50):
    if not DATA_PATH.exists():
        return {"products": []}

    df = joblib.load(DATA_PATH)

    products = df.head(limit).fillna("").to_dict(orient="records")
    return {"products": products}