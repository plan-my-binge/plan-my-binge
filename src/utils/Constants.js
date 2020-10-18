import {SearchIcon} from "../icons/SearchIcon";
import {HomeIcon} from "../icons/HomeIcon";
import {StarBorderedIcon} from "../icons/StarBorderedIcon";
import {HistoryIcon} from "../icons/HistoryIcon";

export const NavOptions = [
  {
    name: "Binge Planner",
    shortAlias: "Home",
    hint: "Find out how long it takes to watch all episodes of any TV Show",
    link: "/",
    icon: HomeIcon
  },
  // {
  //   name: "Binge Tracker",
  //  shortAlias:  "Binge Tracker",
  //   hint: "Calculate how much time you have spent watching TV Shows in your life",
  // },
  {
    name: "Search",
    shortAlias: "Search",
    link: "/search",
    icon: SearchIcon
  },
  {
    name: "Bookmarks",
    shortAlias: "Bookmarks",
    link: "/bookmarks",
    icon: StarBorderedIcon
  },
  {
    name: "Recently Visited",
    shortAlias: "Recent",
    link: "/recent",
    icon: HistoryIcon
  },
  ];


export const Colors = {
  gray: "#F5F5F5",
  error: "#f56a5a",
  darkGray: "#808080",
  darkerGray: "#414041",
  white: "#FFFFFF",
  black: "#000000",
  darkCyan: "#009688"
};

export const Classes = {
  showOnlyInMobile: "d-block d-md-none",
  showOnlyInWeb: "d-none d-md-block",

  showInLargeScreen: "d-none d-lg-block",
  showInSmallerScreen: "d-block d-lg-none",

  showFlexInLargeScreen: "d-none d-lg-flex",
  showFlexInSmallerScreen: "d-flex d-lg-none",
};


export const cssForPhoneAndTablet = `@media (max-width: 768px)`;

export const isPhoneOrTablet = () => {
  if (typeof window === 'undefined') {
    global.window = {}
  }
  return !process.env.SSR ? window.matchMedia("(max-width: 768px)").matches : false;
};

export const BingeUnit = {
  hours: "hours",
  episodes: "episodes"
};

export const TrackingCategory = {
  BackButtonClick: "BackButtonClick",
  AppLogoClick: "AppLogoClick",
  BottomNavBarItemClick: "BottomNavBarItemClick",
  SideNavBarItemClick: "SideNavBarItemClick", SearchInputClick: "SearchInputClick",

  AddToBookmarkWeb: "AddToBookmarkWeb",
  RemoveFromBookmarkWeb: "RemoveFromBookmarkWeb",
  RemoveFromBookmarkMobile: "RemoveFromBookmarkMobile",
  AddToBookmarkMobile: "AddToBookmarkMobile",

  DailyBingeTimeChange: "DailyBingeTimeChange",
  DailyBingeTimeUnitChange: "DailyBingeTimeUnitChange",

  PaginateSeasonWiseStat: "PaginateSeasonWiseStat",

  OpenIn: "OpenIn",

  HomePageError: "HomePageError",
  ClickSectionHeader: "ClickSectionHeader",
  ClickShowItem: "ClickShowItem",
  SuccessfulSearch: "SuccessfulSearch",
  SearchWithNoResults: "SearchWithNoResults", SearchFailed: "SearchFailed",
  SearchUsefulness: "SearchUsefulness",
  AppHeaderSearchButton: "AppHeaderSearchButton"


};

export const TrackingLabel = {

}

export const Referrer = {
  BookmarkSection : "BookmarkSection",
  RecentSection : "RecentSection",
  PopularSection : "PopularSection",
  BookmarkPage : "BookmarkPage",
  RecentPage : "RecentPage",
  SearchResult : "SearchResult",
};