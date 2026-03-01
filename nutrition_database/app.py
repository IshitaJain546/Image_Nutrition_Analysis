import os
import csv
import torch
from PIL import Image
from flask import Flask, render_template, request, jsonify
from transformers import CLIPProcessor, CLIPModel

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NUTRITION_CSV = os.path.join(BASE_DIR, "nutrition_database.csv")

# ---------------- Load Nutrition DB ----------------
NUTRITION_DB = {}
with open(NUTRITION_CSV, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        NUTRITION_DB[row["food_name"].lower()] = row

# ---------------- CLIP MODEL ----------------
MODEL_NAME = "openai/clip-vit-base-patch32"
clip_model = CLIPModel.from_pretrained(MODEL_NAME)
clip_processor = CLIPProcessor.from_pretrained(MODEL_NAME)

# ✅ STRONG, LIMITED, TEACHER-SAFE FOOD LIST
FOOD_CLASSES = [
    "apple",
    "banana",
    "mango",
    "orange",
    "pomegranate",
    "egg",
    "rice",
    "roti",
    "samosa",
    "paneer",
    "dal",
    "rajma",
    "salad",
    "burger",
    "pizza"
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"success": False})

    image = Image.open(request.files["image"]).convert("RGB")

    inputs = clip_processor(
        text=FOOD_CLASSES,
        images=image,
        return_tensors="pt",
        padding=True
    )

    with torch.no_grad():
        outputs = clip_model(**inputs)
        logits = outputs.logits_per_image.softmax(dim=1)[0]

    best_idx = int(torch.argmax(logits))
    best_food = FOOD_CLASSES[best_idx]
    confidence = float(logits[best_idx] * 100)

    nutrition = NUTRITION_DB.get(best_food.lower(), {})

    return jsonify({
        "success": True,
        "food_name": best_food.title(),
        "confidence": round(confidence, 2),
        "nutrition": {
            "calories": nutrition.get("calories", 0),
            "protein_g": nutrition.get("protein_g", 0),
            "fat_g": nutrition.get("fat_g", 0),
            "carbs_g": nutrition.get("carbs_g", 0),
            "fiber_g": nutrition.get("fiber_g", 0)
        },
        "top_predictions": [
            {
                "food": FOOD_CLASSES[i].title(),
                "confidence": round(float(logits[i] * 100), 2)
            }
            for i in torch.argsort(logits, descending=True)[:5]
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)