var fs = require('fs');

module.exports = function (options) {
	opts = options || {
			outputPath: './src/jspm-imports.js'
		};

	return function posthtmlJspmConfigGenerator(tree){
		var newFileContent = ['\'use strict\'\;'];
		
		tree.match({ tag: 'script' }, function(node) {
			if (typeof node.content !== 'undefined'){
				var rawContent = node.content;
				var strContent = rawContent.toString();

				if (strContent.indexOf('System.import') >= 0 ) {
					var fileUrl = strContent.match(/\"([^()]+)\"|\'([^()]+)\'/g);
					var jspmConfUrl = 'import ' + fileUrl.toString() + '';
				}
				newFileContent.push(jspmConfUrl)
			}
		});

		if (newFileContent.length > 1 ) {
			fs.writeFile(opts.outputPath, newFileContent.join('\n'), function (err) {
				if (err){
					return console.log(err);
				}
				console.log('jspm config file created!');
			});
		}
	};
};
