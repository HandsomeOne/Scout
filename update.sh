#!/bin/sh
git pull --force

yarn
yarn build
forever restart ./server
