#!/bin/sh

set -e

sleep 7


python manage.py migrate --noinput

python ./run_bot.py
