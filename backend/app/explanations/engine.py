
PLANT_CLASSES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_", 
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot", 
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight", 
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", 
    "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

EXPLANATIONS = {
    "Apple___Apple_scab": {
        "cause": "Fungus (Venturia inaequalis)",
        "category": "Fungal",
        "symptoms": "Olive-green to black spots on leaves and fruit, often appearing velvety.",
        "scientific_reason": "The fungus overwinters in fallen leaves and infects new growth during wet spring weather.",
        "precaution": "Remove fallen leaves in autumn; prune trees to improve air circulation.",
        "recommended_action": "Apply fungicides like Myclobutanil or Captan during the early growing season.",
        "nutrient_correction": "Ensure balanced Nitrogen levels; excessive Nitrogen can promote susceptible flush growth."
    },
    "Apple___Black_rot": {
        "cause": "Fungus (Botryosphaeria obtusa)",
        "category": "Fungal",
        "symptoms": "Reddish-brown spots on leaves (frogeye leaf spot), cankers on limbs, and firm rot on fruit.",
        "scientific_reason": "Infection often occurs through wounds in the bark or fruit, spreading via rain-splashed spores.",
        "precaution": "Prune out dead wood and remove mummified fruit from trees and ground.",
        "recommended_action": "Apply fungicides during petal fall and throughout the summer.",
        "nutrient_correction": "Maintain adequate Potassium levels to improve wood strength and disease resistance."
    },
    "Apple___Cedar_apple_rust": {
        "cause": "Fungus (Gymnosporangium juniperi-virginianae)",
        "category": "Fungal",
        "symptoms": "Bright orange-yellow spots on the upper surface of leaves.",
        "scientific_reason": "Requires two hosts (apple and cedar) to complete its life cycle.",
        "precaution": "Remove nearby cedar trees if possible; plant resistant apple varieties.",
        "recommended_action": "Apply preventative fungicides when cedar galls are active (orange gelatinous horns).",
        "nutrient_correction": "General balanced fertilization to reduce plant stress."
    },
    "Tomato___Bacterial_spot": {
        "cause": "Bacteria (Xanthomonas)",
        "category": "Bacterial",
        "symptoms": "Small, water-soaked spots on leaves and fruit, becoming dark and crusty.",
        "scientific_reason": "Spread by rain-splash and overhead irrigation; thrives in warm, humid conditions.",
        "precaution": "Use certified disease-free seeds; avoid overhead watering.",
        "recommended_action": "Apply copper-based bactericides early in the season.",
        "nutrient_correction": "Ensure adequate Calcium to strengthen cell walls against bacterial invasion."
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "cause": "Begomovirus",
        "category": "Viral",
        "symptoms": "Upward curling of leaves, yellowing of leaf margins, and stunted growth.",
        "scientific_reason": "Transmitted by Whiteflies (Bemisia tabaci).",
        "precaution": "Use insect nets in greenhouses; control whitefly population.",
        "recommended_action": "Remove infected plants immediately to prevent spread; use yellow sticky traps for monitoring.",
        "nutrient_correction": "Zinc and Magnesium supplements can help the plant recover from viral stress symptoms."
    },
    "Corn_(maize)___Common_rust_": {
        "cause": "Fungus (Puccinia sorghi)",
        "category": "Fungal",
        "symptoms": "Cinnamon-brown pustules on both upper and lower leaf surfaces.",
        "scientific_reason": "Spores are wind-blown from southern regions or overwintered debris.",
        "precaution": "Plant resistant hybrids; manage crop residue.",
        "recommended_action": "Typically doesn't require treatment unless infection is severe and occurs early.",
        "nutrient_correction": "Balanced Nitrogen/Potassium ratio is essential for stalk strength and immunity."
    },
    "Potato___Late_blight": {
        "cause": "Oomycete (Phytophthora infestans)",
        "category": "Fungal",
        "symptoms": "Dark, water-soaked patches on leaves that turn brown/black; white mold on underside.",
        "scientific_reason": "The pathogen that caused the Irish Potato Famine; spreads rapidly in cool, wet weather.",
        "precaution": "Destroy cull piles; use resistant varieties; ensure good hilling of tubers.",
        "recommended_action": "Weekly fungicide applications (e.g., Mancozeb) during high-risk periods.",
        "nutrient_correction": "Avoid excessive Nitrogen which creates a dense canopy trapping moisture."
    },
    "Grape___Black_rot": {
        "cause": "Fungus (Guignardia bidwellii)",
        "category": "Fungal",
        "symptoms": "Brown circular spots on leaves; berries shrivel into hard, black mummies.",
        "scientific_reason": "Spores overwinter in mummified berries and infect new shoots in the spring.",
        "precaution": "Sanitation is key; remove all mummified fruit; prune for airflow.",
        "recommended_action": "Timed fungicide applications from early bloom until berries reach 6mm.",
        "nutrient_correction": "Boron deficiency can sometimes mimic early fruit damage; ensure trace mineral balance."
    }
}

# Healthy definitions
for plant in PLANT_CLASSES:
    if "healthy" in plant:
        name = plant.split("___")[0].replace("_", " ")
        EXPLANATIONS[plant] = {
            "cause": "None",
            "category": "Healthy",
            "symptoms": "Green, vibrant leaves with no visible spots or discoloration.",
            "scientific_reason": "The plant is receiving optimal nutrients and is free from pathogens.",
            "precaution": "Maintain regular watering and fertilization schedule.",
            "recommended_action": "Continue current cultivation practices; monitor for early signs of pests.",
            "nutrient_correction": "Maintain current nutrient balance."
        }

# Fill in missing explanations with generic templates to ensure no crashes
DEFAULT_EXPLANATION = {
    "cause": "Pathogen/Environmental Stress",
    "category": "To be determined",
    "symptoms": "Visible discoloration or damage on leaf surface.",
    "scientific_reason": "The plant is reacting to external stress or biological infection.",
    "precaution": "Isolate the plant, avoid water-to-leaf contact.",
    "recommended_action": "Consult a local agricultural expert; consider organic neem oil spray.",
    "nutrient_correction": "Check N-P-K levels in soil."
}

for plant in PLANT_CLASSES:
    if plant not in EXPLANATIONS:
        EXPLANATIONS[plant] = DEFAULT_EXPLANATION.copy()
        disease_name = plant.split("___")[1].replace("_", " ")
        EXPLANATIONS[plant]["symptoms"] = f"Symptoms characteristic of {disease_name} observed on leaves."
