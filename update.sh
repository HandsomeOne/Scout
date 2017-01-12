#!/bin/sh

git reset --hard
git pull

yarn
yarn build-sh
forever restart ./server
