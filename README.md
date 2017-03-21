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