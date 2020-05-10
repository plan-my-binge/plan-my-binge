import React, {useEffect, useState} from "react";
import {useParams, useLocation, useHistory, Link} from "react-router-dom";
import {BingeDetail} from "./BingeDetail.jsx";
import {getShow} from "../service/api";
import {HomePageError} from "./HomePageError.jsx";
import {BingeDetailShimmer} from "./BingeDetailShimmer.jsx";
import {BingeDetailModel} from "../data/BingeDetailModel";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import {Colors} from "../utils/Constants";

export const BingeDetailPage = () => {


  let {pmbId} = useParams();
  let {data} = useLocation();
  let [bingeDetail, setBingeDetail] = useState(null);
  let [showError, setShowError] = useState(false);
  let [showLoader, setShowLoader] = useState(!Boolean(data));

  useEffect(() => {
    if (!data) {
      getShow(pmbId)
        .then(response => setBingeDetail(new BingeDetailModel(response.data[0]._source)))
        .catch(() => setShowError(true))
        .finally(() => setShowLoader(false));
    }
  }, []);
  return <div>

    <Header>
    <BackLink to={"/"}>
      <ArrowBackIcon fontSize={"large"}/> Back
    </BackLink>
    </Header>
    {(data || bingeDetail) && <BingeDetail detail={data || bingeDetail}/>}
    {showError && <HomePageError/>}
    {showLoader && <BingeDetailShimmer/>}
  </div>
};

const Header = styled.div`
  border-bottom: 1px solid ${Colors.gray};
  width: 100%;
  padding-bottom: 5px;
`;

const BackLink = styled(Link)`
  color: ${Colors.black};
  font-size: 1.5rem;
  padding: 8px;
  &:hover {
    color: ${Colors.black};
    text-decoration: none;
    background-color: ${Colors.gray};
    border-radius: 10px;
  }
`;