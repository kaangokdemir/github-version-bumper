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
## Customize with commit messages

| Feature           	| Commit Includes           	| Old Version 	| New Version   	|
|-------------------	|---------------------------	|-------------	|---------------	|
| Default (Patches) 	| -                         	| 1.5.8       	| 1.5.9         	|
| Minor Bumping     	| [ci-bump minor]           	| 1.5.8       	| 1.6.0         	|
| Major Bumping     	| [ci-bump major]           	| 1.5.8       	| 2.0.0         	|
| Pre-releasing     	| [ci-bump pre="staging"]   	| 1.5.8       	| 1.5.8-staging 	|
| Exact Versioning  	| [ci-bump version="1.6.3"] 	| 1.5.8       	| 1.6.3         	|

## Environment Variables

| Environment Value 	| Description                                         	| Default                                          	|
|-------------------	|-----------------------------------------------------	|--------------------------------------------------	|
| `GITHUB_TOKEN`      	| Your authorized GitHub token                        	| `undefined`                                        	|
| `GITHUB_USER`       	| Your preferred GitHub display name                  	| `'GitHub Version Bumper'`                          	|
| `GITHUB_EMAIL`      	| Your GitHub account's email address to make commits 	| `'github-version-bumper@users.noreply.github.com'` 	|
| `VERSION_FILE_NAME` 	| The file where your version entry exists            	| `'package.json'`                                   	|
| `VERSION_ENTRY`     	| Entry key of your 'version'                         	| `'version'`                                        	|

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
