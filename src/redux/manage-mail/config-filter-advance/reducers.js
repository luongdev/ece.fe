import actions from './actions';
import staticConfig from '../../../config/manage-mail/filter-advance';

const { CONFIG_FILTER_ADVANCE_SUCCESS } = actions;
const initState = {
  config: staticConfig,
};
const configFilterAdvance = (state = initState, action) => {
  const { type, config } = action;
  switch (type) {
    case CONFIG_FILTER_ADVANCE_SUCCESS:
      return {
        ...state,
        config,
      };
    default:
      return state;
  }
};

export default configFilterAdvance;
