import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { ready: false };

const app = (state = INITIAL_STATE, action) => {
  if (action.type === REHYDRATE) {
    return {
      ...state,
      ready: true,
    };
  } else {
    return state;
  }
};

export default {app};
