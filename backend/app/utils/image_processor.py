
import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes, target_size=(224, 224)):
    """Preprocess image for model inference."""
    image = Image.open(io.BytesIO(image_bytes))
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0  # Normalize to [0, 1]
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def format_confidence(score):
    """Format confidence score to percentage string."""
    return f"{score * 100:.2f}%"
