# 🍽️ FoodLens – Image-Based Food Recognition & Nutrition Analysis
### Academic Project

---

## 📌 Project Overview

FoodLens is a **Flask-based web application** that detects a **limited set of common foods** from an uploaded image and displays their **nutritional values per 100 grams**.

This project is developed **strictly for academic demonstration**, focusing on **end-to-end integration** of:
- Frontend
- Backend
- Machine Learning
- Nutrition Database

---

## ✅ What This Project Actually Does (Honest Version)

- Upload a food image through a web interface
- The system predicts **one supported food category**
- Displays:
  - Food name
  - Prediction confidence
  - Calories, protein, fat, carbs, fiber (per 100g)
- Shows **alternative predictions** (if applicable)

⚠️ **Important:**  
This is **NOT** a general-purpose food recognition system.  
It works **only for a fixed, curated list of foods** to ensure stable demo results.

---

## 🗂️ Project Structure

```text
files/
├── app.py                     # Flask backend (main server)
├── class_labels.json           # Index → food name mapping
├── nutrition_database.csv      # Nutrition values per 100g
├── train_model.py              # Model training (optional / experimental)
├── requirements.txt
├── README.md

├── templates/
│   └── index.html              # Frontend HTML

├── static/
│   ├── css/
│   │   └── style.css           # UI styling
│   └── js/
│       └── app.js              # Frontend logic
```

## ⚙️ Tech Stack

### Backend
- Python 3.11
- Flask
- TensorFlow / Keras

### Machine Learning Model
- MobileNetV2 (pretrained on ImageNet)
- Used as a **feature extractor**
- Lightweight classification layer on top
- Optimized for **demo stability**, not research accuracy

### Frontend
- HTML
- CSS
- Vanilla JavaScript (no frameworks)

### Nutrition Database
- CSV-based database
- Values are **per 100 grams**

**Fields:**
```text
food_name, calories, protein_g, fat_g, carbs_g, fiber_g
```

---

 How to Run Locally - 
1️⃣ Activate Virtual Environment
.\venv\Scripts\activate
2️⃣ Install Dependencies
pip install -r requirements.txt
3️⃣ Start the Server
python app.py
4️⃣ Open in Browser
http://127.0.0.1:5000


📊 Example Output
Input: Image of Samosa

Output:
Food: Samosa
Confidence: ~95–99%
Calories: 308 kcal
Protein: 6.5 g
Fat: 16 g
Carbs: 38 g
Fiber: 3.5 g
All values are per 100g
