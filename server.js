require("@babel/runtime/regenerator")
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
const client = new Client({
  node: 'http://34.211.72.83:9200',
  auth: {
    username: 'elastic',
    password: 'password'
  }
});
const PORT = process.env.PORT || 3006;
const app = express();
const redis = require("redis");
const redisClient = redis.createClient();
var compression = require('compression')

app.use(compression())
app.use(require('less-middleware')({src: __dirname + '/src/style'}));

app.use(express.static('./build'));
redisClient.on("error", function (error) {
  console.error(error);
});

let popularShowsFromES = [
  {
    "_source": {
      "averageRating": 8.9,
      "endYear": 2013,
      "genres": "Comedy",
      "landscapePoster": "/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg",
      "perEpisodeRuntime": 22,
      "pmb_id": 5387338,
      "portraitPoster": "/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
      "primaryTitle": "The Office",
      "seasons": [{"numberOfEpisodes": 6, "season": 1, "seasonRuntime": 132}, {
        "numberOfEpisodes": 22,
        "season": 2,
        "seasonRuntime": 484
      }, {"numberOfEpisodes": 23, "season": 3, "seasonRuntime": 506}, {
        "numberOfEpisodes": 14,
        "season": 4,
        "seasonRuntime": 308
      }, {"numberOfEpisodes": 26, "season": 5, "seasonRuntime": 572}, {
        "numberOfEpisodes": 26,
        "season": 6,
        "seasonRuntime": 572
      }, {"numberOfEpisodes": 24, "season": 7, "seasonRuntime": 528}, {
        "numberOfEpisodes": 24,
        "season": 8,
        "seasonRuntime": 528
      }, {"numberOfEpisodes": 23, "season": 9, "seasonRuntime": 506}],
      "startYear": 2005
    }
  }, {
    "_source": {
      "averageRating": 9.3,
      "endYear": 2019,
      "genres": "Action,Adventure,Drama",
      "landscapePoster": "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
      "perEpisodeRuntime": 57,
      "pmb_id": 5932322,
      "portraitPoster": "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      "primaryTitle": "Game of Thrones",
      "seasons": [{"numberOfEpisodes": 10, "season": 1, "seasonRuntime": 570}, {
        "numberOfEpisodes": 10,
        "season": 2,
        "seasonRuntime": 570
      }, {"numberOfEpisodes": 10, "season": 3, "seasonRuntime": 570}, {
        "numberOfEpisodes": 10,
        "season": 4,
        "seasonRuntime": 570
      }, {"numberOfEpisodes": 10, "season": 5, "seasonRuntime": 570}, {
        "numberOfEpisodes": 10,
        "season": 6,
        "seasonRuntime": 570
      }, {"numberOfEpisodes": 7, "season": 7, "seasonRuntime": 399}, {
        "numberOfEpisodes": 6,
        "season": 8,
        "seasonRuntime": 342
      }],
      "startYear": 2011
    }
  }, {
    "_source": {
      "averageRating": 8.4,
      "endYear": 2020,
      "genres": "Comedy,Drama,Romance",
      "landscapePoster": "/x4lxFIhhrDI4nWtV8osnYwbGESV.jpg",
      "perEpisodeRuntime": 22,
      "pmb_id": 711744,
      "portraitPoster": "/fu5vEUHgxkAPmX26ISQXqHmlPMq.jpg",
      "primaryTitle": "Modern Family",
      "seasons": [{"numberOfEpisodes": 24, "season": 1, "seasonRuntime": 528}, {
        "numberOfEpisodes": 24,
        "season": 2,
        "seasonRuntime": 528
      }, {"numberOfEpisodes": 24, "season": 3, "seasonRuntime": 528}, {
        "numberOfEpisodes": 24,
        "season": 4,
        "seasonRuntime": 528
      }, {"numberOfEpisodes": 24, "season": 5, "seasonRuntime": 528}, {
        "numberOfEpisodes": 24,
        "season": 6,
        "seasonRuntime": 528
      }, {"numberOfEpisodes": 22, "season": 7, "seasonRuntime": 484}, {
        "numberOfEpisodes": 22,
        "season": 8,
        "seasonRuntime": 484
      }, {"numberOfEpisodes": 22, "season": 9, "seasonRuntime": 484}, {
        "numberOfEpisodes": 22,
        "season": 10,
        "seasonRuntime": 484
      }, {"numberOfEpisodes": 18, "season": 11, "seasonRuntime": 396}],
      "startYear": 2009
    }
  }, {
    "_source": {
      "averageRating": 8.7,
      "endYear": 2020,
      "genres": "Animation,Comedy,Drama",
      "landscapePoster": "/qFYDJUIFh8zgEDy3EvnHwhgOl0S.jpg",
      "perEpisodeRuntime": 25,
      "pmb_id": 2032915,
      "portraitPoster": "/mxWsea65k3UNTzCv6WNl3uHVVOi.jpg",
      "primaryTitle": "BoJack Horseman",
      "seasons": [{"numberOfEpisodes": 12, "season": 1, "seasonRuntime": 300}, {
        "numberOfEpisodes": 13,
        "season": 2,
        "seasonRuntime": 325
      }, {"numberOfEpisodes": 12, "season": 3, "seasonRuntime": 300}, {
        "numberOfEpisodes": 12,
        "season": 4,
        "seasonRuntime": 300
      }, {"numberOfEpisodes": 12, "season": 5, "seasonRuntime": 300}, {
        "numberOfEpisodes": 16,
        "season": 6,
        "seasonRuntime": 400
      }],
      "startYear": 2014
    }
  }, {
    "_source": {
      "averageRating": 8.8,
      "endYear": null,
      "genres": "Drama,Fantasy,Horror",
      "landscapePoster": "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      "perEpisodeRuntime": 51,
      "pmb_id": 2553925,
      "portraitPoster": "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
      "primaryTitle": "Stranger Things",
      "seasons": [{"numberOfEpisodes": 8, "season": 1, "seasonRuntime": 408}, {
        "numberOfEpisodes": 9,
        "season": 2,
        "seasonRuntime": 459
      }, {"numberOfEpisodes": 8, "season": 3, "seasonRuntime": 408}, {
        "numberOfEpisodes": 8,
        "season": 4,
        "seasonRuntime": 408
      }],
      "startYear": 2016
    }
  }, {
    "_source": {
      "averageRating": 8.1,
      "endYear": 2007,
      "genres": "Comedy,Drama",
      "landscapePoster": "/y1cVmGJx98xGmZM3aikkBOTGQT8.jpg",
      "perEpisodeRuntime": 44,
      "pmb_id": 5245423,
      "portraitPoster": "/dSS7XoqmNxMebyVbEGBY0HWrReA.jpg",
      "primaryTitle": "Gilmore Girls",
      "seasons": [{"numberOfEpisodes": 22, "season": 1, "seasonRuntime": 968}, {
        "numberOfEpisodes": 22,
        "season": 2,
        "seasonRuntime": 968
      }, {"numberOfEpisodes": 22, "season": 3, "seasonRuntime": 968}, {
        "numberOfEpisodes": 22,
        "season": 4,
        "seasonRuntime": 968
      }, {"numberOfEpisodes": 22, "season": 5, "seasonRuntime": 968}, {
        "numberOfEpisodes": 22,
        "season": 6,
        "seasonRuntime": 968
      }, {"numberOfEpisodes": 22, "season": 7, "seasonRuntime": 968}],
      "startYear": 2000
    }
  }, {
    "_source": {
      "averageRating": 8.4,
      "endYear": null,
      "genres": "Comedy,Crime",
      "landscapePoster": "/ncC9ZgZuKOdaVm7yXinUn26Qyok.jpg",
      "perEpisodeRuntime": 22,
      "pmb_id": 1641264,
      "portraitPoster": "/dzj0oLZWe3qMgK4jlgdKWPVxxIx.jpg",
      "primaryTitle": "Brooklyn Nine-Nine",
      "seasons": [{"numberOfEpisodes": 22, "season": 1, "seasonRuntime": 484}, {
        "numberOfEpisodes": 23,
        "season": 2,
        "seasonRuntime": 506
      }, {"numberOfEpisodes": 23, "season": 3, "seasonRuntime": 506}, {
        "numberOfEpisodes": 22,
        "season": 4,
        "seasonRuntime": 484
      }, {"numberOfEpisodes": 22, "season": 5, "seasonRuntime": 484}, {
        "numberOfEpisodes": 18,
        "season": 6,
        "seasonRuntime": 396
      }, {"numberOfEpisodes": 13, "season": 7, "seasonRuntime": 286}, {
        "numberOfEpisodes": 1,
        "season": 8,
        "seasonRuntime": 22
      }],
      "startYear": 2013
    }
  }, {
    "_source": {
      "averageRating": 8.4,
      "endYear": null,
      "genres": "Action,Crime,Mystery",
      "landscapePoster": "/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg",
      "perEpisodeRuntime": 70,
      "pmb_id": 3399478,
      "portraitPoster": "/MoEKaPFHABtA1xKoOteirGaHl1.jpg",
      "primaryTitle": "Money Heist",
      "seasons": [{"numberOfEpisodes": 9, "season": 1, "seasonRuntime": 630}, {
        "numberOfEpisodes": 6,
        "season": 2,
        "seasonRuntime": 420
      }, {"numberOfEpisodes": 8, "season": 3, "seasonRuntime": 560}, {
        "numberOfEpisodes": 8,
        "season": 4,
        "seasonRuntime": 560
      }],
      "startYear": 2017
    }
  }, {
    "_source": {
      "perEpisodeRuntime": 42,
      "primaryTitle": "Gossip Girl",
      "primaryTitle2": "Gossip Girl",
      "seasons": [
        {
          "numberOfEpisodes": 18,
          "season": 1,
          "seasonRuntime": 756,
          "seasonStartYear": 2007
        },
        {
          "numberOfEpisodes": 25,
          "season": 2,
          "seasonRuntime": 1050,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 22,
          "season": 3,
          "seasonRuntime": 924,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 22,
          "season": 4,
          "seasonRuntime": 924,
          "seasonStartYear": 2010
        },
        {
          "numberOfEpisodes": 24,
          "season": 5,
          "seasonRuntime": 1008,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 10,
          "season": 6,
          "seasonRuntime": 420,
          "seasonStartYear": 2012
        }
      ],
      "landscapePoster": "/dZOumHbzzzr8u7wnrHgh1tc3VnU.jpg",
      "startYear": 2007,
      "endYear": 2012,
      "seriesid": "tt0397442",
      "@timestamp": "2020-12-16T03:47:29.005Z",
      "portraitPoster": "/bGkN84A3iPW2etm3eLr0u4gHvnc.jpg",
      "genres": "Drama,Romance",
      "averageRating": 7.4,
      "@version": "1",
      "pmb_id": 5397787
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 45,
      "primaryTitle": "Madam Secretary",
      "primaryTitle2": "Madam Secretary",
      "seasons": [
        {
          "numberOfEpisodes": 22,
          "season": 1,
          "seasonRuntime": 990,
          "seasonStartYear": 2014
        },
        {
          "numberOfEpisodes": 23,
          "season": 2,
          "seasonRuntime": 1035,
          "seasonStartYear": 2015
        },
        {
          "numberOfEpisodes": 23,
          "season": 3,
          "seasonRuntime": 1035,
          "seasonStartYear": 2016
        },
        {
          "numberOfEpisodes": 22,
          "season": 4,
          "seasonRuntime": 990,
          "seasonStartYear": 2017
        },
        {
          "numberOfEpisodes": 20,
          "season": 5,
          "seasonRuntime": 900,
          "seasonStartYear": 2018
        },
        {
          "numberOfEpisodes": 10,
          "season": 6,
          "seasonRuntime": 450,
          "seasonStartYear": 2019
        }
      ],
      "landscapePoster": "/1Ntw5o4UxzpXepiN588U7USlNq1.jpg",
      "startYear": 2014,
      "endYear": 2019,
      "seriesid": "tt3501074",
      "@timestamp": "2020-12-16T03:47:33.530Z",
      "portraitPoster": "/6Nl1ablo4DNTLb4ZH7Mycz81AEt.jpg",
      "genres": "Drama",
      "averageRating": 7.6,
      "@version": "1",
      "pmb_id": 2077559
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 49,
      "primaryTitle": "Breaking Bad",
      "primaryTitle2": "Breaking Bad",
      "seasons": [
        {
          "numberOfEpisodes": 7,
          "season": 1,
          "seasonRuntime": 343,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 13,
          "season": 2,
          "seasonRuntime": 637,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 13,
          "season": 3,
          "seasonRuntime": 637,
          "seasonStartYear": 2010
        },
        {
          "numberOfEpisodes": 13,
          "season": 4,
          "seasonRuntime": 637,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 16,
          "season": 5,
          "seasonRuntime": 784,
          "seasonStartYear": 2012
        }
      ],
      "landscapePoster": "/wKHImjeHwVIiWJWFIJtWUKkA5QJ.jpg",
      "startYear": 2008,
      "endYear": 2013,
      "seriesid": "tt0903747",
      "@timestamp": "2020-12-16T03:47:29.926Z",
      "portraitPoster": "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      "genres": "Crime,Drama,Thriller",
      "averageRating": 9.5,
      "@version": "1",
      "pmb_id": 5892417
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 22,
      "primaryTitle": "It's Always Sunny in Philadelphia",
      "primaryTitle2": "It's Always Sunny in Philadelphia",
      "seasons": [
        {
          "numberOfEpisodes": 7,
          "season": 1,
          "seasonRuntime": 154,
          "seasonStartYear": 2005
        },
        {
          "numberOfEpisodes": 10,
          "season": 2,
          "seasonRuntime": 220,
          "seasonStartYear": 2006
        },
        {
          "numberOfEpisodes": 15,
          "season": 3,
          "seasonRuntime": 330,
          "seasonStartYear": 2007
        },
        {
          "numberOfEpisodes": 13,
          "season": 4,
          "seasonRuntime": 286,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 12,
          "season": 5,
          "seasonRuntime": 264,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 13,
          "season": 6,
          "seasonRuntime": 286,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 13,
          "season": 7,
          "seasonRuntime": 286,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 10,
          "season": 8,
          "seasonRuntime": 220,
          "seasonStartYear": 2012
        },
        {
          "numberOfEpisodes": 10,
          "season": 9,
          "seasonRuntime": 220,
          "seasonStartYear": 2013
        },
        {
          "numberOfEpisodes": 10,
          "season": 10,
          "seasonRuntime": 220,
          "seasonStartYear": 2015
        },
        {
          "numberOfEpisodes": 10,
          "season": 11,
          "seasonRuntime": 220,
          "seasonStartYear": 2016
        },
        {
          "numberOfEpisodes": 10,
          "season": 12,
          "seasonRuntime": 220,
          "seasonStartYear": 2017
        },
        {
          "numberOfEpisodes": 10,
          "season": 13,
          "seasonRuntime": 220,
          "seasonStartYear": 2018
        },
        {
          "numberOfEpisodes": 10,
          "season": 14,
          "seasonRuntime": 220,
          "seasonStartYear": 2019
        },
        {
          "numberOfEpisodes": 1,
          "season": 15,
          "seasonRuntime": 22,
          "seasonStartYear": 2021
        }
      ],
      "landscapePoster": "/uqTCaYBoSLT9MAdyQ9tU6QyCZ3A.jpg",
      "startYear": 2005,
      "endYear": null,
      "seriesid": "tt0472954",
      "@timestamp": "2020-12-16T03:47:29.494Z",
      "portraitPoster": "/xX3vAWdCb828T48HM9OvvD0p4PC.jpg",
      "genres": "Comedy",
      "averageRating": 8.8,
      "@version": "1",
      "pmb_id": 5471389
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 22,
      "primaryTitle": "Two and a Half Men",
      "primaryTitle2": "Two and a Half Men",
      "seasons": [
        {
          "numberOfEpisodes": 25,
          "season": 1,
          "seasonRuntime": 550,
          "seasonStartYear": 2003
        },
        {
          "numberOfEpisodes": 24,
          "season": 2,
          "seasonRuntime": 528,
          "seasonStartYear": 2004
        },
        {
          "numberOfEpisodes": 24,
          "season": 3,
          "seasonRuntime": 528,
          "seasonStartYear": 2005
        },
        {
          "numberOfEpisodes": 24,
          "season": 4,
          "seasonRuntime": 528,
          "seasonStartYear": 2006
        },
        {
          "numberOfEpisodes": 19,
          "season": 5,
          "seasonRuntime": 418,
          "seasonStartYear": 2007
        },
        {
          "numberOfEpisodes": 24,
          "season": 6,
          "seasonRuntime": 528,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 22,
          "season": 7,
          "seasonRuntime": 484,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 16,
          "season": 8,
          "seasonRuntime": 352,
          "seasonStartYear": 2010
        },
        {
          "numberOfEpisodes": 24,
          "season": 9,
          "seasonRuntime": 528,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 23,
          "season": 10,
          "seasonRuntime": 506,
          "seasonStartYear": 2012
        },
        {
          "numberOfEpisodes": 22,
          "season": 11,
          "seasonRuntime": 484,
          "seasonStartYear": 2013
        },
        {
          "numberOfEpisodes": 15,
          "season": 12,
          "seasonRuntime": 330,
          "seasonStartYear": 2014
        }
      ],
      "landscapePoster": "/nMJO71S7r7bn1ABvARtfuUQJbcS.jpg",
      "startYear": 2003,
      "endYear": 2015,
      "seriesid": "tt0369179",
      "@timestamp": "2020-12-16T03:47:28.838Z",
      "portraitPoster": "/A9QDK4OWpv41W27kCv0LXe30k9S.jpg",
      "genres": "Comedy,Romance",
      "averageRating": 7.0,
      "@version": "1",
      "pmb_id": 5370668
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 41,
      "primaryTitle": "Grey's Anatomy",
      "primaryTitle2": "Grey's Anatomy",
      "seasons": [
        {
          "numberOfEpisodes": 9,
          "season": 1,
          "seasonRuntime": 369,
          "seasonStartYear": 2005
        },
        {
          "numberOfEpisodes": 27,
          "season": 2,
          "seasonRuntime": 1107,
          "seasonStartYear": 2005
        },
        {
          "numberOfEpisodes": 25,
          "season": 3,
          "seasonRuntime": 1025,
          "seasonStartYear": 2006
        },
        {
          "numberOfEpisodes": 17,
          "season": 4,
          "seasonRuntime": 697,
          "seasonStartYear": 2007
        },
        {
          "numberOfEpisodes": 24,
          "season": 5,
          "seasonRuntime": 984,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 24,
          "season": 6,
          "seasonRuntime": 984,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 22,
          "season": 7,
          "seasonRuntime": 902,
          "seasonStartYear": 2010
        },
        {
          "numberOfEpisodes": 24,
          "season": 8,
          "seasonRuntime": 984,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 24,
          "season": 9,
          "seasonRuntime": 984,
          "seasonStartYear": 2012
        },
        {
          "numberOfEpisodes": 24,
          "season": 10,
          "seasonRuntime": 984,
          "seasonStartYear": 2013
        },
        {
          "numberOfEpisodes": 25,
          "season": 11,
          "seasonRuntime": 1025,
          "seasonStartYear": 2014
        },
        {
          "numberOfEpisodes": 24,
          "season": 12,
          "seasonRuntime": 984,
          "seasonStartYear": 2015
        },
        {
          "numberOfEpisodes": 24,
          "season": 13,
          "seasonRuntime": 984,
          "seasonStartYear": 2016
        },
        {
          "numberOfEpisodes": 24,
          "season": 14,
          "seasonRuntime": 984,
          "seasonStartYear": 2017
        },
        {
          "numberOfEpisodes": 25,
          "season": 15,
          "seasonRuntime": 1025,
          "seasonStartYear": 2018
        },
        {
          "numberOfEpisodes": 21,
          "season": 16,
          "seasonRuntime": 861,
          "seasonStartYear": 2019
        },
        {
          "numberOfEpisodes": 1,
          "season": 17,
          "seasonRuntime": 41,
          "seasonStartYear": 2020
        }
      ],
      "landscapePoster": "/edmk8xjGBsYVIf4QtLY9WMaMcXZ.jpg",
      "startYear": 2005,
      "endYear": null,
      "seriesid": "tt0413573",
      "@timestamp": "2020-12-16T03:47:29.076Z",
      "portraitPoster": "/jnsvc7gCKocXnrTXF6p03cICTWb.jpg",
      "genres": "Drama,Romance",
      "averageRating": 7.6,
      "@version": "1",
      "pmb_id": 5413537
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 22,
      "primaryTitle": "Schitt's Creek",
      "primaryTitle2": "Schitt's Creek",
      "seasons": [
        {
          "numberOfEpisodes": 13,
          "season": 1,
          "seasonRuntime": 286,
          "seasonStartYear": 2015
        },
        {
          "numberOfEpisodes": 13,
          "season": 2,
          "seasonRuntime": 286,
          "seasonStartYear": 2016
        },
        {
          "numberOfEpisodes": 13,
          "season": 3,
          "seasonRuntime": 286,
          "seasonStartYear": 2017
        },
        {
          "numberOfEpisodes": 13,
          "season": 4,
          "seasonRuntime": 286,
          "seasonStartYear": 2018
        },
        {
          "numberOfEpisodes": 14,
          "season": 5,
          "seasonRuntime": 308,
          "seasonStartYear": 2019
        },
        {
          "numberOfEpisodes": 14,
          "season": 6,
          "seasonRuntime": 308,
          "seasonStartYear": 2020
        }
      ],
      "landscapePoster": "/ftNmVV8LuNVmtB8mzoUTucozVKE.jpg",
      "startYear": 2015,
      "endYear": 2020,
      "seriesid": "tt3526078",
      "@timestamp": "2020-12-16T03:47:33.558Z",
      "portraitPoster": "/iRfSzrPS5VYWQv7KVSEg2BZZL6C.jpg",
      "genres": "Comedy",
      "averageRating": 8.4,
      "@version": "1",
      "pmb_id": 2088055
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 60,
      "primaryTitle": "Peaky Blinders",
      "primaryTitle2": "Peaky Blinders",
      "seasons": [
        {
          "numberOfEpisodes": 6,
          "season": 1,
          "seasonRuntime": 360,
          "seasonStartYear": 2013
        },
        {
          "numberOfEpisodes": 6,
          "season": 2,
          "seasonRuntime": 360,
          "seasonStartYear": 2014
        },
        {
          "numberOfEpisodes": 6,
          "season": 3,
          "seasonRuntime": 360,
          "seasonStartYear": 2016
        },
        {
          "numberOfEpisodes": 6,
          "season": 4,
          "seasonRuntime": 360,
          "seasonStartYear": 2017
        },
        {
          "numberOfEpisodes": 6,
          "season": 5,
          "seasonRuntime": 360,
          "seasonStartYear": 2019
        },
        {
          "numberOfEpisodes": 6,
          "season": 6,
          "seasonRuntime": 360,
          "seasonStartYear": null
        },
        {
          "numberOfEpisodes": 1,
          "season": 7,
          "seasonRuntime": 60,
          "seasonStartYear": null
        }
      ],
      "landscapePoster": "/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg",
      "startYear": 2013,
      "endYear": null,
      "seriesid": "tt2442560",
      "@timestamp": "2020-12-16T03:47:32.799Z",
      "portraitPoster": "/6PX0r5TRRU5y0jZ70y1OtbLYmoD.jpg",
      "genres": "Crime,Drama",
      "averageRating": 8.8,
      "@version": "1",
      "pmb_id": 1631024
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 22,
      "primaryTitle": "The Big Bang Theory",
      "primaryTitle2": "The Big Bang Theory",
      "seasons": [
        {
          "numberOfEpisodes": 18,
          "season": 1,
          "seasonRuntime": 396,
          "seasonStartYear": 2006
        },
        {
          "numberOfEpisodes": 23,
          "season": 2,
          "seasonRuntime": 506,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 23,
          "season": 3,
          "seasonRuntime": 506,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 24,
          "season": 4,
          "seasonRuntime": 528,
          "seasonStartYear": 2010
        },
        {
          "numberOfEpisodes": 24,
          "season": 5,
          "seasonRuntime": 528,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 24,
          "season": 6,
          "seasonRuntime": 528,
          "seasonStartYear": 2012
        },
        {
          "numberOfEpisodes": 24,
          "season": 7,
          "seasonRuntime": 528,
          "seasonStartYear": 2013
        },
        {
          "numberOfEpisodes": 24,
          "season": 8,
          "seasonRuntime": 528,
          "seasonStartYear": 2014
        },
        {
          "numberOfEpisodes": 24,
          "season": 9,
          "seasonRuntime": 528,
          "seasonStartYear": 2015
        },
        {
          "numberOfEpisodes": 25,
          "season": 10,
          "seasonRuntime": 550,
          "seasonStartYear": 2016
        },
        {
          "numberOfEpisodes": 24,
          "season": 11,
          "seasonRuntime": 528,
          "seasonStartYear": 2017
        },
        {
          "numberOfEpisodes": 24,
          "season": 12,
          "seasonRuntime": 528,
          "seasonStartYear": 2018
        }
      ],
      "landscapePoster": "/ngoiHQul4QetfA62SdmZZOdDFAP.jpg",
      "startYear": 2007,
      "endYear": 2019,
      "seriesid": "tt0898266",
      "@timestamp": "2020-12-16T03:47:29.923Z",
      "portraitPoster": "/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg",
      "genres": "Comedy,Romance",
      "averageRating": 8.1,
      "@version": "1",
      "pmb_id": 5887157
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 60,
      "primaryTitle": "The Umbrella Academy",
      "primaryTitle2": "The Umbrella Academy",
      "seasons": [
        {
          "numberOfEpisodes": 10,
          "season": 1,
          "seasonRuntime": 600,
          "seasonStartYear": 2019
        },
        {
          "numberOfEpisodes": 10,
          "season": 2,
          "seasonRuntime": 600,
          "seasonStartYear": 2020
        }
      ],
      "landscapePoster": "/e1izBDd01p348GSNEziK2jrHBQM.jpg",
      "startYear": 2019,
      "endYear": null,
      "seriesid": "tt1312171",
      "@timestamp": "2020-12-16T03:47:30.981Z",
      "portraitPoster": "/uYHdIs5O8tiU5p6MvUPd2jElOH6.jpg",
      "genres": "Action,Adventure,Comedy",
      "averageRating": 8.0,
      "@version": "1",
      "pmb_id": 586453
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 59,
      "primaryTitle": "The Wire",
      "primaryTitle2": "The Wire",
      "seasons": [
        {
          "numberOfEpisodes": 13,
          "season": 1,
          "seasonRuntime": 767,
          "seasonStartYear": 2002
        },
        {
          "numberOfEpisodes": 12,
          "season": 2,
          "seasonRuntime": 708,
          "seasonStartYear": 2003
        },
        {
          "numberOfEpisodes": 12,
          "season": 3,
          "seasonRuntime": 708,
          "seasonStartYear": 2004
        },
        {
          "numberOfEpisodes": 13,
          "season": 4,
          "seasonRuntime": 767,
          "seasonStartYear": 2006
        },
        {
          "numberOfEpisodes": 10,
          "season": 5,
          "seasonRuntime": 590,
          "seasonStartYear": 2008
        }
      ],
      "landscapePoster": "/oggnxmvofLtGQvXsO9bAFyCj3p6.jpg",
      "startYear": 2002,
      "endYear": 2008,
      "seriesid": "tt0306414",
      "@timestamp": "2020-12-16T03:47:28.562Z",
      "portraitPoster": "/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
      "genres": "Crime,Drama,Thriller",
      "averageRating": 9.3,
      "@version": "1",
      "pmb_id": 5310045
    }
  },
  {
    "_source": {
      "perEpisodeRuntime": 22,
      "primaryTitle": "How I Met Your Mother",
      "primaryTitle2": "How I Met Your Mother",
      "seasons": [
        {
          "numberOfEpisodes": 22,
          "season": 1,
          "seasonRuntime": 484,
          "seasonStartYear": 2005
        },
        {
          "numberOfEpisodes": 22,
          "season": 2,
          "seasonRuntime": 484,
          "seasonStartYear": 2006
        },
        {
          "numberOfEpisodes": 20,
          "season": 3,
          "seasonRuntime": 440,
          "seasonStartYear": 2007
        },
        {
          "numberOfEpisodes": 24,
          "season": 4,
          "seasonRuntime": 528,
          "seasonStartYear": 2008
        },
        {
          "numberOfEpisodes": 24,
          "season": 5,
          "seasonRuntime": 528,
          "seasonStartYear": 2009
        },
        {
          "numberOfEpisodes": 24,
          "season": 6,
          "seasonRuntime": 528,
          "seasonStartYear": 2010
        },
        {
          "numberOfEpisodes": 24,
          "season": 7,
          "seasonRuntime": 528,
          "seasonStartYear": 2011
        },
        {
          "numberOfEpisodes": 24,
          "season": 8,
          "seasonRuntime": 528,
          "seasonStartYear": 2012
        },
        {
          "numberOfEpisodes": 24,
          "season": 9,
          "seasonRuntime": 528,
          "seasonStartYear": 2013
        }
      ],
      "landscapePoster": "/eU1ejjxPMxlCq3JS5EvL49B8XO3.jpg",
      "startYear": 2005,
      "endYear": 2014,
      "seriesid": "tt0460649",
      "@timestamp": "2020-12-16T03:47:29.439Z",
      "portraitPoster": "/tsIRcoC9D97nVckWto8Zr357ylU.jpg",
      "genres": "Comedy,Romance",
      "averageRating": 8.3,
      "@version": "1",
      "pmb_id": 5459422
    }
  }];
