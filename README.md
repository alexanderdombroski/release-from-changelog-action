# Release from Changelog Action

A GitHub Action that reads your changelog file and creates a GitHub release with the version-specific content.

## Usage

Add this step to your workflow to automatically create releases from your changelog:

```yaml
name: Create Release
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Release from Changelog
        uses: alexanderdombroski/release-from-changelog-action@v1
        with:
          changelog-path: 'CHANGELOG.md'  # Optional, default is CHANGELOG.md
          version-tag: ${{ github.ref_name }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

- **`changelog-path`** (optional): Path to your changelog file. Default: `CHANGELOG.md`
- **`version-tag`** (required): The version tag to create a release for (e.g., `v1.0.0`)
- **`github-token`** (required): GitHub token for authentication. Use `${{ secrets.GITHUB_TOKEN }}`

## Outputs

- **`release-url`**: URL of the created GitHub release
- **`release-body`**: The content extracted from the changelog

## Changelog Format

The action expects your changelog to follow a standard format with version headers:

```markdown
## [1.0.0] - 2025-01-01
- Feature: Added new functionality
- Fix: Resolved bug

## [0.9.0] - 2024-12-01
- Initial release
```

## License

MIT License - see [LICENSE](LICENSE) for details
