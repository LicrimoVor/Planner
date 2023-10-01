#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done

celery -A planer_worker beat -l INFO
