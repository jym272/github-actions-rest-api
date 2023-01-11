#!/usr/bin/env bash

set -eou pipefail
#cd .github/actions/deploy-s3-js-action || (echo "deploy-s3-js-action dir does not exists" && exit 1)

# clean install
if [ -f yarn.lock ]; then
  yarn --frozen-lockfile
elif [ -f package-lock.json ]; then
  npm ci
elif [ -f pnpm-lock.yaml ]; then
  yarn global add pnpm && pnpm i --frozen-lockfile
else
  echo "Lockfile not found." && exit 1
fi

# build
npm run build
echo -e "\e[32mBuild action complete.\e[0m"