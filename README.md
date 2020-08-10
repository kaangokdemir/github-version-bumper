# Github Version Bumper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bump your applications' version after each push.

```

## Usage

Create a `yaml` file in workflows folder.
```bash
touch .github/workflows/version.yml
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
        with:
          ref: ${{ github.ref }}
      - name: "cat package.json"
        run: cat ./package.json
      - name: "Setup Node.js"
        uses: "actions/setup-node@v1"
        with:
          node-version: 12
      - name: "GitHub Version Bumper"
        uses: "kaangokdemir/github-version-bumper@master"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_NAME: "Your Name"
          GITHUB_EMAIL: "your_email@gmail.com"
          VERSION_FILE_NAME: "your_version_file.json"
      - name: "cat package.json"
        run: cat ./package.json
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## TODO

- Currently only supports `json` need to support `yaml` an `toml` files as well.
- Currently only updates version key in json files. Make it customizable.
- Currently only patches the version. Minor and major versions could be updatable as well.
- Migrate to TypeScript.

## Contributors

Kaan Gökdemir - Author ([@kaangokdemir](https://twitter.com/kaangokdemir)) - [kaangokdemir.com](https://kaangokdemir.com)

## License

MIT
