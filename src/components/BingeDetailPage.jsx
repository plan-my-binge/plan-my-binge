import React, {useEffect, useState} from "react";
import {useParams, useLocation, useHistory, Link, withRouter} from "react-router-dom";
import {BingeDetail} from "./BingeDetail.jsx";
import {getShow, Url} from "../service/api";
import {HomePageError} from "./HomePageError.jsx";
import {BingeDetailShimmer} from "./BingeDetailShimmer.jsx";
import {BingeDetailModel} from "../data/BingeDetailModel";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import {Colors} from "../utils/Constants";
import {PopularShows} from "./PopularShows";
import {cachingApiRequest} from "../utils/apiUtils";

const BingeDetailPage = () => {

  let {pmbId} = useParams();
  let {data} = useLocation();

  let history = useHistory();

  let [bingeDetail, setBingeDetail] = useState(null);
  let [showError, setShowError] = useState(false);
  let [showLoader, setShowLoader] = useState(!Boolean(data));
  let request = cachingApiRequest();

  let [popularShows, setPopularShows] = useState([]);

  useEffect(() => {
    if (!data) {
      getShow(pmbId)
        .then(response => setBingeDetail(new BingeDetailModel(response.data[0]._source)))
        .catch(() => setShowError(true))
        .finally(() => setShowLoader(false));
    }
    request(Url.getPopularShows).then(data => setPopularShows(data))
  }, []);
  return <div>

    <Header>
    <BackLink onClick={() => history.goBack()}>
      <ArrowBackIcon fontSize={"large"}/> Back
    </BackLink>
    </Header>
    {(data || bingeDetail) && <BingeDetail detail={data || bingeDetail}/>}
    {showError && <HomePageError/>}
    {showLoader && <BingeDetailShimmer/>}
    {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
  </div>
};

export const BingDetailPageWithRouter = withRouter(BingeDetailPage);

const Header = styled.div`
  border-bottom: 1px solid ${Colors.gray};
  width: 100%;
  padding-bottom: 5px;
`;

const BackLink = styled.a`
  color: ${Colors.black};
  font-size: 1.5rem;
  &:hover {
    color: ${Colors.darkGray};
    text-decoration: none;
    border-radius: 10px;
  }
`;