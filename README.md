[![Build Status](https://travis-ci.org/nick-fytros/smart-home.svg?branch=master)](https://travis-ci.org/nick-fytros/smart-home)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
# smart-home

## .env file format
```
# Mongo DB conf
DB_HOST=localhost
DB_NAME=smart-home
DB_USER=root
DB_PASS=s1mpl3
# Cokkie session
COOKIESESSION_NAME=smart-home
COOKIESESSION_KEY1=key1
COOKIESESSION_KEY2=key2
# Node environment
NODE_ENV=development
# BCrypt
SALT_FACTOR=10
# Server options
PORT=3000
# Vue dev tools
VUE_DEV=true
# App admin user and password (will be created by default when the app start if he doesn't exist')
APP_ADMIN_EMAIL=your@email.com
APP_ADMIN_PASS=s1mpl3p@ss
```

## Ble peripheral data array as saved in app
```
[ f81d78604bcd: Peripheral {
    _noble:
     Noble {
       state: 'poweredOn',
       address: '5c:f3:70:80:70:e4',
       _bindings: [Object],
       _peripherals: [Object],
       _services: [Object],
	   _characteristics: [Object],
       _descriptors: [Object],
       _discoveredPeripheralUUids: [Object],
       _events: [Object],
       _eventsCount: 3,
       _allowDuplicates: undefined },
    id: 'f81d78604bcd',
    uuid: 'f81d78604bcd',
    address: 'f8:1d:78:60:4b:cd',
    addressType: 'public',
    connectable: true,
    advertisement:
     { localName: 'LEDBLE-78604BCD',
       txPowerLevel: undefined,
       manufacturerData: undefined,
       serviceData: [],
       serviceUuids: [Object],
       solicitationServiceUuids: [],
       serviceSolicitationUuids: [] },
    rssi: -65,
    services: null,
    state: 'disconnected' } 
]
```
## Before running

- Follow the installation instrucions on [noble](https://github.com/sandeepmistry/noble) for your operating system