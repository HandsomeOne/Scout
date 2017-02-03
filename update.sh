#!/bin/sh
git pull --force

yarn
yarn build-sh
forever restart ./server
