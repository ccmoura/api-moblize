# Project Title

Moblize API

## Description

API for technical test

## Getting Started

### Installing

```shell
> npm install
```

### Executing program

* After installing the dependencies, create an .env file in the main directory and enter the values ​​as specified in the .env.example file
* DB_URL concerns the postgre url created in [ElephantSQL](https://www.elephantsql.com), 
in the .env.example file I left the url of the database that I created, if you want your own url to do the queries in the database create a postgre in ElephantSQL and put your generated database url in DB_URL
* All scripts are specified in package.json > scripts area
```shell
> npm run migrate
> npm run start
```

# Tests

* To run jest tests
* Simple unit and integration tests are in __tests__ folder
```shell
> npm run test
```

## Info

* To make it easier to test routes, I left a file from my workspace to be imported into Insomnia in the / insomnia folder and the description of the endpoints in this [swagger link](https://app.swaggerhub.com/apis/ccmoura/moblizeapi/1.0.0)

## Author

* [Christopher Moura](https://github.com/ccmoura)
