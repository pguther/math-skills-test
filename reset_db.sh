rm app.db
rm -r db_repository
rm -r __pycache__

flask/bin/python3 db_create.py
flask/bin/python3 db_migrate.py
