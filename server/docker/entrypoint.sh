#!/bin/bash
set -e

yarn config set unsafe-perm true
yarn install

until curl -f ${PRISMA_ENDPOINT}; do
  >&2 echo "Prisma is unavailable - sleeping"
  sleep 1
done

yarn prisma deploy -i

exec "$@"
