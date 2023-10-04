FROM python:3.9-slim

WORKDIR /app

# RUN pip install --upgrade pip
RUN pip install gunicorn==20.1.0 

COPY ./requirements.txt .

RUN pip install -r requirements.txt --no-cache-dir
RUN pip install psycopg2-binary

COPY ./planer/ /app/backend
COPY ./config/ /app/docker

RUN python hard_crutch.py

RUN chmod +x /app/docker/backend-entrypoint.sh
RUN chmod +x /app/docker/beat-entrypoint.sh
RUN chmod +x /app/docker/worker-entrypoint.sh
RUN chmod +x /app/docker/tg-bot-entrypoint.sh
