import colors from 'vuetify/es5/util/colors';
import serveStatic from 'serve-static';

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - nuxt',
        title: 'nuxt',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ],

    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/css/reset.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/axios.js',
        '~/plugins/loader.js',
        '~/plugins/bus.js',
        '~/plugins/customRouter',
        '~/plugins/importDialogComponents.js',


    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        // '@nuxtjs/auth',
        '@nuxtjs/auth-next',
    ],


    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        standalone: true,
        extend(config, ctx) {
            // config.devtool = 'eval-source-map'
            if (ctx.isDev && ctx.isClient) {
                config.devtool = 'eval-source-map'
            }
        }
    },
    router: {
        middleware: ['class', 'auth', 'admin'],
        // middleware: ['class']
    }
    ,
    axios: {
        baseURL: 'http://localhost:8000',
        credentials: true,
    },
    auth: {
        localStorage: false,
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                },
                user: {
                    property: 'user',
                },
                endpoints: {
                    login: {url: '/api/user/login', method: 'post'},
                    user: {url: '/api/user', method: 'get'},
                    logout: {url: '/api/user/logout', method: 'get'},

                },
                redirect: {
                    login: '/login',
                    logout: '/login',
                    callback: '/dashboard',
                    home: '/dashboard',
                }
            },
            customStrategy: {
                scheme: '~/schemes/customScheme',
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                },
                user: {
                    property: 'user',
                },
                endpoints: {
                    login: {url: '/api/admin/login', method: 'post'},
                    user: {url: '/api/admin/user', method: 'get'},
                    logout: {url: '/api/admin/user/logout', method: 'post'},

                },
                redirect: {
                    login: '/admin/login',
                    logout: '/admin/login',
                    callback: '/admin/login',
                    home: '/admin',
                }
            }
        },
    },
    watchLoggedIn: true,
    loading: {
        color: '#fff',
        height: '5px'
    },
    ssr: true,
    target: 'static',
    serverMiddleware: [
        '~/server-middleware/admin.js'
    ]
}
