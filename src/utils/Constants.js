import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

export const NavOptions = [
  {
    name: "Binge Planner",
    hint: "Find out how long it takes to watch all episodes of any TV Show",
    link: "/",
    icon: HomeOutlinedIcon
  },
  // {
  //   name: "Binge Tracker",
  //   hint: "Calculate how much time you have spent watching TV Shows in your life",
  // },
  {
    name: "Bookmarks",
    link: "/bookmarks",
    icon: StarBorderOutlinedIcon
  },
  {
    name: "Search",
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
  showOnlyInWeb: "d-none d-md-block"
};