import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import {createStore} from 'redux'
import reducer from './src/reducers/rootReducer'
import {Provider} from 'react-redux'
import {ServerStyleSheet} from 'styled-components'; // <-- importing ServerStyleSheet
import App from './src/components/PlanMyBinge.jsx';
import {BingeDetailModel} from "./src/data/BingeDetailModel";
import {StaticRouter} from "react-router-dom";

const {Client} = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200'})
const PORT = process.env.PORT || 3006;
const app = express();
const redis = require("redis");
const redisClient = redis.createClient();
app.use(express.static('./build'));
redisClient.on("error", function (error) {
  console.error(error);
});

let popularShows = [{"_source": {"averageRating": 8.9, "endYear": 2013, "genres": "Comedy", "landscapePoster": "/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg", "perEpisodeRuntime": 22, "pmb_id": 5387338, "portraitPoster": "/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg", "primaryTitle": "The Office", "seasons": [{"numberOfEpisodes": 6, "season": 1, "seasonRuntime": 132}, {"numberOfEpisodes": 22, "season": 2, "seasonRuntime": 484}, {"numberOfEpisodes": 23, "season": 3, "seasonRuntime": 506}, {"numberOfEpisodes": 14, "season": 4, "seasonRuntime": 308}, {"numberOfEpisodes": 26, "season": 5, "seasonRuntime": 572}, {"numberOfEpisodes": 26, "season": 6, "seasonRuntime": 572}, {"numberOfEpisodes": 24, "season": 7, "seasonRuntime": 528}, {"numberOfEpisodes": 24, "season": 8, "seasonRuntime": 528}, {"numberOfEpisodes": 23, "season": 9, "seasonRuntime": 506}], "startYear": 2005}}, {"_source": {"averageRating": 9.3, "endYear": 2019, "genres": "Action,Adventure,Drama", "landscapePoster": "/suopoADq0k8YZr4dQXcU6pToj6s.jpg", "perEpisodeRuntime": 57, "pmb_id": 5932322, "portraitPoster": "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg", "primaryTitle": "Game of Thrones", "seasons": [{"numberOfEpisodes": 10, "season": 1, "seasonRuntime": 570}, {"numberOfEpisodes": 10, "season": 2, "seasonRuntime": 570}, {"numberOfEpisodes": 10, "season": 3, "seasonRuntime": 570}, {"numberOfEpisodes": 10, "season": 4, "seasonRuntime": 570}, {"numberOfEpisodes": 10, "season": 5, "seasonRuntime": 570}, {"numberOfEpisodes": 10, "season": 6, "seasonRuntime": 570}, {"numberOfEpisodes": 7, "season": 7, "seasonRuntime": 399}, {"numberOfEpisodes": 6, "season": 8, "seasonRuntime": 342}], "startYear": 2011}}, {"_source": {"averageRating": 8.4, "endYear": 2020, "genres": "Comedy,Drama,Romance", "landscapePoster": "/x4lxFIhhrDI4nWtV8osnYwbGESV.jpg", "perEpisodeRuntime": 22, "pmb_id": 711744, "portraitPoster": "/fu5vEUHgxkAPmX26ISQXqHmlPMq.jpg", "primaryTitle": "Modern Family", "seasons": [{"numberOfEpisodes": 24, "season": 1, "seasonRuntime": 528}, {"numberOfEpisodes": 24, "season": 2, "seasonRuntime": 528}, {"numberOfEpisodes": 24, "season": 3, "seasonRuntime": 528}, {"numberOfEpisodes": 24, "season": 4, "seasonRuntime": 528}, {"numberOfEpisodes": 24, "season": 5, "seasonRuntime": 528}, {"numberOfEpisodes": 24, "season": 6, "seasonRuntime": 528}, {"numberOfEpisodes": 22, "season": 7, "seasonRuntime": 484}, {"numberOfEpisodes": 22, "season": 8, "seasonRuntime": 484}, {"numberOfEpisodes": 22, "season": 9, "seasonRuntime": 484}, {"numberOfEpisodes": 22, "season": 10, "seasonRuntime": 484}, {"numberOfEpisodes": 18, "season": 11, "seasonRuntime": 396}], "startYear": 2009}}, {"_source": {"averageRating": 8.7, "endYear": 2020, "genres": "Animation,Comedy,Drama", "landscapePoster": "/qFYDJUIFh8zgEDy3EvnHwhgOl0S.jpg", "perEpisodeRuntime": 25, "pmb_id": 2032915, "portraitPoster": "/mxWsea65k3UNTzCv6WNl3uHVVOi.jpg", "primaryTitle": "BoJack Horseman", "seasons": [{"numberOfEpisodes": 12, "season": 1, "seasonRuntime": 300}, {"numberOfEpisodes": 13, "season": 2, "seasonRuntime": 325}, {"numberOfEpisodes": 12, "season": 3, "seasonRuntime": 300}, {"numberOfEpisodes": 12, "season": 4, "seasonRuntime": 300}, {"numberOfEpisodes": 12, "season": 5, "seasonRuntime": 300}, {"numberOfEpisodes": 16, "season": 6, "seasonRuntime": 400}], "startYear": 2014}}, {"_source": {"averageRating": 8.8, "endYear": null, "genres": "Drama,Fantasy,Horror", "landscapePoster": "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", "perEpisodeRuntime": 51, "pmb_id": 2553925, "portraitPoster": "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg", "primaryTitle": "Stranger Things", "seasons": [{"numberOfEpisodes": 8, "season": 1, "seasonRuntime": 408}, {"numberOfEpisodes": 9, "season": 2, "seasonRuntime": 459}, {"numberOfEpisodes": 8, "season": 3, "seasonRuntime": 408}, {"numberOfEpisodes": 8, "season": 4, "seasonRuntime": 408}], "startYear": 2016}}, {"_source": {"averageRating": 8.1, "endYear": 2007, "genres": "Comedy,Drama", "landscapePoster": "/y1cVmGJx98xGmZM3aikkBOTGQT8.jpg", "perEpisodeRuntime": 44, "pmb_id": 5245423, "portraitPoster": "/dSS7XoqmNxMebyVbEGBY0HWrReA.jpg", "primaryTitle": "Gilmore Girls", "seasons": [{"numberOfEpisodes": 22, "season": 1, "seasonRuntime": 968}, {"numberOfEpisodes": 22, "season": 2, "seasonRuntime": 968}, {"numberOfEpisodes": 22, "season": 3, "seasonRuntime": 968}, {"numberOfEpisodes": 22, "season": 4, "seasonRuntime": 968}, {"numberOfEpisodes": 22, "season": 5, "seasonRuntime": 968}, {"numberOfEpisodes": 22, "season": 6, "seasonRuntime": 968}, {"numberOfEpisodes": 22, "season": 7, "seasonRuntime": 968}], "startYear": 2000}}, {"_source": {"averageRating": 8.4, "endYear": null, "genres": "Comedy,Crime", "landscapePoster": "/ncC9ZgZuKOdaVm7yXinUn26Qyok.jpg", "perEpisodeRuntime": 22, "pmb_id": 1641264, "portraitPoster": "/dzj0oLZWe3qMgK4jlgdKWPVxxIx.jpg", "primaryTitle": "Brooklyn Nine-Nine", "seasons": [{"numberOfEpisodes": 22, "season": 1, "seasonRuntime": 484}, {"numberOfEpisodes": 23, "season": 2, "seasonRuntime": 506}, {"numberOfEpisodes": 23, "season": 3, "seasonRuntime": 506}, {"numberOfEpisodes": 22, "season": 4, "seasonRuntime": 484}, {"numberOfEpisodes": 22, "season": 5, "seasonRuntime": 484}, {"numberOfEpisodes": 18, "season": 6, "seasonRuntime": 396}, {"numberOfEpisodes": 13, "season": 7, "seasonRuntime": 286}, {"numberOfEpisodes": 1, "season": 8, "seasonRuntime": 22}], "startYear": 2013}}, {"_source": {"averageRating": 8.4, "endYear": null, "genres": "Action,Crime,Mystery", "landscapePoster": "/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg", "perEpisodeRuntime": 70, "pmb_id": 3399478, "portraitPoster": "/MoEKaPFHABtA1xKoOteirGaHl1.jpg", "primaryTitle": "Money Heist", "seasons": [{"numberOfEpisodes": 9, "season": 1, "seasonRuntime": 630}, {"numberOfEpisodes": 6, "season": 2, "seasonRuntime": 420}, {"numberOfEpisodes": 8, "season": 3, "seasonRuntime": 560}, {"numberOfEpisodes": 8, "season": 4, "seasonRuntime": 560}], "startYear": 2017}}];
function getAppInitialState(bingeDetail, popularShows = []) {
  return {
    app: {ready: false, inputFocused: false},
    home: {showError: false, showLoader: true},
    shows:
      {
        popularShowIds: popularShows.map(p => p.pmbId),
        allShows: bingeDetail ? [bingeDetail].concat(popularShows) : [].concat(popularShows),
        visited: [],
        bookmarkedShowIds: []
      },
    showDetailPage: {showError: false, showLoader: false},
    user:
      {
        userBingeTime: {value: 1, unit: 'episodes'},
        userId: null,
        sessionId: null
      }
  };
}

