import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ea54c',
    primaryColorHover: '#36AD6A',
    primaryColorPressed: '#0C7A43',
    primaryColorSuppl: '#36AD6A',
    borderRadius: '12px',
    fontSizeSmall: '12px',
    fontSizeMedium: '14px',
    fontSizeLarge: '16px',
    fontWeightStrong: '600',
    lineHeight: '1.5',
  },

  Layout: {
    color: '#f8fafc',
    headerColor: '#ffffff',
    siderColor: '#ffffff',
    footerColor: '#f8fafc',
  },

  Card: {
    color: '#ffffff',
    borderColor: 'transparent',
    borderRadius: '16px',
    paddingSmall: '12px',
    paddingMedium: '16px',
    paddingLarge: '24px',
    paddingHuge: '32px',
    titleFontSizeSmall: '16px',
    titleFontSizeMedium: '18px',
    titleFontSizeLarge: '22px',
    titleFontSizeHuge: '26px',
  },

  Button: {
    borderRadiusSmall: '8px',
    borderRadiusMedium: '12px',
    borderRadiusLarge: '16px',
    heightSmall: '28px',
    heightMedium: '36px',
    heightLarge: '44px',
  },

  Input: {
    borderRadius: '12px',
    heightSmall: '28px',
    heightMedium: '36px',
    heightLarge: '44px',
    border: '1px solid #e2e8f0',
    borderHover: '1px solid #cbd5e1',
    borderFocus: '1px solid #1ea54c',
    boxShadowFocus: '0 0 0 3px rgba(30, 165, 76, 0.15)',
    color: '#ffffff',
    colorFocus: '#ffffff',
  },

  Menu: {
    itemHeight: '36px',
    borderRadius: '8px',
    itemColorActive: '#1ea54c18',
    itemTextColorActive: '#1ea54c',
    itemColorHover: '#00000008',
    itemTextColor: '#334155',
    itemTextColorHover: '#1e293b',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '400px' },
    },
  },

  Notification: {
    borderRadius: '12px',
  },

  Tag: {
    borderRadius: '6px',
  },

  Switch: {
    railColorActive: '#1ea54c',
  },

  Slider: {
    fillColor: '#1ea54c',
    fillColorHover: '#36AD6A',
  },

  Progress: {
    fillColor: '#1ea54c',
    borderRadius: '4px',
  },

  Popover: {
    borderRadius: '12px',
  },

  Drawer: {
    borderRadius: '0 16px 16px 0',
  },

  Tabs: {
    tabBorderRadius: '8px 8px 0 0',
    barColor: '#1ea54c',
    tabTextColorActiveLine: '#1ea54c',
  },

  Divider: {
    color: '#e2e8f0',
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4ade80',
    primaryColorHover: '#6ee7a1',
    primaryColorPressed: '#22c55e',
    primaryColorSuppl: '#6ee7a1',
    borderRadius: '12px',
    fontSizeSmall: '12px',
    fontSizeMedium: '14px',
    fontSizeLarge: '16px',
    fontWeightStrong: '600',
    lineHeight: '1.5',
    bodyColor: '#121212',
    textColorBase: '#e2e8f0',
    textColor1: '#f1f5f9',
    textColor2: '#cbd5e1',
    textColor3: '#94a3b8',
    borderColor: '#2d2d2d',
    dividerColor: '#2d2d2d',
    tableColor: '#1e1e1e',
    modalColor: '#1e1e1e',
    popoverColor: '#1e1e1e',
    actionColor: '#1e1e1e',
    inputColor: '#1e1e1e',
    cardColor: '#1e1e1e',
  },

  Layout: {
    color: '#121212',
    headerColor: '#1e1e1e',
    siderColor: '#1e1e1e',
    footerColor: '#121212',
    headerBorderColor: '#2d2d2d',
    siderBorderColor: '#2d2d2d',
  },

  Card: {
    color: '#1e1e1e',
    borderColor: '#2d2d2d',
    borderRadius: '16px',
    paddingSmall: '12px',
    paddingMedium: '16px',
    paddingLarge: '24px',
    paddingHuge: '32px',
    titleFontSizeSmall: '16px',
    titleFontSizeMedium: '18px',
    titleFontSizeLarge: '22px',
    titleFontSizeHuge: '26px',
  },

  Button: {
    borderRadiusSmall: '8px',
    borderRadiusMedium: '12px',
    borderRadiusLarge: '16px',
    heightSmall: '28px',
    heightMedium: '36px',
    heightLarge: '44px',
    colorHover: '#ffffff0a',
    colorPressed: '#ffffff12',
  },

  Input: {
    borderRadius: '12px',
    heightSmall: '28px',
    heightMedium: '36px',
    heightLarge: '44px',
    border: '1px solid #2d2d2d',
    borderHover: '1px solid #3d3d3d',
    borderFocus: '1px solid #4ade80',
    boxShadowFocus: '0 0 0 3px rgba(74, 222, 128, 0.15)',
    color: '#1e1e1e',
    colorFocus: '#1e1e1e',
  },

  Menu: {
    itemHeight: '36px',
    borderRadius: '8px',
    itemColorActive: '#4ade8018',
    itemTextColorActive: '#4ade80',
    itemColorHover: '#ffffff08',
    itemTextColor: '#94a3b8',
    itemTextColorHover: '#e2e8f0',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '400px', color: '#1e1e1e' },
    },
  },

  Notification: {
    color: '#2d2d2d',
    borderRadius: '12px',
  },

  Tag: {
    borderRadius: '6px',
  },

  Switch: {
    railColorActive: '#4ade80',
  },

  Slider: {
    fillColor: '#4ade80',
    fillColorHover: '#6ee7a1',
  },

  Progress: {
    fillColor: '#4ade80',
    borderRadius: '4px',
  },

  Popover: {
    borderRadius: '12px',
  },

  Drawer: {
    borderRadius: '0 16px 16px 0',
  },

  Tabs: {
    tabBorderRadius: '8px 8px 0 0',
    barColor: '#4ade80',
    tabTextColorActiveLine: '#4ade80',
  },

  Divider: {
    color: '#2d2d2d',
  },

  Table: {
    tdColor: '#1e1e1e',
    thColor: '#2d2d2d',
  },
};
