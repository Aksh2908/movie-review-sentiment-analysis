import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
import re

# Paths (relative to scripts/)
DATA_PATH = '../data/processed/text_reviews.csv'
MODEL_DIR = '../backend'
MODEL_PATH = os.path.join(MODEL_DIR, 'model.pkl')
VECTORIZER_PATH = os.path.join(MODEL_DIR, 'vectorizer.pkl')

# Ensure backend directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# 1. Load data
df = pd.read_csv(DATA_PATH)

# 2. Basic text cleaning function
def clean_text(text):
    text = str(text)
    text = re.sub(r'<.*?>', '', text)        # Remove HTML tags
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove non-alphabetic chars
    text = text.lower().strip()              # Lowercase and trim
    return text

df['clean_review'] = df['review'].apply(clean_text)

# 3. Split data
X_train, X_test, y_train, y_test = train_test_split(
    df['clean_review'], df['sentiment'],
    test_size=0.2, random_state=42, stratify=df['sentiment']
)

# 4. Vectorize text
vectorizer = TfidfVectorizer(max_features=10000, stop_words='english')
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 5. Train classifier
model = LogisticRegression(max_iter=200, solver='liblinear')
model.fit(X_train_vec, y_train)

# 6. Evaluate
y_pred = model.predict(X_test_vec)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# 7. Save model and vectorizer
joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)
print(f"Model saved to {MODEL_PATH}")
print(f"Vectorizer saved to {VECTORIZER_PATH}")
