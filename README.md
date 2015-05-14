# Fastlane.tools website

## Setup

In order to get started you will need to set up Ruby and Node.js. With these
tools available you can install the necessary dependencies and ultimately
run the tool `grunt` which uses the `Gruntfile` to prepare the files for
the website.

### Ruby Setup

In the root folder there is a file named `Gemfile` which is used by the Ruby
bundler which manages dependencies. If that is not installed you can run the 
following command to install it.

```
sudo gem install bundler
```

Once the bundler is installed you can run it.

```
bundle
```

The dependencies will be installed so you can use them for the next step.

### Node.js Setup

You can download Node.js from the website.

https://nodejs.org/download/

Once it is installed you can use `npm` to install the dependencies listed
in package.json.

`npm install`

### Run Grunt

Once the dependencies for Ruby and Node.js are installed you can run `grunt` 
to start watching the source files which will trigger build tasks to produce
the necessary output.
