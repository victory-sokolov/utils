const config = {
    branches: ['main', 'next'],
    plugins: [
        '@semantic-release/commit-analyzer',
        {
            preset: 'angular',
            releaseRules: [
                {
                    type: 'docs',
                    scope: 'README',
                    release: 'patch',
                    emoji: '📝',
                },
                { type: 'refactor', release: 'patch', emoji: '♻️' },
                { type: 'style', release: 'patch', emoji: '🎨' },
                { type: 'feat', release: 'minor', emoji: '✨' },
                { type: 'fix', release: 'patch', emoji: '🐛' },
                { type: 'ci', release: 'patch', emoji: '👷' },
            ],
        },
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        '@semantic-release/npm',
        '@semantic-release/git',
        '@semantic-release/github',
    ],
};

module.exports = config;
