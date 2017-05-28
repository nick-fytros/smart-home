#!/bin/bash

docker stop smart_home
docker rm smart_home
docker rmi smart-home
docker build -t smart-home ~/projects/smart-home
docker run -d -p 6000:6000 --network host --name smart_home smart-home