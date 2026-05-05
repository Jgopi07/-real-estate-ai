# 🏠 Real Estate Price Predictor (Estatica.AI)

A modern, interactive web application that predicts real estate prices using dataset-driven machine learning logic.

🌐 **Live Demo:**  
https://jgopi07.github.io/-real-estate-ai/

---

## 🚀 Features

- 📊 Dataset-based price prediction (simulating Random Forest logic)
- 🎯 Confidence score based on similar properties
- 📈 Interactive price trend graph
- 🧠 AI-powered explanation of prediction
- 🔍 Feature importance visualization
- ⚡ Smooth UI with animations (Framer Motion)
- 🎨 Modern glassmorphism + gradient design
- 📱 Fully responsive design

---

## 🧠 How It Works

The app predicts property prices using:

- Similar property matching from dataset
- Weighted feature contribution:
  - Area
  - Bedrooms
  - Bathrooms
  - Parking
- Dynamic confidence calculation based on:
  - Number of similar properties found

> Inspired by Random Forest regression logic (frontend simulation)

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Framer Motion
- Recharts

**Data Handling**
- CSV dataset (local)
- Custom similarity algorithm

---

## 📂 Project Structure
<img width="998" height="704" alt="image" src="https://github.com/user-attachments/assets/4177cbf3-89c3-455c-bcae-5eab947a3509" />


---

## ⚙️ Installation (Run Locally)

```bash
git clone https://github.com/Jgopi07/-real-estate-ai.git
cd frontend
npm install
npm run dev

## ⚙️ Deployment
npm run deploy


📊 Example Output
Predicted Price: ₹54,20,000
Confidence: 82%
Similar Homes: 18
✨ Future Improvements
🔗 Connect real ML backend (Flask + model.pkl)
🌍 Add location-based prediction
💾 Save prediction history
📉 Add price range (min-max prediction)
🧾 Export results as PDF
👨‍💻 Author

Gopi
GitHub: https://github.com/Jgopi07

OUTPUT:
<img width="1919" height="961" alt="image" src="https://github.com/user-attachments/assets/e79ce3c7-8eb2-4879-9a0e-31e487421ea6" />
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/007f9270-2864-44f8-a2e1-9b69fb406078" />
<img width="1919" height="959" alt="image" src="https://github.com/user-attachments/assets/cd391a90-dac3-4d3c-9972-2eddd5eae66d" />

📌 Note

This project simulates machine learning logic on the frontend for fast and interactive predictions.
It is designed for learning and demonstration purposes.
