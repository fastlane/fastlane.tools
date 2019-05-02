Run `fastlane generate` to generate the short links

```
https://fastlane.tools/sigh
```

### Making changes

fastlane uses an open source platform called Grow.  Follow the [installation instructions](https://github.com/grow/grow) to get started.

Once grow is installed, `cd` into `_grow` and run `grow install`.

Execute `grow run`, and open your browser to `http://localhost:8080`.

Once you're happy with your changes, run `grow deploy`, which will publish all changes to the root directory.

### Installation

grow requires Python 2. The suggested method for running specific versions of Python is [pyenv](https://github.com/pyenv/pyenv).

```
brew install pyenv
pyenv install 2.7.14
pyenv local 2.7.14
pip install grow
```
