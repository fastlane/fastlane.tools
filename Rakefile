task :generate do
  require 'open-uri'
  require 'fileutils'
  content = open("https://raw.githubusercontent.com/fastlane/fastlane/master/Rakefile").read
  content = content.split("desc").first # only the first lines are relevant
  eval(content)
  tools = GEMS # we don't care about RAILS, since they're not mono repo
  puts "Generating short links for: \n#{tools.join(', ')}"

  tools.each do |current|
    FileUtils.mkdir(current) unless File.directory?(current)

    index = "
            <script type=\"text/javascript\">
              location.href = \"https://github.com/fastlane/fastlane/tree/master/#{current}\"
            </script>"
    File.write(File.join(current, "index.html"), index)
  end
end
