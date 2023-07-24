



# Simplis Case Study
The goal of this case study is to create a tunnel of professional civil liability devices.

## Stack
- Backend : Symfony 6.3
- Frontend : Angular 16


## Infrastructure
The project come whith infrastructure based on a basic LAMP stack environment built using Docker Compose. It consists of the following :

- PHP 8.1.x
- Apache
- MySQL 8
- phpMyAdmin
- Redis

## Installation

- Clone this repository on your local computer
- Run the `docker-compose up -d`.

```shell
git clone https://github.com/and75/symply-test-technique.git
cd symply-test-technique
docker-compose up -d
// visit localhost
```

- Set virtual host 
```shell
127.0.0.1 api.localhost
127.0.0.1 app.localhost
127.0.0.1 static.localhost
```

Your stack is now ready!! You can access it via `http://localhost`.


### General Information

This Docker Stack is build for local development and not for production usage.

### Web Server

Apache is configured to run on port 80. So, you can access it via `http://localhost`.

#### Apache Modules

By default following modules are enabled.

- rewrite
- headers

#### Connect via SSH

You can connect to web server using `docker-compose exec` command to perform various operation on it. Use below command to login to container via ssh.

```shell
docker-compose exec webserver bash
```

### PHP

#### Extensions

By default following extensions are installed.
May differ for PHP Versions <7.x.x

- mysqli
- pdo_sqlite
- pdo_mysql
- mbstring
- zip
- intl
- mcrypt
- curl
- json
- iconv
- xml
- xmlrpc
- gd

### phpMyAdmin

phpMyAdmin is configured to run on port 8080. Use following default credentials.

http://localhost:8080/  
username: root  
password: tiger

### Xdebug

Xdebug comes installed by default and it's version depends on the PHP version chosen in the `".env"` file.

**Xdebug versions:**

PHP <= 7.3: Xdebug 2.X.X

PHP >= 7.4: Xdebug 3.X.X

### Redis

It comes with Redis. It runs on default port `6379`.