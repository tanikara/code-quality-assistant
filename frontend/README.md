Code Quality Assistant
Ένα API και Web App για την ανάλυση ποιότητας κώδικα σε Python & JavaScript

 Περιγραφή:
Το Code Quality Assistant είναι ένα εργαλείο ανάλυσης κώδικα που επιτρέπει στον χρήστη να υποβάλει Python ή JavaScript κώδικα και να λαμβάνει ανατροφοδότηση σχετικά με πιθανά σφάλματα και βελτιώσεις.

Χρησιμοποιεί pylint για Python και ESLint για JavaScript
Παρέχει καθαρό JSON output με αναφορά σφαλμάτων
Έχει React frontend για εύκολη αλληλεπίδραση

Τεχνολογίες που χρησιμοποιούνται
Backend: FastAPI (Python), pylint, ESLint
Frontend: React (JavaScript), Fetch API


Cloning του repository

git clone https://github.com/your-username/code-quality-assistant.git
cd code-quality-assistant

Εγκατάσταση εξαρτήσεων
python3 -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt

Frontend (React)
cd frontend
npm install

Εκκίνηση του Project
Εκκίνηση του Backend (FastAPI)
uvicorn main:app --reload

Το API τρέχει στο http://127.0.0.1:8000
διαφορετικά μέσω Swagger UI: http://127.0.0.1:8000/docs

Εκκίνηση του Frontend (React)
cd frontend
npm start
Το Web App τρέχει στο http://localhost:3000/

Χαρακτηριστικά
-Υποστηριζόμενες Γλώσσες: Python, JavaScript
-ύχρηστο UI με React
-Πλήρως RESTful API
-JSON Output για εύκολη ανάλυση αποτελεσμάτων

