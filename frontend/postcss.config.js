module.exports = {
    plugins:
        process.env.NODE_ENV === 'production'
            ? {
                  'postcss-import': {},
                  tailwindcss: {},
                  autoprefixer: {},
                  // Next.js defaults
                  'postcss-flexbugs-fixes': {},
                  'postcss-preset-env': {
                      autoprefixer: {
                          flexbox: 'no-2009',
                          grid: 'autoplace',
                      },
                      stage: 3,
                      features: {
                          'custom-properties': false,
                      },
                  },
              }
            : {
                  'postcss-import': {},
                  tailwindcss: {},
                  autoprefixer: {},
              },
}
