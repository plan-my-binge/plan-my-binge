import {handleActions} from "redux-actions";

const INITIAL_STATE = {fakeDescription: null};

const ssr = handleActions(
    {

    },
    INITIAL_STATE
);

export default {ssr};
