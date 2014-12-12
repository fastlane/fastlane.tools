# Fastlane.tools

## Install jekyll
```
sudo gem install jekyll
```

## Run the server
```
jekyll s --watch
```

## Edit files:
Do **not** edit the files contained in ```_site```, they are automatically created and will be overwritten.

- To update the **HTML layout**, edit files inside ```_includes``` and ```_layouts```.
- To update the **CSS**, edit the files inside ```css``` or in ```_sass```
- To update the **text** of pages (landing page, FAQ), edit the ```.md``` files in the root
- To update the **posts**, edit the ```.md``` files inside ```_posts```
- To add or update **images**, use the ```assets```` folder, which can be referenced using ```/assets/name.png```