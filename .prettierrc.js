module.exports = {
    tabWidth: 4,
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
};
