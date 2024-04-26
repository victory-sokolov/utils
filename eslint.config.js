import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4,
        semi: true,
    },
    typescript: {
        overrides: {
            'ts/ban-ts-comment': 'off',
            'ts/prefer-ts-expect-error': 'off',
        },
    },
});
