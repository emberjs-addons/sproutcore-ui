require "bundler/setup"
require "sproutcore"
require "erb"
require "uglifier"

LICENSE = File.read("generators/license.js")

SproutCore::Compiler.intermediate = "tmp/intermediate"
SproutCore::Compiler.output       = "tmp/static"

def compile_package_task(package)
  js_tasks = SproutCore::Compiler::Preprocessors::JavaScriptTask.with_input "lib/**/*.js", "."
  SproutCore::Compiler::CombineTask.with_tasks js_tasks, "#{SproutCore::Compiler.intermediate}/#{package}"
end

namespace :sproutcore do
    task :ui => compile_package_task("sproutcore-ui-build")
end

task :build => ["sproutcore:ui"]

file "tmp/static/sproutcore-ui.js" => :build do
  File.open("tmp/static/sproutcore-ui.js", "w") do |file|
    file.puts File.read("tmp/static/sproutcore-ui-build.js")
  end
end

file "tmp/static/sproutcore-ui.stripped.js" => "tmp/static/sproutcore-ui.js" do
  File.open("tmp/static/sproutcore-ui.stripped.js", "w") do |file|
    sproutcore = File.read("tmp/static/sproutcore-ui.js")
    sproutcore.gsub!(%r{^\s*require\(['"]([^'"])*['"]\);?\s*$}, "")
    file.puts sproutcore
  end
end

file "tmp/sproutcore-ui.js" => "tmp/static/sproutcore-ui.stripped.js" do
  File.open("tmp/sproutcore-ui.js", "w") do |file|
    file.puts File.read("tmp/static/sproutcore-ui.stripped.js")
  end
end

file "tmp/sproutcore-ui.min.js" => "tmp/sproutcore-ui.js" do
  File.open("tmp/sproutcore-ui.min.js", "w") do |file|
    uglified = Uglifier.compile(File.read("tmp/sproutcore-ui.js"))
    file.puts "#{LICENSE}\n#{uglified}"
  end
end

$threads = []

trap "INT" do
  $threads.each(&:kill)
end

VERSION = "2.0"

def spade_update_task(package)
  path = "packages/#{package}"
  dest = "#{path}/spade-boot.js"
  source = Dir["#{path}/**/*.js"] - ["#{path}/spade-boot.js"]

  file dest => source do
    Dir.chdir(path) { sh "spadepkg update" }
  end
end

def spade_build_task(package, version=VERSION)
  path = "packages/#{package}"
  dest = "#{path}/#{package}-#{version}.spd"
  source = Dir["#{path}/**/*.js"] - ["#{path}/spade-boot.js"]

  file dest => source do
    Dir.chdir(path) { sh "spadepkg build" }
  end
end

def spade_install_task(build_task)
  package = File.basename(build_task.name).sub(/\.spd$/, '')

  dest = File.expand_path("~/.spade/gems/#{package}/package.json")

  file dest => build_task do
    Dir.chdir(File.dirname(build_task.name)) do
      sh "spadepkg install #{package}"
    end
  end
end

def spade_preview_task(package, deps)
  task package => deps do
    $threads << Thread.new { sh "cd packages/#{package} && spaderun preview" }
    sleep 3
    sh "open http://localhost:4020/test_#{package}.html"
    $threads.each(&:join)
  end
end

def generate_test_files(package)
  html_dest = "packages/#{package}/test_#{package}.html"
  html_source = "generators/tests.html.erb"

  js_dest = "packages/#{package}/tests/all.js"
  js_source = "generators/all.js.erb"

  { js_source => js_dest, html_source => html_dest }.each do |source, dest|
    file dest => source do
      template = File.read(source)
      erb = ERB.new(template)

      File.open(dest, "w") do |file|
        file.puts erb.result(binding)
      end
    end
  end

  qunit_dest = "packages/#{package}/tests/qunit.js"
  qunit_css_dest = "packages/#{package}/tests/qunit-style.css"

  file qunit_dest => "generators/qunit.js" do
    File.open(qunit_dest, "w") do |file|
      file.puts File.read("generators/qunit.js")
    end
  end

  file qunit_css_dest => "generators/qunit-style.css" do
    File.open(qunit_css_dest, "w") do |file|
      file.puts File.read("generators/qunit-style.css")
    end
  end

  [js_dest, html_dest, qunit_dest, qunit_css_dest]
end

task :closure_docs do
  rm_rf "packages_docs"
  mkdir_p "packages_docs"
  cp_r "packages", "packages_docs"

  Dir["packages_docs/**/*.js"].each do |file|
    body = File.read(file)

    File.open(file, "w") do |f|
      f.puts "(function() {\n#{body}\n})()\n"
    end
  end

  rm_rf Dir["packages_docs/packages/**/tests"]
  rm_rf Dir["packages_docs/packages/sproutcore-ui"]
end

namespace :test do
  ui_spade_boot  = spade_update_task "sproutcore-ui"

  scui_package         = spade_build_task "sproutcore-ui"
  scui_installed       = spade_install_task scui_package
  scui_test_files      = generate_test_files "sproutcore-ui"

  spade_preview_task "sproutcore-ui",      [ui_spade_boot] + scui_test_files
end

task :default => ["tmp/sproutcore-ui.min.js"]

