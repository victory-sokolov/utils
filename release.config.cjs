const config = {
    branches: ['main', 'next'],
    plugins: [
        '@semantic-release/commit-analyzer',
        {
            preset: 'angular',
            releaseRules: [
                {
                    emoji: '📝',
                    release: 'patch',
                    scope: 'README',
                    type: 'docs',
                },
                { emoji: '♻️', release: 'patch', type: 'refactor' },
                { emoji: '🎨', release: 'patch', type: 'style' },
                { emoji: '✨', release: 'minor', type: 'feat' },
                { emoji: '🐛', release: 'patch', type: 'fix' },
                { emoji: '👷', release: 'patch', type: 'ci' },
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
