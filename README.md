# Open Community Map - cloud functions

This repo contains microservices of Open Community Map used for

-   [API](docs/API.md)
-   internal maintenance tasks

## Installation

Clone the repo

```
git clone git@github.com:opencommunitymap/communitymap-cloud-functions.git
cd communitymap-cloud-functions/
```

Install dependencies

```
yarn install
```

Install Firebase functions dependencies. NOTE: node-10 is needed for this. You may want to use nvm or homebrew (if you're on mac)

```
cd functions/
yarn install
```

Run the functions

```
yarn serve
```
