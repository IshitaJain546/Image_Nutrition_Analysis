🍽️ FoodLens
Image-Based Food Recognition & Nutrition Analysis (Academic Project)

FoodLens is a Flask-based web application that detects a limited set of common foods from an uploaded image and displays their nutritional values per 100g.
The project is designed for academic demonstration, focusing on end-to-end integration of frontend, backend, machine learning, and a nutrition database.

✅ What This Project Actually Does (Honest Version)

Upload a food image through a web interface

The system predicts one of the supported food categories

Displays:

Food name

Prediction confidence

Calories, protein, fat, carbs, fiber (per 100g)

Shows alternative predictions (if applicable)

⚠️ This is not a general-purpose food recognizer.
It works only for a fixed, curated list of foods chosen to give stable demo results.

🗂️ Project Structure (Actual)
files/
├── app.py                  # Flask backend (main server)
├── class_labels.json       # Index → food name mapping
├── nutrition_database.csv  # Nutrition values per 100g
├── train_model.py          # Model training (optional / experimental)
├── requirements.txt
├── README.md

├── templates/
│   └── index.html          # Frontend HTML

├── static/
│   ├── css/
│   │   └── style.css       # UI styling
│   └── js/
│       └── app.js          # Frontend logic

└── venv/                   # Python virtual environment
⚙️ Tech Stack Used
Backend

Python 3.11

Flask

TensorFlow / Keras

Model

MobileNetV2 (pretrained on ImageNet)

Used as a feature extractor

Lightweight classification logic on top

Optimized for demo stability, not research accuracy

Frontend

HTML

CSS

Vanilla JavaScript (no frameworks)

Database

CSV-based nutrition database

Values are per 100 grams

Fields:

food_name, calories, protein_g, fat_g, carbs_g, fiber_g
🚀 How to Run Locally
1️⃣ Activate Virtual Environment
.\venv\Scripts\activate
2️⃣ Install Dependencies
pip install -r requirements.txt
3️⃣ Start Server
python app.py
4️⃣ Open Browser
http://127.0.0.1:5000
📊 Example Output

Input: Image of samosa
Output:

Food: Samosa

Confidence: ~95–99%

Calories: 308 kcal

Protein: 6.5 g

Fat: 16 g

Carbs: 38 g

Fiber: 3.5 g

(All values are per 100g)

⚠️ Known Limitations (Important for Viva / Teacher)

❌ Does not recognize unlimited food types

❌ No portion-size estimation

❌ Nutrition values are averages, not brand-specific

❌ Not suitable for medical or diet planning

✔ Designed as an academic prototype, not a commercial app.

🌐 Free Deployment (2GB Friendly)

Because the project contains large ML dependencies, best free options are:

✅ Recommended

Hugging Face Spaces (Docker / Gradio)

Railway (with GitHub integration)

❌ Not recommended:

GitHub Pages (no backend)

Netlify (no Python ML support)

Vercel (serverless limits)

🎯 Why This Project Is Strong Academically

Full-stack integration (Frontend + Backend + ML)

Practical ML usage (not just theory)

Clear scope & constraints

Honest results (no fake AI claims)

Real-world nutrition data

Clean UI and working demo

📌 Future Improvements (Optional Discussion Points)

Train a custom CNN with Indian food dataset

Add portion size estimation

Add user login & history

Convert to mobile app

Improve confidence calibration

📜 Disclaimer

This project is created strictly for educational purposes.
Nutrition values are approximate and should not be used for medical or dietary decisions.
