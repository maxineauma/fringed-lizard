# Fringed Lizard

## Pre-installation
* This depends on: [<a href="https://git-scm.com/download/win">latest Git</a>] [<a href="https://nodejs.org/en/">latest Node.js</a>].

## Installation
* Clone this repository with:<br/>
`git clone https://github.com/maxsaystransrights/fringed-lizard.git`
* Install both the server and client requirements by navigating to both `client` and `server` directories, and running `npm install`.
* Create an `.env` file in both `client` and `server`.
    * `./server/.env` should contain a connection string to a MongoDB database as `DB_URL`, and a port on which to run the backend as `PORT`.
    * `./client/.env` should contain a URL to your backend as `REACT_APP_API_URL`.
* Run `npm start` from both `server` and `client`.
* Have fun! 

## Todo: 

- [x] Code uniformity
    - [x] Client
    - [x] Server
- [x] Prettify
    - [x] Client
    - [x] Server
- [x] Make isLoggedIn more secure
- [x] Move client query functions to central location
- [x] Bring back user roles
- [x] Email validation on login and signup forms

### Important: 

- [x] React frontend
    - [x] Home page
    - [x] Login page
    - [x] Registration page
        - [x] Password security
    - [x] Projects assigned to you
    - [x] Entries viewer/management page
    - [x] Admin control panel
        - [x] Client Panel
            - [x] Create client
        - [x] Project Panel
            - [x] Create project
            - [x] Reassign project
        - [x] Generate PDF reports


- [x] Set up MongoDB Atlas DB
    - [x] Users table
    - [x] Projects table
    - [x] Entries table
    - [x] Clients table


- [x] Express backend
    - [x] Users
        - [x] Login
        - [x] Registration 
    - [x] Projects
        - [x] View projects
        - [x] Admin: new project
        - [x] Admin: reassign projects
    - [x] Entries
        - [x] View your entries
        - [x] Create your entries
        - [x] Delete your entries
    - [x] Clients
        - [x] Admin: create clients
    - [x] Generate PDF reports
        - [x] Consultant reports