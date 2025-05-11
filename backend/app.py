from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import os
import speech_recognition as sr
from pydub import AudioSegment
import io

app = Flask(__name__)
CORS(app)

# In-memory storage for demonstration
reviews = [
    {"id": 1, "review": "This movie was fantastic!", "sentiment": "positive", "type": "text"},
    {"id": 2, "review": "I did not like this movie.", "sentiment": "negative", "type": "text"},
]

MODEL_PATH = 'model.pkl'
VECTORIZER_PATH = 'vectorizer.pkl'

# Load model and vectorizer if present
if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
else:
    model = None
    vectorizer = None

@app.route('/')
def home():
    return jsonify({"message": "Movie Review Sentiment API is running"}), 200

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    return jsonify(reviews), 200

@app.route('/api/reviews', methods=['POST'])
def add_review():
    """Add a text review and predict sentiment."""
    data = request.get_json()
    if not data or 'review' not in data:
        return jsonify({"error": "Review text is required"}), 400

    review_text = data['review'].strip()
    if not review_text:
        return jsonify({"error": "Review text cannot be empty"}), 400

    sentiment = "unknown"
    if model and vectorizer:
        try:
            X = vectorizer.transform([review_text])
            sentiment = model.predict(X)[0]
        except Exception as e:
            return jsonify({"error": f"Sentiment prediction failed: {str(e)}"}), 500

    new_id = reviews[-1]['id'] + 1 if reviews else 1
    new_review = {
        "id": new_id,
        "review": review_text,
        "sentiment": sentiment,
        "type": "text"
    }
    reviews.append(new_review)
    return jsonify(new_review), 201

@app.route('/api/reviews/audio', methods=['POST'])
def analyze_audio_review():
    """Analyze an audio (.mp3) review: transcribe and predict sentiment."""
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    audio_file = request.files['audio']
    if not audio_file.filename.lower().endswith('.mp3'):
        return jsonify({"error": "Only .mp3 files are supported"}), 400

    try:
        # Convert MP3 to WAV in memory
        audio = AudioSegment.from_file(audio_file, format="mp3")
        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        recognizer = sr.Recognizer()
        with sr.AudioFile(wav_io) as source:
            audio_data = recognizer.record(source)
            try:
                transcription = recognizer.recognize_google(audio_data)
            except sr.UnknownValueError:
                return jsonify({"error": "Could not transcribe audio"}), 400
            except sr.RequestError:
                return jsonify({"error": "Speech recognition service error"}), 500

        if not transcription.strip():
            return jsonify({"error": "Transcription is empty."}), 400

        # Predict sentiment
        sentiment = "unknown"
        if model and vectorizer:
            try:
                X = vectorizer.transform([transcription])
                sentiment = model.predict(X)[0]
            except Exception as e:
                return jsonify({"error": f"Sentiment prediction failed: {str(e)}"}), 500

        # Save review as audio type
        new_id = reviews[-1]['id'] + 1 if reviews else 1
        new_review = {
            "id": new_id,
            "review": transcription,
            "sentiment": sentiment,
            "type": "audio"
        }
        reviews.append(new_review)

        return jsonify({
            "transcription": transcription,
            "sentiment": sentiment
        }), 200

    except Exception as e:
        return jsonify({"error": f"Audio processing failed: {str(e)}"}), 500

@app.route('/api/reset', methods=['POST'])
def reset_reviews():
    """Reset all reviews (for stats reset)."""
    global reviews
    reviews = []
    return jsonify({"message": "All reviews have been reset."}), 200

if __name__ == '__main__':
    app.run(debug=True)
