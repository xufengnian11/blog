import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WeiJin's blog",
  description: "魏晋的前端开发之旅",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '笔记', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Vue',
        collapsed: true,
        items: [
          { text: 'Vue3', link: '/vue/vue3' },
          { text: 'Vue2', link: '/vue/vue2' }
        ]
      },
      {
        text: 'Vite',
        collapsed: true,
        items: [
          { text: 'Vite', link: '/vite/vite' }
        ]
      },
      {
        text: 'danger',
        collapsed: true,
        items: [
          { text: 'danger', link: '/danger/danger' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xufengnian11/blog' }
    ],
    editLink: {
      pattern: "https://github.com/xufengnian11/blog",
      text: "Edit this page on Gitlab",
    },
    lastUpdatedText: "上次更新",
  }
})
