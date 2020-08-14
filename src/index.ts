import { bumpVersion } from './helpers/bumper'
import { Toolkit } from 'actions-toolkit'

// Change working directory if user defined PACKAGEJSON_DIR
if (process.env.PACKAGEJSON_DIR) {
  process.env.GITHUB_WORKSPACE = `${process.env.GITHUB_WORKSPACE}/${process.env.PACKAGEJSON_DIR}`
  process.chdir(process.env.GITHUB_WORKSPACE)
}

// Run your GitHub Action!
Toolkit.run(async (tools) => {
  const fileName = process.env.VERSION_FILE_NAME || 'package.json'

  const commitMessage = 'version bumped to v'

  try {
    // SET USER
    await tools.runInWorkspace('git', [
      'config',
      'user.name',
      `"${process.env.GITHUB_USER || 'GitHub Version Bumper'}"`,
    ])
    await tools.runInWorkspace('git', [
      'config',
      'user.email',
      `"${
        process.env.GITHUB_EMAIL ||
        'github-version-bumper@users.noreply.github.com'
      }"`,
    ])

    const currentBranch = /refs\/[a-zA-Z]+\/(.*)/.exec(
      process.env.GITHUB_REF as string,
    )?.[1] as string

    await tools.runInWorkspace('git', ['checkout', currentBranch])

    // Getting last commit information
    const lastCommit =
      JSON.stringify(await tools.runInWorkspace('git', ['log', '-1'])) || ''

    console.log('lastcommitmessage', lastCommit)

    // Bumping Starts

    if (lastCommit.includes('[ci-bump version=')) {
      const splitted = lastCommit.split('[ci-bump version=\\"')

      console.log('splitted', splitted)
      console.log('splitted-0', splitted[0])
      console.log('splitted-1', splitted[1])
      const version = splitted[1].split('\\"')[0]
      await bumpVersion(fileName, { version })
    } else if (lastCommit.includes('[ci-bump pre=')) {
      const splitted = lastCommit.split('[ci-bump pre=\\"')
      console.log('splitted', splitted)
      console.log('splitted-0', splitted[0])
      console.log('splitted-1', splitted[1])
      const pre = splitted[1].split('\\"')[0]
      console.log('pre:', pre)

      await bumpVersion(fileName, { pre })
    } else if (lastCommit.includes('[ci-bump major]')) {
      console.log('major')
      await bumpVersion(fileName, { major: true })
    } else if (lastCommit.includes('[ci-bump minor]')) {
      console.log('minor')
      await bumpVersion(fileName, { minor: true })
    } else {
      console.log('patch')
      await bumpVersion(fileName)
    }

    const newVersion = JSON.parse(tools.getFile(fileName)).version

    await tools.runInWorkspace('git', [
      'commit',
      '-a',
      '-m',
      `ci: ${commitMessage} ${newVersion}`,
    ])

    // PUSH THE CHANGES
    const remoteRepo = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`
    await tools.runInWorkspace('git', ['tag', newVersion])
    await tools.runInWorkspace('git', ['push', remoteRepo, '--follow-tags'])
    await tools.runInWorkspace('git', ['push', remoteRepo, '--tags'])
  } catch (e) {
    tools.log.fatal(e)
    tools.exit.failure('Failed to bump version')
  }
  tools.exit.success('Version bumped!')
})
