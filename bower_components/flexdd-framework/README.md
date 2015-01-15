# Flexdd Framework

Welcome to Flexdd, a starting point for web based projects. The idea is simple, to be modular and only require what you need. It is the result of working with small to medium sized based projects and is based upon the framework developed at Forepoint and various practices/objects Harry Roberts has introduced to web development. 

## Why use it

Over the years my personal requirements for a front end framework has changed. Currently every framework has pros and cons but aren't perfect for my requirements. I decided to create my own combining the bits I like from different frameworks and resources from across the web. 

It may not be perfect for you but it works well for what I use it for. I've kept things modular using a similar pattern to Inuit's CSS and architecture principles adopted in the PHP community.

Credit is given where I have used someone elses work including work from Harry Roberts, The Guardian and Forepoint.

## Features

* Component based framework.
* Scalable OOCSS.
* Browser IE9+.
* Support for React.JS and jQuery.
* UI Components.

## Getting Started

It's super simple to get started.

Just include `flexdd-framework` as a dependency in your bower.json file, run `bower install` and let the magic happen.

This will include the framework as a bower_component which you can then include in your own project. The reason for this is that the framework should not force you into working a certain method.

There are four ways the framework can be used.

* Reference the individual framework components in your projects bower.json file. `bower install 'flexdd-base-* --save-dev` then include the bower_components within your Sass file. This method allows you to specify your own dependencies. 
* Reference the framework in your projects bower.json file. `bower install 'flexdd-framework'` then include the bower_component `_flexdd.scss` in your Sass file. This method assumes what components you will require.
* If you are using a similar architecture to Instagram's website then each component also has a .css which you include depending on what page you are on. [Talk on Instagrams architecture](https://www.youtube.com/watch?v=eCf5CquV_Bw)
* Use the Yeoman generator to build up the projects structure with what you need.
