# ITU project - Zelený Bazár
Bazár pre predaj, nákup, a výmenu rastlín

# Inštalácia
- `unzip xlogin00_src.zip`
## Backend
- Vytvorenie venv a inštalácia potrebných modulov
    - `cd backend`
    - `virtualenv -p python3 venv`
    - `source venv/bin/activate`
    - `pip install -r requirements.txt`
- Spustenie lokálneho serveru
    - `python manage.py runserver`
    - Beží na http://localhost:8000
## Frontend
- V inom teminaly
    - `cd frontend`
    - `npm install`
    - `npm start`

- Aplikácia by mala bežať na http://localhost:3000