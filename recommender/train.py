from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib

from recommender.data_loader import load_data
from recommender.preprocess import preprocess
from recommender.features import build_text


def train():
    df = load_data()
    df = preprocess(df)

    text = build_text(df)

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(text)

    similarity = cosine_similarity(matrix)

    joblib.dump(vectorizer, "models/vectorizer.pkl")
    joblib.dump(similarity, "models/similarity.pkl")
    joblib.dump(df, "models/data.pkl")

    print("Model trained!")


if __name__ == "__main__":
    train()