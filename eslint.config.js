import antfu from '@antfu/eslint-config';

export default antfu({
    ignores: ['docs'],
    stylistic: {
        indent: 4,
        semi: true,
        overrides: {
            'antfu/top-level-function': 'off',
        },
    },
    typescript: {
        overrides: {
            'ts/ban-ts-comment': 'off',
            'ts/prefer-ts-expect-error': 'off',
            'antfu/top-level-function': 'off',
        },
    },
});
