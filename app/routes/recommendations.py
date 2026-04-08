from fastapi import APIRouter, HTTPException
from recommender.recommend import get_recommendations

router = APIRouter()


@router.get("/{product_id}")
def recommend(product_id: int, top_k: int = 5):
    results = get_recommendations(product_id, top_k)

    if not results:
        raise HTTPException(
            status_code=404,
            detail="Product not found or model not trained yet."
        )

    return {
        "product_id": product_id,
        "recommendations": results
    }