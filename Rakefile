require "bundler/setup"
require "sproutcore"
require "erb"
require "uglifier"

LICENSE = File.read("generators/license.js")

## Some SproutCore modules expect an exports object to exist. Until bpm exists,
## just mock this out for now.

module SproutCore
  module Compiler
    class Entry
      def body
        "\n(function(exports) {\n#{@raw_body}\n})({});\n"
      end
    end
  end
end

## HELPERS ##

def strip_require(file)
  result = File.read(file)
  result.gsub!(%r{^\s*require\(['"]([^'"])*['"]\);?\s*$}, "")
  result
end

def strip_sc_assert(file)
  result = File.read(file)
  result.gsub!(%r{^(\s)+sc_assert\((.*)\).*$}, "")
  result
end

def uglify(file)
  uglified = Uglifier.compile(File.read(file))
  "#{LICENSE}\n#{uglified}"
end

SproutCore::Compiler.intermediate = "tmp/intermediate"
SproutCore::Compiler.output       = "tmp/static"

def compile_package_task(package)
  js_tasks = SproutCore::Compiler::Preprocessors::JavaScriptTask.with_input "packages/#{package}/lib/**/*.js", "."
  SproutCore::Compiler::CombineTask.with_tasks js_tasks, "#{SproutCore::Compiler.intermediate}/#{package}"
end

namespace :sproutcore do
  task :ui => compile_package_task("sproutcore-ui")
end

task :build => ["sproutcore:ui"]

file "dist/sproutcore-ui.js" => :build do
  puts "Generating sproutcore-ui.js"

  mkdir_p "dist"

  File.open("dist/sproutcore-ui.js", "w") do |file|
    file.puts strip_require("tmp/static/sproutcore-ui.js")
  end
end

# Minify dist/sproutcore-ui.js to dist/sproutcore-ui.min.js
file "dist/sproutcore-ui.min.js" => "dist/sproutcore-ui.js" do
  puts "Generating sproutcore-ui.min.js"
  
  File.open("dist/sproutcore-ui.prod.js", "w") do |file|
    file.puts strip_sc_assert("dist/sproutcore-ui.js")
  end

  File.open("dist/sproutcore-ui.min.js", "w") do |file|
    file.puts uglify("dist/sproutcore-ui.prod.js")
  end
  rm "dist/sproutcore-ui.prod.js"
end

desc "Build SproutCore UI"
task :dist => ["dist/sproutcore-ui.min.js"]

desc "Clean artifacts from previous builds"
task :clean do
  sh "rm -rf tmp && rm -rf dist"
end

SC_VERSION = "2.0"

task :default => :dist
