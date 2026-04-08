from fastapi import FastAPI
from app.routes.health import router as health_router
from app.routes.recommendations import router as rec_router

app = FastAPI(title="Retail Recommendation Engine")

app.include_router(health_router)
app.include_router(rec_router, prefix="/recommendations")


@app.get("/")
def root():
    return {"message": "API is running"}