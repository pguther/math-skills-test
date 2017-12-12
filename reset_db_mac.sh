rm app.db
rm -r db_repository
rm -r __pycache__

python3 db_create.py
python3 db_migrate.py
