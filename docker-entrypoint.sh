#!/bin/sh
set -e

if [ -z "$API_HOST" ]; then
  echo "ERROR: API_HOST environment variable is required but not set."
  echo "Example: docker run -e API_HOST=https://your-api.com this-image"
  exit 1
fi

envsubst '${API_HOST}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g "daemon off;"
