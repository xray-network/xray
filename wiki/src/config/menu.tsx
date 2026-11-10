import {
  BuildingLibraryIcon,
  ChartBarIcon,
  LifebuoyIcon,
  CodeBracketIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  CursorArrowRippleIcon,
  HeartIcon,
  CubeIcon,
  DocumentCheckIcon,
  Squares2X2Icon,
  WrenchScrewdriverIcon,
  RssIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"

export const menuConfig = [
  {
    text: "Homepage",
    link: "/",
  },
  {
    text: "General",
    collapsed: false,
    items: [
      {
        text: "XRAY Tokenomics",
        link: "/xray-tokenomics",
        icon: <BuildingLibraryIcon strokeWidth={2} />,
        description: "Overview of XRAY tokenomics",
      },
      {
        text: "Ecosystem Metrics",
        link: "/ecosystem-metrics",
        icon: <ChartBarIcon strokeWidth={2} />,
        description: "Key metrics and statistics about the XRAY ecosystem",
      },
      {
        text: "Roadmap",
        link: "/roadmap",
        icon: <LifebuoyIcon strokeWidth={2} />,
        description: "Project roadmap and milestones",
      },
      {
        text: "Latest Updates",
        link: "/latest-updates",
        icon: <CodeBracketIcon strokeWidth={2} />,
        description: "Recent developments and updates",
      },
      {
        text: "Github Updates",
        link: "/github-updates",
        icon: <CodeBracketIcon strokeWidth={2} />,
        description: "Latest commits and activity on GitHub",
      },
      {
        text: "Social Media",
        link: "/social-media",
        icon: <ShareIcon strokeWidth={2} />,
        description: "Links to our social media channels",
      },
      {
        text: "Install App (PWA)",
        link: "/install-app-pwa",
        icon: <ArrowDownTrayIcon strokeWidth={2} />,
        description: "Instructions to install the XRAY/App as a PWA",
      },
    ],
  },
  {
    text: "Ecosystem",
    collapsed: false,
    items: [
      {
        text: "XRAY/Network",
        link: "/xray-network",
        icon: <CubeIcon strokeWidth={2} />,
        description: "Details about the XRAY network",
      },
      {
        text: "XRAY/Foundation",
        link: "/xray-foundation",
        icon: <HeartIcon strokeWidth={2} />,
        description: "Information about the XRAY Foundation",
      },
      {
        text: "XRAY/App",
        link: "/xray-app",
        icon: <CursorArrowRippleIcon strokeWidth={2} />,
        description: "Information about the XRAY/App",
      },
      {
        text: "XRAY/Vault",
        link: "/xray-vault",
        icon: <DocumentCheckIcon strokeWidth={2} />,
        description: "Details about XRAY/Vault",
      },
      {
        text: "Mini Apps",
        link: "/mini-apps",
        icon: <Squares2X2Icon strokeWidth={2} />,
        description: "Explore the Mini Apps ecosystem",
      },
    ],
  },
  {
    text: "Developers",
    collapsed: false,
    items: [
      {
        text: "XRAY/Builder",
        link: "/dev/xray-builder",
        icon: <WrenchScrewdriverIcon strokeWidth={2} />,
        description: "Tools and resources for building on XRAY",
      },
      {
        text: "XRAY/Graph",
        link: "/dev/xray-graph",
        icon: <RssIcon strokeWidth={2} />,
        description: "Graph-related development resources for XRAY",
      },
      {
        text: "XRAY/Vault",
        link: "/dev/xray-vault",
        icon: <CodeBracketIcon strokeWidth={2} />,
        description: "Development resources for XRAY/Vault",
      },
      {
        text: "Mini Apps SDK",
        link: "/dev/mini-apps-sdk",
        icon: <WrenchScrewdriverIcon strokeWidth={2} />,
        description: "SDK and tools for Mini Apps development",
      },
      {
        text: "CardanoWeb3.js",
        link: "/dev/cardano-web3-js",
        icon: <WrenchScrewdriverIcon strokeWidth={2} />,
        description: "JavaScript library for Cardano dApp development",
      },
    ],
  },
  {
    text: "Legal",
    collapsed: false,
    items: [
      {
        text: "Terms of Service",
        link: "/terms-of-service",
        icon: <InformationCircleIcon strokeWidth={2} />,
        description: "Terms of service and user agreements",
      },
      {
        text: "Privacy Policy",
        link: "/privacy-policy",
        icon: <InformationCircleIcon strokeWidth={2} />,
        description: "Privacy and data protection policies",
      },
    ],
  },
]
