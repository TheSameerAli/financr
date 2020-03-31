# Financr
![preview-1](https://snipboard.io/l4XqNf.jpg "")

## Overview 

Financr provides a platform to manage all the finances from a single place. The platform enables the addition of multiple accounts (i.e. bank current accounts, credit card, investments, etc) and provides a big picture overview about the financial health.

### Current Features Includes:
 - Account Management
 - Account Budgets
 - Transaction Management (with Recurring Transactions) 
 - Dashboard (providing an overview of financial health)

### Upcoming Features
 - Foundation of user profile
 - Ability to connect existing/new accounts to actual bank accounts for transaction syncing
 - More features for specific accounts (e.g. business accounts would get account management system)
 - Investment accounts with stock market integration and predictions

## Installation
Clone the repository
```
$ git clone git@github.com:TheSameerAli/financr.git
```

### Setup and run API

Before running the API, make sure you have .NET core SDK 2.2.200 installed on your computer. 

After cloning the repository, copy `api/WebApi/appsettings.example.json` to `api/WebApi/appsettings.json` and configure the ConnectionString to your own database's connection string.

_Note: This project makes use of Microsoft SQL database_

Once the above steps are completed, follow the commands below

```
$ cd api/WebApi
```
```
$ dotnet restore
```
```
$ donet run
```
The above commands will run the API server on your machine.

### Setup and run Frontend
Run the following commands to setup and run the frontend

Install the following before running the commands below:
 - Angular CLI 
 - NodeJS

```
$ cd web/
```
```
$ npm install && ng serve
```

You will be able to access the application at:
[http://localhost:4200](http://localhost:4200)
