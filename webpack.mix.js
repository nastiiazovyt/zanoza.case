const mix = require('laravel-mix');

mix.setPublicPath('./');
mix.disableNotifications();

if (mix.inProduction()) {
    mix
        .options({
            processCssUrls: false,
            postCss: [
                require('autoprefixer'),
                require('cssnano')({
                    preset: [
                        'default', {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                })
            ]
        })
    ;
}

mix
    .sass('src/scss/main.scss', 'assets/css/')
    .options({
        processCssUrls: false,
    })
;


mix
    .js('src/js/app', 'assets/js/')
    .version()
;


mix.browserSync({
    files: [
        './**/*.php',
        './blocks/**/*.php',
        './assets/**/*.(js|css)'
    ],
    watch: true,
    host: 'localhost',
    //Домен на локальном сервере
    proxy: 'zanoza.case'
});

