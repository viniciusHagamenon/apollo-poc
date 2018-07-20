#!/bin/bash
set -e

yarn config set unsafe-perm true
yarn install

exec "$@"
