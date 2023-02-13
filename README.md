### What is this repo?
It's a sample Ruby on Rails application with React and Redux. User can able to login and invite other user by sending email invite.
Invited user will receive email with the registration link and setup his details and login to this application wise versa.


#### Prerequisite

- Linux/Mac platform
- Rails 7.0.4.2
- Ruby 3.0.1
- Node v16.13.1


### How to setup in local?

1) clone this repo

```
git clone https://github.com/kannans/ContactBook.git
```

2) Install dependencies

```sh
cd ContactBook
bundle install
rails db:setup
yarn install
```
3) Run the application

```
bin/dev
```

Access the application at http://localhost:3000
