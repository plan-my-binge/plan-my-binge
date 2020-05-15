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
  {
    name: "Search",
    shortAlias: "Search",
    link: "/search",
    icon: SearchIcon
  }];


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

export const isPhoneOrTablet = window.matchMedia("(max-width: 768px)").matches;

export const BingeUnit = {
  hours: "hours",
  episodes: "episodes"
};