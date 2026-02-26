
import tensorflow as tf
from tensorflow.keras.applications import Xception
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import os

def build_xception_model(num_classes=38):
    base_model = Xception(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    # Initially freeze base model layers
    for layer in base_model.layers:
        layer.trainable = False
        
    model.compile(optimizer=Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])
    return model

if __name__ == "__main__":
    # This script would be used in the training pipeline
    model = build_xception_model()
    model.summary()
    # Save a placeholder model if it doesn't exist for the API to run
    if not os.path.exists("ml_models"):
        os.makedirs("ml_models")
    model_path = os.path.join("ml_models", "xception_plant_model.h5")
    if not os.path.exists(model_path):
        model.save(model_path)
        print(f"Placeholder model saved to {model_path}")
