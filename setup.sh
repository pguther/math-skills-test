#!/bin/bash

virtualenv flask
flask/bin/pip3 install -r requirements.txt
flask/bin/python3 db_create.py
flask/bin/python3 db_migrate.py

