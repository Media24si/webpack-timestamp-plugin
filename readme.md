# webpack-timestamp-plugin
Simple plugin for adding timestamps to your resources.

Alternative for Laravel mix `.version()` when changing the filename could break things due to caching.
This way the filename stays the same and timestamp changes after cache clears.

A config file is generated that returns `return ["ts" => TIMESTAMP];`.

## Installation
```
npm install --save-dev webpack-timestamp-plugin
yarn add --dev webpack-timestamp-plugin
```

## Usage
#### Example *webpack.config.js*
```javascript
const VersionTimestamp = require('webpack-timestamp-plugin');

module.exports = {
    plugins: [
        new VersionTimestamp()
    ]
}
```

#### Example *webpack.mix.js*:
```javascript
const { mix } = require('laravel-mix');
const VersionTimestamp = require('webpack-timestamp-plugin');

mix.webpackConfig({
    plugins: [
        new VersionTimestamp()
    ]
});

mix.js('app.js')
    .sass('app.scss');
```

This will create a file `config/timestamp.php` at the end of the build process.
You should put this file into `.gitignore`.

## Configuration
```
new VersionTimestamp({
    path: 'timestamp.json',
    content: '{ ts: #TS# }'
})
```
Where `#TS#` is wildcard that will be replaced by the timestamp.

## In template
#### Example *layout.blade.php*
```html
<link rel="stylesheet" href="/styles.css?ts={{ config('timestamp.ts', 0) }}" />
<script src="/scripts.js?ts={{ config('timestamp.ts', 0) }}" type="text/javascript"></script>
```

#### Using with Lumen framework
Assuming you haven't changed default directory, add `$app->configure('timestamp');` to your `boostrap/app.php` file.

#### Other
If not using Laravel or Lumen you need an alternative to `config()` function what will read the contents from generated file.
