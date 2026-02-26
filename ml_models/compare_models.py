
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import VGG16, InceptionResNetV2
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
import os

def build_custom_dcnn(num_classes=38):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def build_vgg16_tl(num_classes=38):
    base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False
    x = layers.GlobalAveragePooling2D()(base_model.output)
    x = layers.Dense(256, activation='relu')(x)
    output = layers.Dense(num_classes, activation='softmax')(x)
    return models.Model(base_model.input, output)

def generate_evaluation_report(model_names, accuracies, precisions, recalls, f1_scores):
    """Generates a comparison CSV and plots."""
    data = {
        'Model': model_names,
        'Accuracy': accuracies,
        'Precision': precisions,
        'Recall': recalls,
        'F1 Score': f1_scores
    }
    df = pd.DataFrame(data)
    os.makedirs("reports", exist_ok=True)
    df.to_csv("reports/model_comparison.csv", index=False)
    
    # Plotting
    plt.figure(figsize=(10, 6))
    sns.barplot(x='Model', y='Accuracy', data=df)
    plt.title('Model Accuracy Comparison')
    plt.savefig('reports/accuracy_comparison.png')
    print("Evaluation report generated in /reports folder.")

if __name__ == "__main__":
    # Mock data for demonstration as training 6 models requires GPU/Time
    model_names = ['Custom DCNN', 'BPCNN-9', 'VGG16', 'Inception-ResNet-V2', 'Xception', 'ResNet50+SVM']
    accuracies = [0.82, 0.85, 0.88, 0.92, 0.95, 0.93]
    precisions = [0.81, 0.84, 0.87, 0.91, 0.94, 0.92]
    recalls = [0.80, 0.83, 0.86, 0.90, 0.95, 0.91]
    f1s = [0.80, 0.83, 0.86, 0.90, 0.94, 0.91]
    
    generate_evaluation_report(model_names, accuracies, precisions, recalls, f1s)
