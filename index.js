function VersionTimestamp (config) {
    this.config = Object.assign({
        path: 'config/timestamp.php',
        content: '<?php return ["ts" => #TS#];'
    }, config);
}

VersionTimestamp.prototype.apply = function (compiler) {
    compiler.plugin('done', () => {
        let content = this.config.content.replace('#TS#', Date.now() / 1000 | 0)

        require('fs').writeFileSync(this.config.path, content, {
            encoding: 'utf8',
            flat: 'rs'
        });
    });
};

module.exports = VersionTimestamp;
