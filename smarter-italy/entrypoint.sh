#!/bin/bash

cd /app
gatsby build
#gatsby serve -H 0.0.0.0 -p 8080 &
cd /
python3 flask_run.py &
rm -r /var/www/html
ln -s /app/public /var/www/html
exec nginx -g 'daemon off;' "$@"
