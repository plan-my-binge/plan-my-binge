export class BingeDetailModel {

  constructor(bingeDetail) {
    this.averageRating = bingeDetail.averagerating;
    this.endYear = bingeDetail.endyear;
    this.genres = bingeDetail.genres;
    this.landscapePoster = bingeDetail.landscapeposter;
    this.perEpisodeRuntime = bingeDetail.perEpisodeRuntime;
    this.portraitPoster = bingeDetail.portraitposter;
    this.primaryTitle = bingeDetail.primarytitle;
    this.startYear = bingeDetail.startyear;

    this.totalEpisodes = Math.ceil(bingeDetail.seasons.reduce((accumulator, season) => {
      return season.numberofepisodes + accumulator
    }, 0));

    this.episodesPerSeason = Math.ceil(bingeDetail.seasons.reduce((accumulator, season) => {
      return season.numberofepisodes + accumulator
    }, 0) / bingeDetail.seasons.length);

    this.runtime = bingeDetail.seasons.reduce((accumulator, season) => {
      return season.seasonruntime + accumulator
    }, 0)

    this.seasons = bingeDetail.seasons;

  }
}