FROM nickfytros/raspbian-jessie-lite-node7

# Install required libs for node noble js
RUN apt-get update
RUN apt-get install bluetooth bluez libbluetooth-dev libudev-dev -y
RUN apt-get install libcap2-bin -y
RUN apt-get install build-essential make gcc -y
RUN setcap cap_net_raw+eip $(eval readlink -f `which node`)

# Install pm2 globally
RUN npm install pm2 -g

# Set the work directory
RUN mkdir -p ~/smart-home-app
WORKDIR ~/smart-home-app

# Add our package.json and install *before* adding our application files
ADD package.json ./
RUN npm i --production

# Add application files
ADD . ./

EXPOSE 6000

CMD ["pm2-docker", "process.yml"]