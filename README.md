# gatsby-source-app-store
Gatsby source plugin that pulls data from App Store such as app information and review

## Demo
[💤 Apps](https://sleep-apps.lahteenlahti.com)

## Description
This plugin pull data from Apple App Store using [app-store-scraper](https://www.npmjs.com/package/app-store-scraper). It fetches information about the app such as category, description, release notes, etc. as well user reviews. The amount of user reviews limited to the amount you can find on Apple's App Store website.


## How to install
To install run
```
npm install gatsby-source-app-store
or 
yarn add gatsby-source-app-store
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    // Add the plugin to your gatsby-config
    {
      resolve: `gatsby-source-app-store`,
      options: {
        apps: ["app.sleepcircle.application"], // required
        country: "fi" // optional, can affect the language of reviews
      },
    },
  ],
}

```

## Available options 
## Options

| **Name**  | **Type**         | **Description**                                                                                                                                                                                         |
| :-------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apps       | array of strings | `Required.`, list all the application bundle ids for which you want to fetch data for.|
| country   | string           | `Optional.` language code from which which the data will be fetched. Will affect the language of the reviews                                                                                                      

## How to query for data 
__Query all apps__
```graphql
{
  allApp {
    edges {
      node {
        appId
        currentVersionScore
        requiredOsVersion
        size
        title
        url
        developerUrl
        developerWebsite
        score
        genres
        currentVersionReviews
        currency
        contentRating
        price
        languages
        released
        developer
        developerId
        version
        releaseNotes
        updated
        icon
      }
    }
  }
}
```

__Query single app__
```graphql
{
  app(appId: {eq: "app.sleepcircle.application"}) {
    appId
    contentRating
    currency
    currentVersionReviews
    currentVersionScore
    description
    developer
    developerId
    developerUrl
    developerWebsite
    free
    genreIds
    genres
    id
    icon
    languages
    price
    primaryGenreId
    primaryGenre
    releaseNotes
    released
    requiredOsVersion
    score
    size
    title
    updated
    version
    url
  }
}
```
__Query all reviews__
```graphql
{
  allReview {
    nodes {
      appId
      id
      score
      text
      title
      url
      userName
      userUrl
      version
    }
  }
}
```
__Query reviews for a single app__
```graphql
{
  review(appId: {eq: "app.sleepcircle.application"}) {
    appId
    id
    score
    text
    title
    url
    userName
    userUrl
    version
  }
}

```


## When do I use this plugin?
This plugin is perfect for the following use cases:
1. You've developed an iOS app and want to show user reviews (as testimonials) on your app's website
2. You've a developer portfolio of the iOS apps you've built and want to show information such as ratings, reviews, etc to richen the portfolio site
3. You want to do competetive analysis between different apps


## How to contribute
All contributions are welcome
