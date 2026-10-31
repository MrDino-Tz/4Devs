import { MoneyCollectOutlined } from '@ant-design/icons';

const icons = { MoneyCollectOutlined };

const currencyTools = {
  id: 'group-currency-tools',
  title: 'Currency',
  type: 'group',
  children: [
    {
      id: 'currency-converter',
      title: 'Currency Converter',
      type: 'item',
      url: '/app/tools/conversion/currency-converter',
      icon: icons.MoneyCollectOutlined,
      breadcrumbs: false
    }
  ]
};

export default currencyTools;
