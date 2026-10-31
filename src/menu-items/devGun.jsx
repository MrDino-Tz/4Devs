import { ApiOutlined, AuditOutlined, FileTextOutlined } from '@ant-design/icons';

const devGun = {
  id: 'group-dev-gun',
  title: 'Dev Gun',
  type: 'group',
  children: [
    {
      id: 'pigeon-api',
      title: 'Pigeon API',
      type: 'item',
      url: '/app/tools/dev-gun/pigeon-api',
      icon: ApiOutlined,
      breadcrumbs: false
    },
    {
      id: 'regex-tester',
      title: 'Regex Tester',
      type: 'item',
      url: '/app/tools/dev-gun/regex-tester',
      icon: AuditOutlined,
      breadcrumbs: false
    },
    {
      id: 'file-meta-reader',
      title: 'File Meta Reader',
      type: 'item',
      url: '/app/tools/dev-gun/file-meta-reader',
      icon: FileTextOutlined,
      breadcrumbs: false
    }
  ]
};

export default devGun;
