# Superhero Search

Superhero search is an API I created for quotes from Marvel Cinematic Universe characters.

Deployed on Heroku for use by anyone: https://superhero-search.herokuapp.com

## Documentation

### Endpoints

* `/` or `/api/quotes` - Retrieves all quotes
* `/api/quotes/id/:id` - Retrieves the quote with the `quoteId` specified in the `id` parameter
 * Example: `/api/quotes/id/4`
* `/api/quotes/random/qty/:num` - Retrieves a specified number of random quotes
 * If parameter `num` is omitted, one random quote will be returned by default
  * Quotes may repeat.
 * Example: `/api/quotes/random/qty/6`
* `/api/quotes/random/character?name` - Returns one random quote by the character specified in the `name` query parameter
 * The `name` query parameter is case-insensitive
 * Example: `/api/quotes/random/character?name=ironMan`
* `/api/quotes/character?name` - Retrieves all quotes by the character specified in the `name` query parameter
 * The `name` query parameter is case-insensitive
 * Example: `/api/quotes/character?name=captainAmerica`

### Characters

* Iron Man - `ironMan`
* Captain America - `captainAmerica`
* Thor - `thor`
* Hulk - `hulk`
* Spider-Man - `spiderMan`
* Black Panther - `blackPanther`
* Thanos - `thanos`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Git, Node

### Installing

Using a terminal, clone the repository like so (make sure you have git installed):
```
git clone https://github.com/chrisfotso/superhero-search
```

Run `npm install` to install any dependencies.

Then, run `npm run start`.

Using an application such as [Postman](https://www.getpostman.com/), you should be able to test the server and make GET requests on `localhost:5000`

You will not be able to do POST requests in order to add quotes; being the developer, I am the only one with that functionality.

Enjoy!
## Built With

* [Express](https://expressjs.com/) - The Node framework used to create a REST API that can interact with the database
* [MongoDB](https://www.mongodb.com/) - The database used to store and retrieve quotes

## Developers

* **Chris Fotso** - [View commits](https://github.com/chrisfotso/superhero-search/commits?author=chrisfotso)
