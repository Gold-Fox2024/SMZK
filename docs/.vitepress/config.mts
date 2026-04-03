// docs/.vitepress/config.mts
import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  lang: 'zh-CN',
  title: "数模智库",
  description: "数学建模学习与实战平台",
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '数学建模, 数模, 建模, Python, MATLAB, 算法, 评价模型, 优化模型' }],
    ['meta', { name: 'author', content: 'Gold-Fox2024' }]
  ],

  // 数学公式支持
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },

  themeConfig: {
    outlineTitle: '本页精要',
    // 开启本地搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索模型',
            buttonAriaLabel: '搜索模型'
          },
          modal: {
            displayDetails: '显示详情',
            noResultsText: '没找到相关模型...',
            resetButtonTitle: '清空',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '模型分类', link: '/models/evaluation/ahp' },
      { text: '比赛应用', link: '/applications/data-analysis' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Gold-Fox2024/SMZK' }
    ],

    // 侧边栏配置
    sidebar: {
      '/models/': [
        {
          text: '评价类模型',
          items: [
            { text: '层次分析法 (AHP)', link: '/models/evaluation/ahp' },
            { text: '模糊综合评价', link: '/models/evaluation/fuzzy' },
          ]
        },
        {
          text: '优化类模型',
          items: [
            { text: '线性规划', link: '/models/optimization/linear-programming' },
            { text: '整数规划', link: '/models/optimization/integer' },
          ]
        }
      ]
    }
  }
})