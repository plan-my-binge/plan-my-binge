import {mode} from "../utils/TimeUtils";

export const BingeDetailModel = (bingeDetail) => {
  return ({

    pmbId: bingeDetail.pmb_id,

    averageRating: bingeDetail.averageRating,

    startYear: bingeDetail.startYear,
    endYear: bingeDetail.endYear,

    genres: bingeDetail.genres,

    landscapePoster: bingeDetail.landscapePoster ?
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + bingeDetail.landscapePoster : null,
    portraitPoster: bingeDetail.portraitPoster ?
      "https://image.tmdb.org/t/p/w342" + bingeDetail.portraitPoster : null,

    perEpisodeRuntime: bingeDetail.perEpisodeRuntime,

    primaryTitle: bingeDetail.primaryTitle,

    totalEpisodes: Math.ceil(bingeDetail.seasons.reduce((accumulator, season) => {
      return season.numberOfEpisodes + accumulator
    }, 0)),

    episodesPerSeason: mode(bingeDetail.seasons.map(x => x.numberOfEpisodes)),

    runtime: bingeDetail.seasons.reduce((accumulator, season) => {
      return season.seasonRuntime + accumulator
    }, 0),

    seasons: bingeDetail.seasons,
  });
};