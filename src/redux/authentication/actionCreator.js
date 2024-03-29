import actions from './actions';
import actionsCustomizeTable from '../manage-mail/customize-table/actions';
import { DataService } from '../../config/dataService/dataService';
import { setItem, removeItem, getItem } from '../../utility/localStorageControl';
import { LOCAL_STORAGE_VARIABLE } from '../../constants';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;
const { customizeTableSuccess } = actionsCustomizeTable;
const login = (values, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/login', values);
      if (response.data.code === 200 && response.data.data) {
        const { token, refreshToken, displayName, configColumn, role } = response.data.data;
        if (configColumn) {
          setItem(LOCAL_STORAGE_VARIABLE.CUSTOMIZE_TABLE, JSON.parse(configColumn));
          dispatch(customizeTableSuccess(JSON.parse(configColumn)));
        }
        setItem(LOCAL_STORAGE_VARIABLE.USER_DATA, {
          token,
          refreshToken,
          displayName,
          isLogin: true,
          adfs: false,
          role,
        });
        dispatch(loginSuccess(true));
        successCallback(role);
      } else {
        dispatch(loginErr(response.data.errors[0]));
        errorCallback(response.data.errors[0]);
      }
    } catch (err) {
      dispatch(loginErr(err));
      errorCallback(err);
    }
  };
};

const register = (values) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/register', values);
      if (response.data.errors) {
        dispatch(loginErr('Registration failed!'));
      } else {
        dispatch(loginSuccess(false));
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      const response = await DataService.post('/logout');
      if (response.data.errors) {
        dispatch(logoutErr(response.data.errors));
        errorCallback(response.data.errors);
      } else {
        const isLoginAdfs = getItem(LOCAL_STORAGE_VARIABLE.USER_DATA).adfs;
        removeItem(LOCAL_STORAGE_VARIABLE.USER_DATA);
        dispatch(logoutSuccess(false));
        successCallback(isLoginAdfs);
      }
    } catch (err) {
      dispatch(loginErr(err));
      errorCallback(); // Trigger error callback for notification
    }
  };
};

const verifyCallback = (code, successCallback, errorCallback) => {
  return async (dispatch) => {
    try {
      const response = await DataService.get(`/login/verifyCallback?code=${code}`);
      if (response.data.code === 200 && response.data.data) {
        const { token, refreshToken, displayName, configColumn, role } = response.data.data;
        if (configColumn) {
          setItem(LOCAL_STORAGE_VARIABLE.CUSTOMIZE_TABLE, JSON.parse(configColumn));
          dispatch(customizeTableSuccess(JSON.parse(configColumn)));
        }
        setItem(LOCAL_STORAGE_VARIABLE.USER_DATA, {
          token,
          refreshToken,
          displayName,
          isLogin: true,
          adfs: true,
          role,
        });
        dispatch(loginSuccess(true));
        successCallback(role);
      } else {
        dispatch(loginErr(response.data.errors));
        errorCallback();
      }
    } catch (err) {
      errorCallback(); // Trigger error callback for notification
    }
  };
};

export { login, logOut, register, verifyCallback };
