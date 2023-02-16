#!/bin/bash

# TODO(Fran): Add some ascii title?
# TODO(Fran): Ask and explain why auth token is needed beforehand

echo 'First time here?'

# Put user auth token in env file
read -p 'AUTH_TOKEN=' token
echo AUTH_TOKEN=$token > .env
