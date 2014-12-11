---
layout: page
title: FAQ
weight: 10
---

### Why should I automate the release process?
- Save **days** of preparing app submission, uploading screenshots and releasing the app
- Colleague on vacation and a critical bugfix needs to be released? Don't rely on one person releasing updates

### Where should I start?
- Take a look at the project page of each project to get an overview over their functionality
- Install the gems you want to use
- Run ```fastlane init``` to get up and running
- Follow the steps from each project

### What is Continuous Deployment?
> Continuous Delivery (CD) is a design practice used in software development to automate and improve the process of software delivery
> 
> [Continuous Delivery on Wikipedia](https://en.wikipedia.org/wiki/Continuous_delivery)

Basically you want to deploy updates more often to the App Store to make it less painful and increase the quality of your app.

The more steps we developers have to do manually each release, the more mistakes we make. It’s a tedious, repeating task.

Using ```fastlane``` and its tools, you run one command to deploy an update of your app to the App Store.

### How does a Continuous Deployment setup look like?
Most projects make use of [Jenkins](http://jenkins-ci.org/) on a Mac to automatically generate new test builds for every commit. 
When integrating the ```fastlane``` tools you extent its functionality to also create new screenshots, release new app updates and send emails with the latest screenshots to the marketing team.

I’m working on a blog post about a good *Jenkins* setup. If you still see this line of text, please send me a message to remind me to finish this.