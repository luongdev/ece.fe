import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { useDispatch, useSelector } from 'react-redux';
import { Resize, ResizeHorizon } from 'react-resize-layout';
import { useReactToPrint } from 'react-to-print';
import Heading from '../../components/heading/heading';
import { PageHeader } from '../../components/page-headers/page-headers';
import { PaginationStyle, GlobalUtilityStyle } from '../styled';
import { caseDetailData } from '../../redux/manage-mail/case-detail/actionCreator';
import withAdminLayout from '../../layout/withAdminLayout';
import ContentCase from '../../components/manage-mail/content-case-detail';
import GeneralInfo from '../../components/manage-mail/tabs/general-info';
import Note from '../../components/manage-mail/tabs/note';
import ContentActivity from '../../components/manage-mail/content-activity-detail';
import { CASE_DETAIL_TAB } from '../../constants';

function CaseDetail() {
  const { caseId } = useParams();
  const componentRef = useRef(null);
  const [activeTab, setActiveTab] = useState(CASE_DETAIL_TAB.GENERAL_INFO);
  const [contentCase, setContentCase] = useState(CASE_DETAIL_TAB.CONTENT_CASE_DEFAULT_KEY);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(caseDetailData(caseId));
  }, [caseId]);

  const { data } = useSelector((states) => {
    return {
      data: states.dataCaseDetail.data,
    };
  });
  const printContentToPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangeContentCase = (key) => {
    setActiveTab(CASE_DETAIL_TAB.CONTENT_ACTIVITY);
    setContentCase(key);
  };

  const { caseInfo, caseActivity, caseNote } = data;

  const items = [
    {
      key: CASE_DETAIL_TAB.GENERAL_INFO,
      label: 'Thông tin chung',
      children: <GeneralInfo dataInfo={caseInfo} />,
    },
    {
      key: CASE_DETAIL_TAB.CONTENT_ACTIVITY,
      label: 'Nội dung Activity',
      children: (
        <ContentActivity value={caseActivity?.[contentCase]} handlePrint={printContentToPdf} ref={componentRef} />
      ),
    },
    {
      key: CASE_DETAIL_TAB.NOTE,
      label: 'Ghi chú',
      children: <Note dataNote={caseNote} />,
    },
  ];

  const handleTabChange = (atk) => {
    setActiveTab(atk);
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <GlobalUtilityStyle>
          <Row gutter={15}>
            <Col xs={24} className="mb-[25px]">
              <PaginationStyle>
                <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                    <Heading as="h4" className="text-lg font-medium mb-0">
                      <Link to="/list-email" className="bg-white">
                        <LeftOutlined /> Quay về màn hình trước
                      </Link>
                    </Heading>
                  </div>
                  <div className="p-[25px]" style={{ minHeight: '600px' }}>
                    <div className="flex items-center w-full mt-5 mb-[25px] md:flex-col gap-[15px]">
                      <Resize handleWidth="3px">
                        <ResizeHorizon width="45%">
                          {caseActivity?.map((value, index) => (
                            <ContentCase value={value} key={index} changeContentCase={handleChangeContentCase} />
                          ))}
                        </ResizeHorizon>
                        <ResizeHorizon>
                          <Tabs
                            defaultActiveKey={CASE_DETAIL_TAB.GENERAL_INFO}
                            activeKey={activeTab}
                            items={items}
                            onChange={handleTabChange}
                          >
                            {items.map((item) => (
                              <TabPane key={item.key} tab={item.label} />
                            ))}
                          </Tabs>
                        </ResizeHorizon>
                      </Resize>
                    </div>
                  </div>
                </div>
              </PaginationStyle>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </>
  );
}

export default withAdminLayout(CaseDetail);
