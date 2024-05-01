# Account Research Bot

This is a simple RAG application that allows users to upload PUBLIC pdf files about companies and then ask questions to a bot about the information in those files.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Install Backend

To install the backend run the following commands in the [backend](backend) directory

```bash
pip install poetry==1.6.1
poetry install --no-interaction --no-ansi
poetry shell
```

## Usage

### Run Backend

To start the backend run the following commands in the [backend](backend) directory

```bash
langchain serve
```

## Contributing

We welcome contributions from everyone. Here are some ways you can make a difference:

1. **Report bugs**: Create a [new issue](https://github.com/ctcac00/account-research-bot/issues/new) and describe the problem.
2. **Fix bugs**: Check out the [open issues](https://github.com/ctcac00/account-research-bot/issues) and feel free to submit a pull request.
3. **Improve documentation**: Help us clarify the project's documentation, from typos to new content.
4. **Suggest new features**: Have an idea for a new feature? Let us know by creating an issue.

To get started with your contribution, follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b new-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin new-feature`).
5. Create a new Pull Request.

Thank you for your interest in contributing!

## License

See [LICENSE](./LICENSE)
