import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


const config: Config = {
    title: 'MicroVisionChain Documentation',
    tagline: 'The Blockchain for Web3',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-site.example.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'mvclabs', // Usually your GitHub org/user name.
    projectName: 'MicroVisionChain', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', "zh-CN"],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            defaultMode: 'dark',
        },
        navbar: {
            title: 'MVC Labs',
            logo: {
                alt: 'My Site Logo',
                src: 'img/microvisionchain.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'introSidebar',
                    position: 'left',
                    label: 'Start',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'nodesSidebar',
                    position: 'left',
                    label: 'Nodes',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'miningSidebar',
                    position: 'left',
                    label: 'Mining',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'blockchainSidebar',
                    position: 'left',
                    label: 'Blockchain',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'contractSidebar',
                    position: 'left',
                    label: 'Contract',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'toolsSidebar',
                    position: 'left',
                    label: 'Tools',
                },
                {
                    to: '/blog',
                    label: 'Blog',
                    position: 'left'
                },
                {
                    type: 'localeDropdown',
                    position: 'right',
                },
                {
                    href: 'https://github.com/mvc-labs/mvc-knowledge-base',
                    label: 'Help Improve Page',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/docs/intro',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Discord',
                            href: 'https://discord.gg/kUfdH6ZMNV',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/mvcglobal',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/mvc-labs',
                        },
                    ],
                },
            ],

            copyright: `Copyright © ${new Date().getFullYear()} MVC Labs, Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
        algolia: {
            // The application ID provided by Algolia
            appId: 'YOUR_APP_ID',

            // Public API key: it is safe to commit it
            apiKey: 'YOUR_SEARCH_API_KEY',

            indexName: 'YOUR_INDEX_NAME',

            // Optional: see doc section below
            contextualSearch: true,

            // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
            externalUrlRegex: 'external\\.com|domain\\.com',

            // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
            replaceSearchResultPathname: {
                from: '/docs/', // or as RegExp: /\/docs\//
                to: '/',
            },

            // Optional: Algolia search parameters
            searchParameters: {},

            // Optional: path for search page that enabled by default (`false` to disable it)
            searchPagePath: 'search',

            //... other Algolia params
        },
    } satisfies Preset.ThemeConfig
};

export default config;
