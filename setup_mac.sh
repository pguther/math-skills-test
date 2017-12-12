#!/bin/bash

pip3 install -r requirements.txt
python3 db_create.py
python3 db_migrate.py

