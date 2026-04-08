import joblib

df = joblib.load("models/data.pkl")
similarity = joblib.load("models/similarity.pkl")


def get_recommendations(product_id, top_k=5):
    if product_id not in df["product_id"].values:
        return []

    idx = df[df["product_id"] == product_id].index[0]
    scores = list(enumerate(similarity[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    results = []
    for i, _ in scores[1:top_k+1]:
        results.append(df.iloc[i].to_dict())

    return results