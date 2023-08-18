const config = {
    branches: ['main', 'next'],
    plugins: [
        '@semantic-release/commit-analyzer',
        {
            releaseRules: [
                { type: 'docs', scope: 'README', release: 'patch', emoji: '📝' },
                { type: 'refactor', release: 'patch', emoji: '♻️' },
                { type: 'style', release: 'patch', emoji: '💄' },
                { type: 'feat', release: 'minor', emoji: '✨' },
                { type: 'fix', release: 'patch', emoji: '🐛' },
            ],
        },
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        '@semantic-release/git',
        [
            {
                assets: ['dist/*.js', 'dist/*.ts', 'dist/*.map', 'package.json'],
                message: 'chore(release): ${nextRelease.version} [skip-ci]\n\n${nextRelease.notes}',
            },
        ],
        '@semantic-release/github',
    ],
};

module.exports = config;
