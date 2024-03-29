import React from 'react';
import { Button, Modal, Space } from 'antd';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { handleDeleteUser } from '../../../redux/manage-user-local/user/actionCreator';
import { openNotificationWithIcon } from '../../notifications/notification';
import { getListUser } from '../../../redux/manage-user-local/actionCreator';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PREFIX_FORM_MANAGE_USER,
  TITLE_FORM_MANAGE_USER,
  BUTTON_MODAL_MANAGE_USER,
  DELETE_MODAL,
  MESSAGE_NOTIFICATION,
  ERROR_LOGIN,
} from '../../../constants';

function DeleteUserForm({ showOrHideModalDeleteUser, hideModal, typeRemove, idUser, nameDelete, selectedIds }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(
      handleDeleteUser(
        typeRemove,
        id,
        () => {
          hideModal();
          openNotificationWithIcon('success', t(`${MESSAGE_NOTIFICATION.DELETE_SUCCESS}`));
          dispatch(getListUser(DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ''));
        },
        (err) => {
          openNotificationWithIcon(
            'error',
            t(`${MESSAGE_NOTIFICATION.DELETE_FAIL}`),
            t(`${ERROR_LOGIN}${err.message}`),
          );
        },
      ),
    );
  };

  return (
    <Modal
      style={{ fontSize: '13px !important', position: 'relative' }}
      title={
        typeRemove ? (
          <strong style={{ fontWeight: '1000' }}>
            {t(`${PREFIX_FORM_MANAGE_USER}${TITLE_FORM_MANAGE_USER.DELETEUSER}`)}
          </strong>
        ) : (
          <strong style={{ fontWeight: '1000' }}>
            {t(`${PREFIX_FORM_MANAGE_USER}${TITLE_FORM_MANAGE_USER.DELETEMANYUSER}`)}
          </strong>
        )
      }
      open={showOrHideModalDeleteUser}
      onCancel={hideModal}
      maskClosable={false}
      footer={[
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'end',
          }}
          key="footerModalCustomizeTable"
        >
          <Space size="small">
            <Button onClick={hideModal} className="px-5 text-[13px] font-semibold button-reset h-10">
              <span className="button-formadd items-center">
                <CloseOutlined style={{ marginRight: '8px' }} />
                {t(`${PREFIX_FORM_MANAGE_USER}${BUTTON_MODAL_MANAGE_USER.CANCEL}`)}
              </span>
            </Button>
            <Button
              onClick={typeRemove ? () => handleDelete(idUser) : () => handleDelete(selectedIds)}
              type="primary"
              danger
              ghost
              className="px-5 text-[13px] font-semibold  h-10"
            >
              <span className="button-formadd items-center">
                <DeleteOutlined style={{ marginRight: '8px' }} />
                {t(`${PREFIX_FORM_MANAGE_USER}${BUTTON_MODAL_MANAGE_USER.DELETE}`)}
              </span>
            </Button>
          </Space>
        </div>,
      ]}
      width={600}
    >
      {typeRemove ? (
        <p className="p-[13px]">
          {t(`${PREFIX_FORM_MANAGE_USER}${DELETE_MODAL.USER}`)}
          <strong>{nameDelete}</strong>
          {t(`${PREFIX_FORM_MANAGE_USER}${DELETE_MODAL.MESSAGEDELETEUSER}`)}
        </p>
      ) : (
        <p className="p-[13px]">
          {t(`${PREFIX_FORM_MANAGE_USER}${DELETE_MODAL.DELETE}`)}
          <strong>{selectedIds.length}</strong>
          {t(`${PREFIX_FORM_MANAGE_USER}${DELETE_MODAL.MESSAGEDELETEUSERS}`)}
        </p>
      )}
    </Modal>
  );
}
DeleteUserForm.propTypes = {
  showOrHideModalDeleteUser: propTypes.bool.isRequired,
  hideModal: propTypes.func.isRequired,
  typeRemove: propTypes.bool.isRequired,
  idUser: propTypes.string,
  nameDelete: propTypes.string,
  selectedIds: propTypes.arrayOf(propTypes.string),
};

export default DeleteUserForm;
