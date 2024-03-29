import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { MenuOutlined } from '@ant-design/icons';
import { CSS } from '@dnd-kit/utilities';
import { Col, Form, Modal, Row, Space, Tooltip } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '../../buttons/buttons';
import {
  PREFIX_CUSTOMIZE_TABLE,
  LOCAL_STORAGE_VARIABLE,
  TITLE_MODAL_LIST_USER,
  BUTTON_MODAL_LIST_EMAIL,
  TOOLTIP_MODAL_LIST_USER,
} from '../../../constants/index';
import { Checkbox } from '../../checkbox/checkbox';
import { openNotificationWithIcon } from '../../notifications/notification';
import { submitCustomizeTable } from '../../../redux/manage-mail/customize-table/actionCreator';
import customizeTableOrigin from '../../../config/manage-mail/customize-table.json';
import { removeItem } from '../../../utility/localStorageControl';

function CustomizeTable({ showOrHideModalCustomizeTable, hideModal }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { customizeTableData } = useSelector((states) => {
    return {
      customizeTableData: states.customizeTable.config,
    };
  });

  const [state, setState] = useState({
    showOrHideModalCustomizeTable,
    customizeTableDragDrop: JSON.parse(JSON.stringify(customizeTableData)),
  });

  const [stateCheckBoxAll, setStateCheckBoxAll] = useState(false);

  const { customizeTableDragDrop } = state;

  const handelChangeOneCheckbox = (key) => {
    const index = customizeTableDragDrop.findIndex((i) => i.key === key);
    if (index === -1) return;
    customizeTableDragDrop[index].isChecked = !customizeTableDragDrop[index].isChecked;
    setState({ ...state, customizeTableDragDrop: [...customizeTableDragDrop] });
  };

  const handleCancelPopup = () => {
    hideModal();
    setState({ ...state, customizeTableDragDrop: JSON.parse(JSON.stringify(customizeTableData)) });
  };

  const handleChangeAllCheckBox = (isChecked) => {
    customizeTableDragDrop.map((el) => {
      el.isChecked = isChecked;
      return el;
    });
    setState({ ...state, customizeTableDragDrop: [...customizeTableDragDrop] });
  };

  const handleSubmit = (flag) => {
    const dataSet = flag === true ? [...customizeTableDragDrop] : JSON.parse(JSON.stringify(customizeTableOrigin));
    setStateCheckBoxAll(false);
    if (flag) {
      dispatch(
        submitCustomizeTable(
          dataSet,
          () => {
            hideModal();
            openNotificationWithIcon('success', 'Lưu thành công !');
            window.location.reload(true);
          },
          (err) => {
            openNotificationWithIcon('error', 'Lưu thất bại !', err.message);
          },
        ),
      );
    }
    removeItem(LOCAL_STORAGE_VARIABLE.DATA_FILTER_ADVENCE);
    setState({ ...state, customizeTableDragDrop: dataSet });
  };

  function SortRowItem(listElement) {
    const { elements } = listElement;
    const { key, isChecked } = elements;
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
      id: elements,
    });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <Form.Item key={key}>
        <Row ref={setNodeRef} style={style} {...attributes}>
          <Col span={2}>
            <Checkbox
              checked={isChecked}
              onChange={() => {
                handelChangeOneCheckbox(key);
              }}
            />
          </Col>
          <Col span={21} className="text-[13px]">
            <div>{t(`${PREFIX_CUSTOMIZE_TABLE}${key}`)}</div>
          </Col>
          <Col span={1}>
            <Tooltip
              title={<span className="text-[13px]">{t(`${TOOLTIP_MODAL_LIST_USER.DRAG_AND_DROP}`)}</span>}
              className="ant-table-cell drag-visible"
            >
              <MenuOutlined ref={setActivatorNodeRef} {...listeners} />
            </Tooltip>
          </Col>
        </Row>
      </Form.Item>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const activeIndex = customizeTableDragDrop.findIndex((item) => item.key === active.id.key);
      const overIndex = customizeTableDragDrop.findIndex((item) => item.key === over.id.key);
      const newCustomizeTaleData = arrayMove(customizeTableDragDrop, activeIndex, overIndex);
      setState({ ...state, customizeTableDragDrop: newCustomizeTaleData });
    }
  }

  return (
    <Modal
      style={{ fontSize: '13px !important', position: 'relative' }}
      title={<strong style={{ fontWeight: '1000' }}>{t(`${TITLE_MODAL_LIST_USER.CUSTOMIZE_TABLE}`)}</strong>}
      open={showOrHideModalCustomizeTable}
      onCancel={hideModal}
      maskClosable={false}
      footer={[
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          key="footerModalCustomizeTable"
        >
          <Button
            type="info"
            outlined
            key="setDefault"
            className="px-5 text-[13px] font-semibold button-reset h-10"
            onClick={() => handleSubmit(false)}
          >
            {t(`${BUTTON_MODAL_LIST_EMAIL.RESET}`)}
          </Button>
          <Space size="small">
            <Button
              outlined
              type="danger"
              key="cancelFilter"
              className="px-5 text-[13px] font-semibold button-reset h-10"
              onClick={() => handleCancelPopup()}
            >
              {t(`${BUTTON_MODAL_LIST_EMAIL.CANCEL}`)}
            </Button>
            <Button
              type="info"
              htmlType="submit"
              key="submitFilter"
              className="px-5 text-[13px] font-semibold button-reset h-10"
              onClick={() => handleSubmit(true)}
            >
              {t(`${BUTTON_MODAL_LIST_EMAIL.SAVE}`)}
            </Button>
          </Space>
        </div>,
      ]}
      width={600}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <div className="bg-white dark:bg-white10 m-0 p-0 rounded-10 relative modal-customize" key="kfgk">
          <div className="px-1.5">
            <Form name="contact">
              <Form.Item key="checkboxAll">
                <Row>
                  <Col span={2}>
                    <Checkbox
                      onChange={(isChecked) => {
                        setStateCheckBoxAll(isChecked);
                        handleChangeAllCheckBox(isChecked);
                      }}
                      checked={stateCheckBoxAll}
                    />
                  </Col>
                  <Col span={22} className="text-[13px]">
                    {t(`${PREFIX_CUSTOMIZE_TABLE}selectAll`)}
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item key="checkBox">
                <Row>
                  <Col span={2} />
                  <Col span={22} className="text-[13px]">
                    {t(`${PREFIX_CUSTOMIZE_TABLE}activityId`)}
                  </Col>
                </Row>
              </Form.Item>
              <SortableContext items={customizeTableDragDrop} strategy={rectSortingStrategy}>
                {customizeTableDragDrop.map((el, index) => (
                  <SortRowItem key={index} index={index} elements={el} />
                ))}
              </SortableContext>
            </Form>
          </div>
        </div>
      </DndContext>
    </Modal>
  );
}

CustomizeTable.propTypes = {
  showOrHideModalCustomizeTable: propTypes.bool.isRequired,
  hideModal: propTypes.func.isRequired,
};

export default CustomizeTable;
