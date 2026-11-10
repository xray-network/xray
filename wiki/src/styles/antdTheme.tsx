import { useState, useEffect } from "react"
import { theme, ConfigProvider, App } from "antd"
import { StyleProvider, px2remTransformer } from "@ant-design/cssinjs"
import type { ThemeConfig } from "antd"
import merge from "lodash/merge"
import EscapeAntd from "./escapeAntd"
import { fontFamily, metaThemeColor, palette, paletteDark, radius, semantic } from "./tokens"

export const colors = {
  white: palette.white,
  offWhite: palette.offWhite,
  black: palette.black,
  blue500: palette.blue[500],
  blue500dark: paletteDark.blue[500],
  blue300dark: paletteDark.blue[300],
  orange500: palette.orange[500],
  red500: palette.red[500],
  green500: palette.green[500],
  gray50: palette.gray[50],
  gray100: palette.gray[100],
  gray200: palette.gray[200],
  gray300: palette.gray[300],
  gray400: palette.gray[400],
  gray500: palette.gray[500],
  gray600: palette.gray[600],
  gray700: palette.gray[700],
  gray800: palette.gray[800],
  gray900: palette.gray[900],
  gray950: palette.gray[950],
  whitePopupShadow: semantic.light.popupShadow,
  darkPopupShadow: semantic.dark.popupShadow,
}

export const restTheme: Partial<ThemeConfig> = {
  token: {
    fontFamily,
    fontSize: 16,
    colorSuccess: colors.green500,
    colorWarning: colors.orange500,
    colorError: colors.red500,
    borderRadius: radius.base,
  },
  components: {
    Button: {
      contentFontSizeSM: 14,
      contentFontSize: 14,
      contentFontSizeLG: 16,
    },
    Input: {
      inputFontSizeSM: 14,
      inputFontSize: 16,
      inputFontSizeLG: 16,
    },
    InputNumber: {
      inputFontSizeSM: 14,
      inputFontSize: 16,
      inputFontSizeLG: 16,
    },
    Select: {
      fontSizeSM: 14,
      fontSize: 16,
      fontSizeLG: 16,
    },
    Switch: {
      fontSizeSM: 14,
      fontSize: 16,
      fontSizeLG: 16,
    },
    Radio: {
      fontSizeSM: 14,
      fontSize: 16,
      fontSizeLG: 16,
    },
    Tabs: {
      horizontalItemGutter: 25,
    },
    Modal: {
      borderRadiusLG: radius.lg,
    },
    Upload: {
      colorFillAlter: "transparent",
    },
  },
}

export const lightTheme: Partial<ThemeConfig> = {
  algorithm: theme.defaultAlgorithm,
  token: merge({}, restTheme.token, {
    colorPrimary: semantic.light.primary,
    colorInfo: semantic.light.primary,
    colorSuccess: semantic.light.success,
    colorWarning: semantic.light.warning,
    colorError: semantic.light.error,
    colorFillAlter: colors.offWhite,
    colorText: colors.black,
    colorBorder: colors.gray300,
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: colors.gray200,
      colorFillSecondary: colors.gray200,
      colorFillTertiary: colors.gray100,
      borderColorDisabled: colors.gray100,
      colorBgContainerDisabled: colors.gray100,
    },
    Modal: {
      colorBgMask: "rgba(240, 240, 242, .8)",
      boxShadow: colors.whitePopupShadow,
    },
    Select: {
      boxShadow: colors.whitePopupShadow,
    },
    Dropdown: {
      boxShadow: colors.whitePopupShadow,
    },
    Popover: {
      boxShadow: colors.whitePopupShadow,
    },
    Tooltip: {
      colorBgSpotlight: colors.gray950,
      boxShadow: colors.whitePopupShadow,
    },
    Skeleton: {
      gradientFromColor: colors.gray100,
      gradientToColor: colors.gray200,
    },
    Table: {
      borderColor: colors.gray100,
      rowHoverBg: colors.gray100,
      headerSortHoverBg: colors.gray100,
      headerSortActiveBg: colors.gray100,
      headerBg: "transparent",
      bodySortBg: "transparent",
      colorBgContainer: "transparent",
    },
    Spin: {
      colorBgContainer: "transparent",
    },
    Pagination: {
      itemBg: colors.gray100,
      colorBgTextHover: colors.gray200,
    },
    Drawer: {
      colorBgElevated: colors.white,
      colorBgMask: "rgba(250, 250, 252, .6)",
      boxShadowDrawerLeft: "none",
      boxShadowDrawerRight: "none",
      boxShadowDrawerDown: "none",
      boxShadowDrawerUp: "none",
    },
  }),
}