let popularShows = popularShowsFromES.map(p => BingeDetailModel(p._source));

function getAppInitialState(bingeDetail, popularShows = [], fakeDescription) {
  return {
    ssr: {fakeDescription},
    app: {ready: true, inputFocused: false},
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

function getShowFromElasticSearch(pmbId) {
  return {
    index: 'binge',
    body: {
      _source: ['averageRating', 'startYear', 'endYear', 'genres', 'perEpisodeRuntime',
        'landscapePoster', 'portraitPoster',
        'primaryTitle', 'seasons', 'pmb_id'],
      'query': {
        'match': {
          'pmb_id': pmbId
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
    let pmbId = new RegExp(/\/binge\/([0-9]*)[-|\/]?.*/).exec(req.originalUrl)[1];
    let redisKey = "prerendered::/binge/" + pmbId;
    redisClient.get(redisKey, async (err, reply) => {
      if (!Boolean(reply)) {
        console.log("Not present in cache");
        try {
          result = await client.search(getShowFromElasticSearch(pmbId));
          console.log("Fetched from elastic search");
        } catch (e) {
          console.log("Failed to fetch from elastic search", e);
        }
        let bingeDetail = BingeDetailModel(result.body.hits.hits[0]._source);
        let fakeDescription = getFakeDescription(result.body.hits.hits[0]._source);
        store = createStore(reducer, getAppInitialState(bingeDetail, popularShows, fakeDescription));

        const app = ReactDOMServer.renderToString(sheet.collectStyles(<Provider store={store}>
          <StaticRouter location={req.url}>
            <App/>
          </StaticRouter>
        </Provider>));

        const styles = sheet.getStyleTags();
        const preloadedState = store.getState();
        let fullHtml = renderBingeDetailsPage(app, preloadedState, styles, bingeDetail);
        redisClient.set(redisKey, fullHtml);
        res.send(fullHtml)
      } else {
        console.log("Serving from cache");
        res.send(reply.toString())
      }
    });
  } else {
    redisClient.get("prerendered::" + req.originalUrl, async (err, reply) => {
      if (!Boolean(reply)) {
        console.log("Not present in cache");
        let fakeDescription = getFakeDescription(popularShowsFromES[0]._source);
        store = createStore(reducer, getAppInitialState(null, popularShows, fakeDescription));

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
        console.log("Serving from cache")
        return res.send(reply.toString())
      }
    });
  }
});

function getFakeDescription(show) {
  let description = `
 ${show.primaryTitle} is a ${show.genres} TV show.
 ${show.startYear ? "The show started in " + show.startYear : ""}.
 ${show.endYear ? "The show ended in " + show.endYear : ""}.
 ${show.primaryTitle} has a average rating of ${show.averageRating} in IMDB.
 Each episode of ${show.primaryTitle} has ${show.perEpisodeRuntime} minutes of runtime.
`.replace(/\n/g, "");

  let seasonsDescription = show.seasons.forEach(season => {
    let seasonDesc = `
 Season ${season.season} of ${show.primaryTitle} has ${season.numberOfEpisodes} episodes.
 Entire season runtime is ${season.seasonRuntime}.
 ${season.seasonStartYear ? `Season ${season.season} of ${show.primaryTitle} started running from ${season.seasonStartYear}.` : ""}
  `.replace(/\n/g, "")
    description = description.concat(seasonDesc)
  })

  return description;
}

function renderPage(html, preLoadedState, style) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Plan my binge! - Binge clock: Find how long does it take to watch any TV show</title>
        <script data-ad-client="ca-pub-8541290588438365" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
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
        <link rel="stylesheet" href="/bootstrap.mui.css" />
        <link rel="stylesheet" href="/shimmer.css" />
        <link rel="stylesheet" href="/app.css" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no">
        
        <meta property="og:title" content="Plan my binge! - Binge clock: Find how long does it take to watch any TV show">
        <meta property="og:image"
              content="https://planmybinge.com/plan-my-binge.jpg">
        <meta property="og:url" content="https://planmybinge.com">
    ${style}
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
        <title>${detail.primaryTitle} | Plan by Binge! | How long does it take to watch every episodes of ${detail.primaryTitle}?</title>
        
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
        <link rel="stylesheet" href="/bootstrap.mui.css" />
        <link rel="stylesheet" href="/shimmer.css" />
        <link rel="stylesheet" href="/app.css" />
        <link rel="manifest" href="/manifest.json">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no">
        <script data-ad-client="ca-pub-8541290588438365" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <meta property="og:title" content="${detail.primaryTitle} | Plan by Binge! | How long does it take to watch every episodse of ${detail.primaryTitle}?">
        <meta property="og:image"
              content="${detail.landscapePoster || detail.portraitPoster}">
        <meta property="og:url" content="https://planmybinge.com/binge/${detail.pmbId}">
          ${style}
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
