import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import { Avatar } from 'antd';
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import { openNotificationWithIcon } from '../../notifications/notification';
import { setItem, getItem } from '../../../utility/localStorageControl';
import { LOCAL_STORAGE_VARIABLE } from '../../../constants/index';

const AuthInfo = React.memo(() => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: getItem(LOCAL_STORAGE_VARIABLE.LANGUAGE) || 'vi',
  });
  const { i18n } = useTranslation();
  const { flag } = state;
  const history = useNavigate();

  const SignOut = useCallback(() => {
    dispatch(
      logOut(
        () => history('/login'),
        (message) => openNotificationWithIcon('error', 'Đăng xuất thất bại !', message),
      ),
    );
  }, [history, dispatch]);

  const userContent = (
    <UserDropDwon>
      <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
        <UilSignout /> Đăng xuất
      </Link>
    </UserDropDwon>
  );

  const onFlagChangeHandle = (value, e) => {
    e.preventDefault();
    setItem(LOCAL_STORAGE_VARIABLE.LANGUAGE, value);
    setState({
      ...state,
      flag: value,
    });
    i18n.changeLanguage(value);
  };

  const country = (
    <NavAuth>
      <Link onClick={(e) => onFlagChangeHandle('vi', e)} to="#">
        <img src={require('../../../static/img/flag/vi.png')} alt="" />
        <span>Vietnamese</span>
      </Link>
      <Link onClick={(e) => onFlagChangeHandle('en', e)} to="#">
        <img src={require('../../../static/img/flag/en.png')} alt="" />
        <span>English</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      <div className="ninjadash-nav-actions__item ninjadash-nav-actions__language">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="ninjadash-nav-action-link">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" height="20px" width="20px" />
          </Link>
        </Dropdown>
      </div>
      <div className="ninjadash-nav-actions__item ninjadash-nav-actions__author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="ninjadash-nav-action-link">
            <Avatar src="https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=" />
            <span className="ninjadash-nav-actions__author--name">
              {getItem(LOCAL_STORAGE_VARIABLE.USER_DATA).displayName}
            </span>
            <UilAngleDown />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
});

export default AuthInfo;
