## Purpose

This is the companion to the awnuxt Nuxt app. "AW NUXT!"

It provides a remote server for the app. 

Upon original setup, this directory lives in the /awnuxt parent directory in a subdirectory called "external_server".

The awnuxt app itself is a separate branch called "awnuxt". It contains the main docker-compose.yml file so the branches start up together.

## After initial pull

Don't forget to include a .env file with the MongoDb connection:

DB_CONNECTION=mongodb://mongo-db:27017/customerDb
