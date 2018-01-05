Run `fastlane generate` to generate the short links

```
https://fastlane.tools/sigh
```

### Making changes

Fastlane uses an open source platform called Grow.  Follow the [installation instructions](https://github.com/grow/grow) to get started.

Once grow is installed, `cd` into `_grow` and run `grow install`.

Execute `grow run`, and open your browser to `http://localhost:8080`.

Once you're happy with your changes, run `grow deploy`, which will publish all changes to the root directory.