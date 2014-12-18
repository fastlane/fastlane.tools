---
layout: page
permalink: /
title: Fastlane
weight: 0
---

Fastlane.tools
--------
So you can focus on the release party, instead of the actual release

### [fastlane](https://github.com/KrauseFx/fastlane)
> Define the whole deployment process of your app and run them in Jenkins.

### [deliver](https://github.com/KrauseFx/deliver)
> Upload app screenshots, app metadata and ipa files to iTunes Connect using just one command.

### [snapshot](https://github.com/KrauseFx/snapshot)
> Automatically take screenshots of your iOS app on all devices in multiple languages.

### [frameit](https://github.com/KrauseFx/frameit)
> Add a device frame around your screenshots for your website or print.

### [PEM](https://github.com/KrauseFx/frameit)
> You have to look up how to create a PEM file for your push server every year? No more!

### [sigh](https://github.com/KrauseFx/sigh)
> Sigh... having code signing issues again? Let sigh create and maintain provisioning profiles for you.


What's fastlane?
----------------
- Define deployment pipelines for beta builds, App Store releases and in house distributions.
- Store your app configuration once. Used by all tools.
- Plugin based architecture: Third party tools like [CocoaPods](http://cocoapods.org) and [xctool](https://github.com/facebook/xctool) are already integrated.
- Jenkins integration: See what part of the deployment takes a long time or causes problems.
- A setup, which creates all needed configuration files for you.
- Dynamic configuration: The newly introduced ```Fastfile``` is a flexible Ruby file, which can be extended to fit your needs.

### Example ```Fastfile```
{% highlight ruby %}
lane :appstore do
  puts "Ready to deploy to the App Store"
  xctool          # run unit tests
  snapshot        # create new screenshots
  sigh            # download/generate the latest provisioning profile
  deliver         # upload the screenshots, metadata and app to Apple
        
  frameit         # add device frames around the screenshots

  sh "./upload_screenshots_to_s3.sh"
  say "Successfully depoyed new version to the App Store!"
end
{% endhighlight %}
From now on, you can just run ```fastlane appstore``` to run **tests**, create new **screenshots**, download the required **provisioning profile**, **upload** everything to the App Store, add **device frames** around the screenshots and upload all generated screenshots to **AWS S3** to share with the rest of the team.


Why should I automate?
----------------------

- Save **days** of preparing app submission, uploading screenshots and releasing the app
- Deploy from any computer, even your Continuous Integration server
- Implement a **Continuous Deployment** process. Just trigger ```fastlane``` and you're good to go
- Store **everything** in git. Never look up the used build commands in the ```Jenkins``` configs again
- Never remember any difficult commands, just ```fastlane```
- Define different ```deployment lanes``` for App Store deployment, beta builds or testing