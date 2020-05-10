import {mode} from "../utils/TimeUtils";

export class BingeDetailModel {

  constructor(bingeDetail) {
    this.averageRating = bingeDetail.averageRating;

    this.startYear = bingeDetail.startYear;
    this.endYear = bingeDetail.endYear;

    this.genres = bingeDetail.genres;

    this.landscapePoster = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + bingeDetail.landscapePoster;
    this.portraitPoster = "https://image.tmdb.org/t/p/w342" + bingeDetail.portraitPoster;

    this.perEpisodeRuntime = bingeDetail.perEpisodeRuntime;

    this.primaryTitle = bingeDetail.primaryTitle;

    this.totalEpisodes = Math.ceil(bingeDetail.seasons.reduce((accumulator, season) => {
      return season.numberOfEpisodes + accumulator
    }, 0));

    this.episodesPerSeason = mode(bingeDetail.seasons.map(x => x.numberOfEpisodes))

    this.runtime = bingeDetail.seasons.reduce((accumulator, season) => {
      return season.seasonRuntime + accumulator
    }, 0)

    this.seasons = bingeDetail.seasons;

  }
}