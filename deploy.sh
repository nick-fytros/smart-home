#!/bin/bash

# pulling the newest
cd ~/projects/smart-home && git pull origin master
# build the new image
docker build -t smart-home ~/projects/smart-home
# stop and rm the previous container
docker stop smart_home
docker rm smart_home
# start the new one
docker run -d -p 6000:6000 --network host --name smart_home smart-home
# remove dangling images
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
docker rmi $(docker images | grep "none" | awk '/ / { print $3 }')