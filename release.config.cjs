const config = {
    branches: ['main', 'next'],
    plugins: [
        '@semantic-release/commit-analyzer',
        {
            releaseRules: [
                { type: 'docs', scope: 'README', release: 'patch' },
                { type: 'refactor', release: 'patch' },
                { type: 'style', release: 'patch' },
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
                assets: ['dist/*.js', 'dist/*.ts', 'dist/*.map'],
                message: 'chore(release): ${nextRelease.version} [skip-ci]\n\n${nextRelease.notes}',
            },
        ],
        '@semantic-release/github',
    ],
};

module.exports = config;
