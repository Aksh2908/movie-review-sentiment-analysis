import pandas as pd
from sklearn.model_selection import train_test_split
import os

# Paths
RAW_DATA_PATH = '../data/raw/IMDB Dataset.csv'
PROCESSED_DIR = '../data/processed/'

# Load dataset
df = pd.read_csv(RAW_DATA_PATH)

# Shuffle and split
text_df, audio_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['sentiment'])

# Ensure output directory exists
os.makedirs(PROCESSED_DIR, exist_ok=True)

# Save splits
text_df.to_csv(os.path.join(PROCESSED_DIR, 'text_reviews.csv'), index=False)
audio_df.to_csv(os.path.join(PROCESSED_DIR, 'audio_reviews.csv'), index=False)

print(f"Text reviews: {len(text_df)} rows")
print(f"Audio reviews: {len(audio_df)} rows")
