



# LAMP stack built with Docker Compose

A basic LAMP stack environment built using Docker Compose. It consists of the following:

- PHP 8.1.x
- Apache
- MySQL 8
- phpMyAdmin
- Redis

- 8.1.x

## Installation

- Clone this repository on your local computer
- Run the `docker-compose up -d`.

```shell
git clone https://github.com/and75/symply-test-technique.git
cd symply-test-technique
docker-compose up -d
// visit localhost
```

Your LAMP stack is now ready!! You can access it via `http://localhost`.

## Configuration and Usage

### General Information

This Docker Stack is build for local development and not for production usage.

## Web Server

Apache is configured to run on port 80. So, you can access it via `http://localhost`.

#### Apache Modules

By default following modules are enabled.

- rewrite
- headers

> If you want to enable more modules, just update `./bin/phpX/Dockerfile`. You can also generate a PR and we will merge if seems good for general purpose.
> You have to rebuild the docker image by running `docker-compose build` and restart the docker containers.

#### Connect via SSH

You can connect to web server using `docker-compose exec` command to perform various operation on it. Use below command to login to container via ssh.

```shell
docker-compose exec webserver bash
```

## PHP

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

## phpMyAdmin

phpMyAdmin is configured to run on port 8080. Use following default credentials.

http://localhost:8080/  
username: root  
password: tiger

## Xdebug

Xdebug comes installed by default and it's version depends on the PHP version chosen in the `".env"` file.

**Xdebug versions:**

PHP <= 7.3: Xdebug 2.X.X

PHP >= 7.4: Xdebug 3.X.X

## Redis

It comes with Redis. It runs on default port `6379`.

## SSL (HTTPS)

Support for `https` domains is built-in but disabled by default. There are 3 ways you can enable and configure SSL; `https` on `localhost` being the easiest. If you are trying to recreating a testing environment as close as possible to a production environment, any domain name can be supported with more configuration.

**Notice:** For every non-localhost domain name you wish to use `https` on, you will need to modify your computers [hosts file](https://en.wikipedia.org/wiki/Hosts_%28file%29) and point the domain name to `127.0.0.1`. If you fail to do this SSL will not work and you will be routed to the internet every time you try to visit that domain name locally.
