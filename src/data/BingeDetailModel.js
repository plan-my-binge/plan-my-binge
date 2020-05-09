export class BingeDetailModel {

  constructor(bingeDetail) {
    this.averageRating = bingeDetail.averageRating;

    this.startYear = bingeDetail.startYear;
    this.endYear = bingeDetail.endYear;

    this.genres = bingeDetail.genres;

    this.landscapePoster = bingeDetail.landscapePoster;
    this.portraitPoster = bingeDetail.portraitPoster;

    this.perEpisodeRuntime = bingeDetail.perEpisodeRuntime;

    this.primaryTitle = bingeDetail.primaryTitle;

    this.totalEpisodes = Math.ceil(bingeDetail.seasons.reduce((accumulator, season) => {
      return season.numberOfEpisodes + accumulator
    }, 0));

    this.episodesPerSeason = Math.ceil(bingeDetail.seasons.reduce((accumulator, season) => {
      return season.numberOfEpisodes + accumulator
    }, 0) / bingeDetail.seasons.length);

    this.runtime = bingeDetail.seasons.reduce((accumulator, season) => {
      return season.seasonRuntime + accumulator
    }, 0)

    this.seasons = bingeDetail.seasons;

  }
}