function getShowFromElasticSearch(originalUrl) {
  return {
    index: 'binge',
    body: {
      _source: ['averageRating', 'startYear', 'endYear', 'genres', 'perEpisodeRuntime',
        'landscapePoster', 'portraitPoster',
        'primaryTitle', 'seasons', 'pmb_id'],
      'query': {
        'match': {
          'pmb_id': originalUrl.replace("/binge/", "")
        }
      }
    }
  };
}


app.get('/*', async (req, res) => {
  const sheet = new ServerStyleSheet();
  let result;
  let store;

  if (req.originalUrl.includes("/binge")) {
    let redisKey = "prerendered::/binge/" + new RegExp(/\/binge\/([0-9]*)-.*/).exec(req.originalUrl)[1];
    redisClient.get(redisKey, async (err, reply) => {
      if (!Boolean(reply)) {
        try {
          result = await client.search(getShowFromElasticSearch(req.originalUrl));
        } catch (e) {
          console.log(e)
        }
        let bingeDetail = BingeDetailModel(result.body.hits.hits[0]._source);
        store = createStore(reducer, getAppInitialState(bingeDetail));

        const app = ReactDOMServer.renderToString(sheet.collectStyles(<Provider store={store}>
          <StaticRouter location={req.url}>
            <App/>
          </StaticRouter>
        </Provider>));

        const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
        const preloadedState = store.getState();
        let fullHtml = renderBingeDetailsPage(app, preloadedState, styles, bingeDetail);
        redisClient.set(redisKey, fullHtml);
        res.send(fullHtml)
      } else {
        res.send(reply.toString())
      }
    });
  } else {
    redisClient.get("prerendered::" + req.originalUrl, async (err, reply) => {
      if (!Boolean(reply)) {
        let popularShowsIds = popularShows.map(p => BingeDetailModel(p._source));
        store = createStore(reducer, getAppInitialState(null, popularShowsIds));

        const app = ReactDOMServer.renderToString(sheet.collectStyles(<Provider store={store}>
          <StaticRouter location={req.url}>
            <App/>
          </StaticRouter>
        </Provider>));

        const styles = sheet.getStyleTags();
        const preloadedState = store.getState();
        let fullHtml = renderPage(app, preloadedState, styles);
        redisClient.set("prerendered::" + req.originalUrl, fullHtml);
        res.send(fullHtml)
      } else {
        return res.send(reply.toString())
      }
    });
  }
});

