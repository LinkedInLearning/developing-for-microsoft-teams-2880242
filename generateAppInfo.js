// Generate lists of images and categories

var fs = require('fs');
var inputDir = "public/pictures";

var content = "";
content += "/* This file is generated - do not edit */\n\n"

// generate categories list
var categories = fs.readdirSync(inputDir);
content += "export var categories = [ \n";
for(var i=0; i< categories.length-1; i++)
  content += "  \"" + categories[i] + "\",\n";
content += "  \"" + categories[categories.length-1] + "\"\n";
content += "  ]; \n";
content += "\n";

// generate category picture lists
content += "export var categoryPictures : any = {\n";
for(var i=0; i< categories.length; i++) {
  var files = fs.readdirSync(inputDir + "/" + categories[i]);
  picturesarray = files.map(function(picture) {
    return "\n    \"" + picture + "\"";
  });
  content += "  \"" + categories[i] + "\": [" + picturesarray + "\n    ],\n";
}
content += "  }; \n";
content += "\n";

content += "\n";
fs.writeFileSync('src/GeneratedAppInfo.ts', content);
console.log('Saved GeneratedAppInfo.ts to src folder');
