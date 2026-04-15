from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.health import router as health_router
from app.routes.recommendations import router as rec_router
from app.routes.products import router as products_router

app = FastAPI(title="Retail Recommendation Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(rec_router, prefix="/recommendations")
app.include_router(products_router)


@app.get("/")
def root():
    return {"message": "API is running"}