export const darkTheme: Partial<ThemeConfig> = {
  algorithm: theme.darkAlgorithm,
  token: merge({}, restTheme.token, {
    colorPrimary: semantic.dark.primary,
    colorInfo: semantic.dark.primary,
    colorSuccess: semantic.dark.success,
    colorWarning: semantic.dark.warning,
    colorError: semantic.dark.error,
    colorFillAlter: colors.black,
    colorText: colors.white,
    colorBorder: colors.gray700,
  }),
  components: merge({}, restTheme.components, {
    Button: {
      colorFill: colors.gray800,
      colorFillSecondary: colors.gray800,
      colorFillTertiary: colors.gray900,
      defaultBg: colors.black,
      defaultHoverBg: colors.black,
      defaultBorderColor: colors.gray700,
      borderColorDisabled: colors.gray900,
      colorBgContainerDisabled: colors.gray900,
    },
    Tabs: {
      itemActiveColor: colors.white,
      itemSelectedColor: colors.white,
      inkBarColor: colors.white,
      itemHoverColor: colors.gray300,
    },
    Tag: {
      defaultBg: "transparent",
    },
    Input: {
      colorBgContainer: colors.black,
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    InputNumber: {
      colorBgContainer: colors.black,
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    Modal: {
      contentBg: colors.black,
      colorBgMask: "rgba(19, 19, 24, .8)",
      boxShadow: colors.darkPopupShadow,
    },
    Message: {
      contentBg: colors.gray800,
    },
    Notification: {
      colorBgElevated: colors.gray800,
    },
    Select: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
      selectorBg: colors.black,
      colorBgElevated: colors.gray800,
      boxShadow: colors.darkPopupShadow,
    },
    Dropdown: {
      colorBgElevated: colors.gray800,
      boxShadow: colors.darkPopupShadow,
    },
    Popover: {
      colorBgElevated: colors.gray800,
      boxShadow: colors.darkPopupShadow,
    },
    Tooltip: {
      colorTextLightSolid: colors.black,
      colorBgSpotlight: colors.white,
      boxShadow: colors.darkPopupShadow,
    },
    Radio: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    Checkbox: {
      colorBgContainer: "transparent",
      colorBgContainerDisabled: colors.gray900,
      colorTextDisabled: colors.gray500,
    },
    Skeleton: {
      gradientFromColor: colors.gray950,
      gradientToColor: colors.gray800,
    },
    Table: {
      borderColor: colors.gray800,
      rowHoverBg: colors.gray900,
      headerSortHoverBg: colors.gray900,
      headerSortActiveBg: colors.gray900,
      headerBg: "transparent",
      bodySortBg: "transparent",
      colorBgContainer: "transparent",
    },
    Spin: {
      colorBgContainer: "transparent",
    },
    Pagination: {
      itemBg: colors.gray800,
      colorBgTextHover: colors.gray600,
    },
    Collapse: {
      colorBgContainer: "transparent",
    },
    Drawer: {
      colorBgElevated: colors.black,
      colorBgMask: "rgba(10, 10, 12, .6)",
      boxShadowDrawerLeft: "none",
      boxShadowDrawerRight: "none",
      boxShadowDrawerDown: "none",
      boxShadowDrawerUp: "none",
    },
  }),
}

export const px2rem = px2remTransformer({
  rootValue: 16,
  precision: 2,
})

const Theme = ({ children, theme }: { children: React.ReactNode; theme: "light" | "dark" }) => {
  const [antdTheme, setAntdTheme] = useState<Partial<ThemeConfig>>(lightTheme)

  useEffect(() => {
    const html = document?.querySelector("html")
    if (html) {
      const antdTheme = theme === "light" ? lightTheme : darkTheme
      setAntdTheme(antdTheme)
      html.setAttribute("data-disable-transitions", "true")
      html.setAttribute("data-theme", theme)
      html
        .querySelector("meta[name='theme-color']")
        ?.setAttribute("content", theme === "light" ? metaThemeColor.light : metaThemeColor.dark)
      setTimeout(() => {
        html.removeAttribute("data-disable-transitions")
      }, 500)
    }
  }, [theme])

  return (
    <ConfigProvider theme={antdTheme}>
      <App>
        <EscapeAntd />
      </App>
      <StyleProvider transformers={[px2rem]}>{children}</StyleProvider>
    </ConfigProvider>
  )
}

export default Theme
