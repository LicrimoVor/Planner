#!/bin/sh
until cd /app/backend
do
    echo "Waiting for server volume..."
done

until python manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

python manage.py makemigrations
python manage.py migrate --noinput
python manage.py collectstatic --no-input
cp -r /app/backend/collected_static/. /backend_static/static/

gunicorn planer.wsgi --bind 0.0.0.0:8000
# gunicorn backend.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4