from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json

# Load model and questions only once
model = SentenceTransformer('all-MiniLM-L6-v2')

with open('faqs.json', 'r', encoding='utf-8') as f:
    faqs = json.load(f)

questions = [item['question'] for item in faqs]
question_embeddings = model.encode(questions)

def find_best_matches(user_question, top_n=3, threshold=0.55):
    print(f"\n[INPUT] User asked: {user_question}")

    user_embedding = model.encode([user_question])
    similarities = cosine_similarity(user_embedding, question_embeddings)[0]

    top_indices = similarities.argsort()[-top_n:][::-1]

    results = []
    for idx in top_indices:
        score = float(similarities[idx])
        print(f"[ML] Match: {faqs[idx]['question']} | Score: {score}")
        if score >= threshold:
            results.append({
                "question": faqs[idx]["question"],
                "answer": faqs[idx]["answer"],
                "score": score
            })

    if results:
        return results

    # 🔁 Fallback with difflib
    print("[ML] No confident match found. Trying fallback...")
    from difflib import get_close_matches
    fallback_qs = get_close_matches(user_question, questions, n=1, cutoff=0.4)
    print("[Fallback candidates]:", fallback_qs)

    if fallback_qs:
        fallback_index = questions.index(fallback_qs[0])
        print(f"[Fallback MATCH]: {faqs[fallback_index]['question']}")
        return [{
            "question": faqs[fallback_index]["question"],
            "answer": faqs[fallback_index]["answer"],
            "score": 0.4
        }]

    print("[Fallback] No good match found either.")
    return []