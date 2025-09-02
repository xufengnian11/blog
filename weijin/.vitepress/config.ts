import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WeiJin's blog",
  description: "魏晋的前端开发之旅",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "http://atjoss.df0535.cn/diy/super/2025/7/19/1752911840191.jpeg",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "http://atjoss.df0535.cn/diy/super/2025/7/19/1752911840191.jpeg",
    nav: [
      { text: "Home", link: "/" },
      { text: "笔记", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        collapsed: true,
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Vue",
        collapsed: true,
        items: [
          { text: "Vue3", link: "/vue/vue3" },
          { text: "Vue2", link: "/vue/vue2" },
        ],
      },
      {
        text: "TypeScript",
        collapsed: true,
        items: [
          { text: "初识 Ts", link: "/ts/initial" },
          { text: "细嗦 tsconfig.json", link: "/ts/tsconfig" },
          { text: "常见类型", link: "/ts/familiar" },
        ],
      },
      {
        text: "Vite",
        collapsed: true,
        items: [{ text: "Vite", link: "/vite/vite" }],
      },
      {
        text: "Tool-Chain",
        collapsed: true,
        items: [
          { text: "Prettier", link: "/tool-chain/prettier" },
          { text: "Eslint", link: "/tool-chain/eslint" },
        ],
      },
      {
        text: "danger",
        collapsed: true,
        items: [{ text: "danger", link: "/danger/danger" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/xufengnian11/blog" },
    ],
    editLink: {
      pattern: "https://github.com/xufengnian11/blog",
      text: "Edit this page on Gitlab",
    },
    lastUpdatedText: "上次更新",
  },
});
