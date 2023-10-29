Prvotny setup:

1. vytvor vitrual environment: virtualenv -m venv <path na env>
2. nacitaj environment: source <path na env>/bin/activate
3. nainstaluj package do env: pip install -r requirements.txt


v buducnosti vzdy pri praci s manage.py nacitaj environment so vsetkymi packages

Spustenie serveru:
python manage.py runserver

vycistenie db:
python manage.py flush

v be je docasny endpoint pre seedovanie dat : /seed/

s api sa mozes hrat pomocou postman (https://www.postman.com/) - vies tam vytvarat vsetky druhy requestov, ked si nainstalujes local agenta,
mozes posielat requesty aj na lokalne servery - ked si tam vytvorite ucty, mozem vas pridat do kolekcie, kde mam spravene nejake zakladne requesty,
staci mi napisat

zatial funguju 
/listings/  GET - ziskanie vsetkych listingov
            POST - pridanie listingu
/listing/<id>   GET - ziskanie listingu aj s komentarmi
