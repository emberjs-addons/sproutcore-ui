# SproutCore UI

SproutCore UI is the next generation User Interface layer built specifically for SproutCore 2.0. It provides a standardized set of components which can be used to build a consistent user experience that scales to different form factors.

# How to Run Unit Tests

1. gem install bundler

2. bundle

3. gem install bpm

4. bpm init

5. bpm add spade

6. spaderun preview

# Building SproutCore UI

1. Install Bundler via `gem install bundler`

2. Run `bundle install` to pull in Ruby dependencies.

3. Symlink the lib and test directories and package.json file into
   the packages/sproutcore-ui directory:

   ```mkdir packages/sproutcore-ui;
   cd packages/sproutcore-ui;
   ln -s ../../lib .;
   ln -s ../../tests .;
   ln -s ../../package.json .
   ```

4. Run `bundle exec rake` to build SproutCore UI. The build will be placed in the dist directory.

