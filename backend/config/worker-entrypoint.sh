#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done

sleep 5

celery -A planer worker -l INFO
