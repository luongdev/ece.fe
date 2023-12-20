import { FIELD_TYPE, CONDITION_VALUE } from '../../constants';

const configFilterAdvance = [
  {
    key: 'caseId',
    placeholder: 'Nhập case id',
    fieldType: FIELD_TYPE.TEXT,
    conditionValue: CONDITION_VALUE.MATCH,
    conditionKey: 'caseIdCondition',
    conditionOption: [
      {
        value: CONDITION_VALUE.MATCH,
        label: 'Trùng khớp',
      },
      {
        value: CONDITION_VALUE.INCLUDE,
        label: 'Bao gồm',
      },
    ],
  },
  {
    key: 'activityId',
    placeholder: 'Nhập activity id',
    fieldType: FIELD_TYPE.TEXT,
    conditionValue: CONDITION_VALUE.MATCH,
    conditionKey: 'activityIdCondition',
    conditionOption: [
      {
        value: CONDITION_VALUE.MATCH,
        label: 'Trùng khớp',
      },
      {
        value: CONDITION_VALUE.INCLUDE,
        label: 'Bao gồm',
      },
    ],
  },
  {
    key: 'subject',
    placeholder: 'Nhập subject',
    fieldType: FIELD_TYPE.TEXT,
    conditionValue: CONDITION_VALUE.MATCH,
    conditionKey: 'subjectCondition',
    conditionOption: [
      {
        value: CONDITION_VALUE.MATCH,
        label: 'Trùng khớp',
      },
      {
        value: CONDITION_VALUE.INCLUDE,
        label: 'Bao gồm',
      },
    ],
  },
  {
    key: 'from',
    placeholder: 'Nhập email from',
    fieldType: FIELD_TYPE.TEXT,
    conditionKey: 'fromCondition',
    conditionValue: CONDITION_VALUE.MATCH,
    conditionOption: [
      {
        value: CONDITION_VALUE.MATCH,
        label: 'Trùng khớp',
      },
      {
        value: CONDITION_VALUE.INCLUDE,
        label: 'Bao gồm',
      },
    ],
  },
  {
    key: 'to',
    placeholder: 'Nhập email to',
    fieldType: FIELD_TYPE.TEXT,
    conditionValue: CONDITION_VALUE.MATCH,
    conditionKey: 'toCondition',
    conditionOption: [
      {
        value: CONDITION_VALUE.MATCH,
        label: 'Trùng khớp',
      },
      {
        value: CONDITION_VALUE.INCLUDE,
        label: 'Bao gồm',
      },
    ],
  },
  {
    key: 'assignedTo',
    fieldType: FIELD_TYPE.SELECT,
    mode: 'multiple',
    placeholder: 'Chọn assigned to',
    option: [
      {
        label: 'System',
        value: 'system',
      },
    ],
  },
  {
    key: 'createOn',
    fieldType: FIELD_TYPE.DATE,
  },
  {
    key: 'subStatus',
    fieldType: FIELD_TYPE.SELECT,
    placeholder: 'Chọn SubStatus',
    option: [
      {
        label: 'Completed - Done',
        value: 'done',
      },
      {
        label: 'Assigned - InProcess',
        value: 'process',
      },
    ],
  },
  {
    key: 'queueName',
    fieldType: 'SELECT',
    mode: 'multiple',
    placeholder: 'Chọn Queue Name',
    option: [],
  },
  {
    key: 'priority',
    fieldType: 'SELECT',
    placeholder: 'Chọn priority',
    option: [
      {
        label: 'Chọn priority',
      },
    ],
  },
  {
    key: 'file',
    fieldType: 'SELECT',
    placeholder: 'Chọn có / không',
    option: [
      {
        value: 'true',
        label: 'Có',
      },
      {
        value: 'false',
        label: 'Không',
      },
    ],
  },
  {
    key: 'direction',
    fieldType: 'SELECT',
    placeholder: 'Chọn hướng email',
    option: [
      {
        label: 'Mail nhận',
        value: 'received',
      },
      {
        label: 'Mail gửi',
        value: 'send',
      },
    ],
  },
];

export default configFilterAdvance;
