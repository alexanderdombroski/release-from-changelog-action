// Main entry point for the GitHub Action
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
  try {
    // Get inputs from action.yml
    const changelogPath = core.getInput('changelog-path');
    const versionTag = core.getInput('version-tag');
    const token = core.getInput('github-token');

    core.info(`Reading changelog from: ${changelogPath}`);
    core.info(`Creating release for version: ${versionTag}`);

    // Read changelog file
    if (!fs.existsSync(changelogPath)) {
      throw new Error(`Changelog file not found: ${changelogPath}`);
    }

    const changelogContent = fs.readFileSync(changelogPath, 'utf8');
    
    // Extract version-specific content (basic implementation)
    // This is a placeholder - actual parsing logic can be added later
    const releaseBody = extractVersionContent(changelogContent, versionTag);

    // Create GitHub release using the API
    const octokit = github.getOctokit(token);
    const { context } = github;

    const release = await octokit.rest.repos.createRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: versionTag,
      name: versionTag,
      body: releaseBody,
      draft: false,
      prerelease: false
    });

    // Set outputs
    core.setOutput('release-url', release.data.html_url);
    core.setOutput('release-body', releaseBody);

    core.info(`Release created successfully: ${release.data.html_url}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

// Helper function to extract version content from changelog
function extractVersionContent(changelog, version) {
  // Basic implementation - extract content for the specified version
  // This can be enhanced with better parsing logic
  const lines = changelog.split('\n');
  const versionPattern = new RegExp(`##.*${version.replace(/^v/, '')}`, 'i');
  
  let startIndex = -1;
  let endIndex = lines.length;

  for (let i = 0; i < lines.length; i++) {
    if (versionPattern.test(lines[i])) {
      startIndex = i + 1;
    } else if (startIndex !== -1 && /^##\s/.test(lines[i])) {
      endIndex = i;
      break;
    }
  }

  if (startIndex === -1) {
    return `Release ${version}`;
  }

  return lines.slice(startIndex, endIndex).join('\n').trim();
}

run();
