export default {
  name: 'collateral',
  title: 'Collaterals',
  type: 'document',
  fields: [
    {
      name: 'collateral',
      title: 'Item',
      type: 'string',
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

