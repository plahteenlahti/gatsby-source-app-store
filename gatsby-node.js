const store = require("app-store-scraper")

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  { apps, country }
) => {
  const { createNode } = actions

  try {
    const appList = apps || ["app.sleepcircle.application"]
    const promises = []
    appList.forEach(app => {
      promises.push(getReviews(app, country))
    })

    const appReviews = await Promise.all(promises)
    appReviews.forEach(app => {
      const appNode = {
        id: createNodeId(`app-${app.id}`),
        parent: `__SOURCE__`,
        internal: {
          type: `App`,
          contentDigest: createContentDigest({
            key: app.id,
            foo: app.url,
            bar: app.title,
          }),
        },
        children: [],
        id: `${app.id}`,
        appId: app.appId,
        title: app.title,
        url: app.url,
        description: app.description,
        icon: app.icon,
        genres: app.genres,
        genreIds: app.genreIds,
        primaryGenre: app.primaryGenre,
        primaryGenreId: app.primaryGenreId,
        contentRating: app.contentRating,
        languages: app.languages,
        size: app.size,
        requiredOsVersion: app.requiredOsVersion,
        released: app.released,
        updated: app.updated,
        releaseNotes: app.releaseNotes,
        version: app.version,
        price: app.price,
        currency: app.currency,
        free: app.free,
        developerId: app.developerId,
        developer: app.developer,
        developerUrl: app.developerUrl,
        developerWebsite: app.developerWebsite,
        score: app.score,
        reviews: app.reviews,
        currentVersionScore: app.currentVersionScore,
        currentVersionReviews: app.currentVersionReviews,
      }
      createNode(appNode)

      app.reviews.forEach(review => {
        const fieldData = {
          key: review.id,
          foo: review.url,
          bar: review.app,
        }
        const reviewNode = {
          id: createNodeId(`review-${review.id}`),
          parent: `__SOURCE__`,
          internal: {
            type: `Review`,
            contentDigest: createContentDigest(fieldData),
          },
          children: [],
          title: review.title,
          text: review.text,
          version: review.version,
          url: review.url,
          userUrl: review.userUrl,
          userName: review.userName,
          score: review.score,
          appId: review.appId,
        }
        createNode(reviewNode)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

const getReviews = async (appId, country) => {
  try {
    let page = 0
    let allReviews = []
    // Apple only allows fetching of 10 pages
    const app = await store.app({ appId: appId, country: country })
    while (page < 10) {
      const reviews = await store.reviews({
        appId: appId,
        country: country,
        sort: store.sort.HELPFUL,
        page: page,
      })

      const addApp = reviews.map(review => ({ ...review, appId: appId }))
      allReviews.push(...addApp)
      page++
    }

    return {
      ...app,
      reviews: allReviews,
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
