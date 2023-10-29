# ITU project - Zelený Bazár
fakin bazar

# Installation
- `unzip xlogin00_src.zip`
## Backend
- Creating a virtual environment and installing required packages
    - `cd backend`
    - `virtualenv -p python3 venv`
    - `source venv/bin/activate` (to later deactivate the venv, use `deactivate`)
    - `pip install -r requirements.txt`
- Running the local server
    - `python manage.py runserver`
    - Runs at http://localhost:8000
## Frontend
- In another terminal window
    - `cd frontend`
    - `npm install --legacy-peer-deps` (The errors are fine. Trust me.)
    - `npm start`

- The application should run at http://localhost:3000
