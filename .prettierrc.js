module.exports = {
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    jsxBracketSameLine: true,
    overrides: [
        {
            files: '*.vue',
            options: {
                htmlWhitespaceSensitivity: 'ignore',
                vueIndentScriptAndStyle: false,
                printWidth: 900,
            },
        },
    ],
}
