# Release from Changelog Action

A GitHub Action that reads your changelog file and creates a GitHub release with the version-specific content.

## Usage

Add this step to your workflow to automatically create releases from your changelog whenever a tag is pushed:

```yaml
name: Create Release
on:
  push:
    tags:
      - "*.*.*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          fetch-tags: true

      # build/deploy steps

      - uses: alexanderdombroski/release-from-changelog-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }} # Required
```

You can add an attachment to upload with the release.

```yaml
with:
  attachment-path: dist/main.js
```

You can update the changelog path (case sensitive). The default is `CHANGELOG.md`.

```yaml
with:
  changelog-path: "RELEASE_NOTES.md"
```

## Requirements

- `runs-on` should be some form of linux, or `awk` many not be able to read the changelog
- Be sure to specify `fetch-depth` and `fetch-tags` on the checkout step

## Changelog Format

The action expects your changelog to somewhat follow recommended [keepachangelog](https://keepachangelog.com/) format with version headers.

Any of these examples will work if the tags match exactly. Must include at least `## [<tag>]` before each release.

```markdown
## [NEW_RELEASE] - 2025-04-01

- New release. We forgot which one we're on or what we updated.

## [v1.5.7]

This update added several new features, but maybe we should have used bullet points.

## [1.0.0] - 2025-01-01

- Feature: Added new functionality
- Fix: Resolved bug

## [v0.9] - 2024-12-01

### Added

- Initial release

### Fixed

- Several bugs
```

You can use this [vscode snippet](https://github.com/alexanderdombroski/release-from-changelog-action/blob/main/.vscode/markdown.code-snippets) to help create changelog releases.

## License

[![License](https://img.shields.io/github/license/alexanderdombroski/release-from-changelog-action)](https://github.com/alexanderdombroski/release-from-changelog-action?tab=MIT-1-ov-file#readme)