function renderPage(html, preLoadedState, style) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Plan my binge! - Binge clock: Find how long does it take to watch any TV show</title>
        
        <meta name="description"
          content="Find out how long it takes to watch every episode in a TV series. Customize the runtime by setting number of hours you spend every day, Search for your TV show. Add TV shows to bookmark.">
        <meta property="og:site_name" content="Plan my binge">
        <meta property="og:description"
              content="Find out how long it takes to watch every episode in a TV series. Customize the runtime by setting number of hours you spend every day, Search for your TV show. Add TV shows to bookmark.">
        <meta property="og:type" content="website">
        <meta name="keywords"
              content="binge clock, binge calculator, number of episodes, number of seasons, binge watching, binge-watch, binge watch calculator, time to watch, series time, binge calculator, how long does it take, how much time does it take, how much tv have i watched, marathon watch, tv shows, tv series counter, binge watch calculator, tv show calculator, tv news, tv show suggestions, movie marathon, movie marathons, complete series, every episode, tv shows like">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no">
        
        <meta property="og:title" content="Plan my binge! - Binge clock: Find how long does it take to watch any TV show">
        <meta property="og:image"
              content="https://planmybinge.com/plan-my-binge.jpg">
        <meta property="og:url" content="https://planmybinge.com">
    
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(
    /</g,
    '\\u003c'
  )}
        </script>
      </body>
    </html>
    `
};

function renderBingeDetailsPage(html, preLoadedState, style, detail) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${detail.primaryTitle} | Plan by Binge! | How long does it take to watch every episodse of ${detail.primaryTitle}?</title>
        
        <meta name="description"
          content="Find out how long it takes to watch every episode in a TV series. Customize the runtime by setting number of hours you spend every day, Search for your TV show. Add TV shows to bookmark.">
        <meta property="og:site_name" content="Plan my binge">
        <meta property="og:description"
              content="Find out how long it takes to watch every episode in a TV series. Customize the runtime by setting number of hours you spend every day, Search for your TV show. Add TV shows to bookmark.">
        <meta property="og:type" content="website">
        <meta name="keywords"
              content="binge clock, binge calculator, number of episodes, number of seasons, binge watching, binge-watch, binge watch calculator, time to watch, series time, binge calculator, how long does it take, how much time does it take, how much tv have i watched, marathon watch, tv shows, tv series counter, binge watch calculator, tv show calculator, tv news, tv show suggestions, movie marathon, movie marathons, complete series, every episode, tv shows like">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no">
        
        <meta property="og:title" content="${detail.primaryTitle} | Plan by Binge! | How long does it take to watch every episodse of ${detail.primaryTitle}?">
        <meta property="og:image"
              content="${detail.landscapePoster || detail.portraitPoster}">
        <meta property="og:url" content="https://planmybinge.com/binge/${detail.pmbId}">
    
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(
    /</g,
    '\\u003c'
  )}
        </script>
      </body>
    </html>
    `
}

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});