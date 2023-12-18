import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import dataTableEmail from './manage-mail/list-mail/reducers';
import configFilterAdvance from './manage-mail/config-filter-advance/reducers';
import customizeTable from './manage-mail/customize-table/reducers';
import dataActivityDetail from './manage-mail/activity-detail/reducers';
import dataCaseDetail from './manage-mail/case-detail/reducers';

const rootReducers = combineReducers({
  message: readMessageReducer,
  notification: readNotificationReducer,
  auth: authReducer,
  ChangeLayoutMode,
  dataTableEmail,
  configFilterAdvance,
  customizeTable,
  dataActivityDetail,
  dataCaseDetail,
});

export default rootReducers;
