import pandas as pd
from gtts import gTTS
import os
from tqdm import tqdm

# Paths
AUDIO_CSV = '../data/processed/audio_reviews.csv'
AUDIO_DIR = '../data/audio/'
MAX_TTS_LENGTH = 5000  # gTTS limit

# Load reviews
df = pd.read_csv(AUDIO_CSV)

# Ensure audio directory exists
os.makedirs(AUDIO_DIR, exist_ok=True)

# Add 'audio_file' column if not present
if 'audio_file' not in df.columns:
    df['audio_file'] = None

for idx, row in tqdm(df.iterrows(), total=df.shape[0], desc="Generating audio"):
    text = str(row['review'])
    sentiment = str(row['sentiment'])
    filename = f"review_{idx}_{sentiment}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    # Skip if file already exists and entry is recorded
    if pd.notna(row.get('audio_file')) and os.path.exists(filepath):
        continue

    # Truncate text if too long for gTTS
    if len(text) > MAX_TTS_LENGTH:
        text = text[:MAX_TTS_LENGTH]

    try:
        tts = gTTS(text)
        tts.save(filepath)
        df.at[idx, 'audio_file'] = filename
    except Exception as e:
        print(f"Error at index {idx}: {e}")
        df.at[idx, 'audio_file'] = None

# Save updated CSV with audio file names
df.to_csv(AUDIO_CSV, index=False)
print(f"\nGenerated audio files saved in {AUDIO_DIR}")
