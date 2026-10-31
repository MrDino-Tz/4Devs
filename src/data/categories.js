// Category metadata shared by the dashboard hub and the sidebar navigation.
// `name` must match the category values used in `data/tools.js`.

import {
  ApiOutlined,
  FilePdfOutlined,
  FontSizeOutlined,
  KeyOutlined,
  LayoutOutlined,
  PictureOutlined,
  SwapOutlined,
  WifiOutlined
} from '@ant-design/icons';

export const TOOL_CATEGORIES = [
  {
    name: 'Text Tools',
    slug: 'text-tools',
    icon: FontSizeOutlined,
    color: 'primary',
    blurb: 'Transform, encode and decorate text.'
  },
  {
    name: 'Conversion Tools',
    slug: 'conversion-tools',
    icon: SwapOutlined,
    color: 'secondary',
    blurb: 'Convert formats, colors and encodings.'
  },
  {
    name: 'CryptOK',
    slug: 'cryptok',
    icon: KeyOutlined,
    color: 'success',
    blurb: 'Generate passwords, analyze strength and inspect signatures.'
  },
  {
    name: 'Image/Video',
    slug: 'image-video',
    icon: PictureOutlined,
    color: 'info',
    blurb: 'Resize, edit and generate visual assets.'
  },
  {
    name: 'OpenDoc',
    slug: 'opendoc',
    icon: FilePdfOutlined,
    color: 'error',
    blurb: 'Work with PDF pages and documents.'
  },
  {
    name: 'Dev Gun',
    slug: 'dev-gun',
    icon: ApiOutlined,
    color: 'warning',
    blurb: 'Everyday utilities for APIs, regex and files.'
  },
  {
    name: 'WiFi Shark',
    slug: 'wifi-shark',
    icon: WifiOutlined,
    color: 'info',
    blurb: 'Network diagnostics, subnets and wireless tools.'
  }
];

// Copy-paste component catalog shown under the User Interface category.
export const USER_INTERFACE_CATEGORY = {
  name: 'User Interface',
  slug: 'user-interface',
  icon: LayoutOutlined,
  color: 'secondary',
  blurb: 'Copy-paste MUI components for your next project.'
};

export const ALL_CATEGORIES = [...TOOL_CATEGORIES, USER_INTERFACE_CATEGORY];

export function getCategoryBySlug(slug) {
  return ALL_CATEGORIES.find((category) => category.slug === slug);
}
