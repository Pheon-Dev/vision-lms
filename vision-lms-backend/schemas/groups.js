export default {
  name: 'groups',
  title: 'Groups',
  type: 'document',
  fields: [
    {
      name: 'groupName',
      title: 'Group Name',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'groupInitiatorName',
      title: 'Group Initiator Name',
      type: 'string',
    },
    {
      name: 'groupInitiatorId',
      title: 'Group Initiator ID',
      type: 'string',
    },
    {
      name: 'groupInitiatorPhone',
      title: 'Group Initiator Phone',
      type: 'string',
    },
    {
      name: 'groupLeaderName',
      title: 'Group Leader Name',
      type: 'string',
    },
    {
      name: 'groupLeaderId',
      title: 'Group Leader ID',
      type: 'string',
    },
    {
      name: 'groupLeaderPhone',
      title: 'Group Leader Phone',
      type: 'string',
    },
    {
      name: 'group',
      title: 'Group',
      type: 'string',
    },
    // {
    //   name: 'groupMembers',
    //   title: 'Group Members',
    //   type: 'array',
    //   of: [{
    //     type: 'groupMembers'
    //   }
    //   ],
    // }
  ],
};

