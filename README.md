# Github Version Bumper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bump your applications' version after each push.


## Usage

Create a `yaml` file in workflows folder.
```bash
mkdir -p .github/workflows && touch .github/workflows/version.yaml
```

And configure your settings
```yaml
name: "Bump Version"

on:
  push:
    branches:
      - "master"
jobs:
  bump-version:
    name: "Bump Version on master"
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout source code"
        uses: "actions/checkout@v2"
      - name: "GitHub Version Bumper"
        uses: "kaangokdemir/github-version-bumper@master"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_NAME: "Your Name"
          GITHUB_EMAIL: "your_email@gmail.com"
          VERSION_FILE_NAME: "your_version_file.json"
```
For major and minor bumping, use `[ci-bump major]` or `[ci-bump minor]` in your commit message like:

```git

git commit -m "[ci-bump major] This is a major feature"
```

after pushing or merging into your branch, major versioning would happen instead patching.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## TODO

- Currently only supports `json` need to support `yaml` an `toml` files as well.

## Contributors

Kaan Gökdemir - Author ([@kaangokdemir](https://twitter.com/kaangokdemir)) - [kaangokdemir.com](https://kaangokdemir.com)

## License

MIT
