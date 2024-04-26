import antfu from '@antfu/eslint-config';

export default antfu({
    ignores: ['docs'],
    stylistic: {
        indent: 4,
        semi: true,
        overrides: {
            'antfu/top-level-function': 'off',
            'style/arrow-parens': 'off',
            'curly': 'off',
            'style/brace-style': 'off',
            'antfu/if-newline': 'off',
        },
    },
    yaml: {
        overrides: {
            'yaml/indent': 'off',
        },
    },
    typescript: {
        overrides: {
            'ts/ban-ts-comment': 'off',
            'ts/prefer-ts-expect-error': 'off',
            'antfu/top-level-function': 'off',
            'no-unmodified-loop-condition': 'off',
        },
    },
});
