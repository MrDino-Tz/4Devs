import {
  AppstoreOutlined,
  CreditCardOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  ThunderboltOutlined,
  WindowsOutlined
} from '@ant-design/icons';

// previews
import AlertShowcase from './components/Alert';
import ButtonShowcase from './components/Button';
import CardShowcase from './components/Card';
import InputShowcase from './components/Input';
import ModalShowcase from './components/Modal';
import TabsShowcase from './components/Tabs';

// copyable source
import alertCode from './components/Alert.jsx?raw';
import buttonCode from './components/Button.jsx?raw';
import cardCode from './components/Card.jsx?raw';
import inputCode from './components/Input.jsx?raw';
import modalCode from './components/Modal.jsx?raw';
import tabsCode from './components/Tabs.jsx?raw';

const MUI_DEPS = ['@mui/material', '@emotion/react', '@emotion/styled'];

export const UI_COMPONENTS = [
  {
    slug: 'button',
    name: 'Button',
    group: 'Actions',
    description: 'Primary, outlined and text buttons with icon support.',
    icon: ThunderboltOutlined,
    dependencies: [...MUI_DEPS, '@ant-design/icons'],
    preview: ButtonShowcase,
    code: buttonCode
  },
  {
    slug: 'card',
    name: 'Card',
    group: 'Content',
    description: 'Content cards for summaries, metrics and profiles.',
    icon: CreditCardOutlined,
    dependencies: [...MUI_DEPS, '@ant-design/icons'],
    preview: CardShowcase,
    code: cardCode
  },
  {
    slug: 'alert',
    name: 'Alert',
    group: 'Feedback',
    description: 'Inline success, info, warning and error messages.',
    icon: ExclamationCircleOutlined,
    dependencies: MUI_DEPS,
    preview: AlertShowcase,
    code: alertCode
  },
  {
    slug: 'input',
    name: 'Input',
    group: 'Forms',
    description: 'Text fields with validation hints and input adornments.',
    icon: FormOutlined,
    dependencies: [...MUI_DEPS, '@ant-design/icons'],
    preview: InputShowcase,
    code: inputCode
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    group: 'Navigation',
    description: 'Simple and icon tabs for switching between views.',
    icon: AppstoreOutlined,
    dependencies: [...MUI_DEPS, '@ant-design/icons'],
    preview: TabsShowcase,
    code: tabsCode
  },
  {
    slug: 'modal',
    name: 'Modal',
    group: 'Overlays',
    description: 'Confirmation and form dialogs for focused actions.',
    icon: WindowsOutlined,
    dependencies: MUI_DEPS,
    preview: ModalShowcase,
    code: modalCode
  }
];

export function getUIComponentBySlug(slug) {
  return UI_COMPONENTS.find((component) => component.slug === slug);
}
