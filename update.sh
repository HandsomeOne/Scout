#!/bin/sh
git pull --force
npm install
npm run build
forever restart ./server
