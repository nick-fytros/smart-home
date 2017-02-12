#!/bin/bash

docker build -t nickfytros/smart-home .
docker run -p 3000:3000 nickfytros/smart-home