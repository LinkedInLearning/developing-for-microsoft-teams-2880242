// Generate thumbnail images from source images in pictures folder.

var fs = require('fs');
var inputDir = "pictures";
var outputDir = "thumbnails";
const thumbnail_size = 100;
const sharp = require('sharp'); // image resizer library

if (!fs.existsSync("./" + outputDir))
  fs.mkdirSync("./" + outputDir, 0744);

// generate categories list
var categories = fs.readdirSync(inputDir);
categories.forEach(function (category) {
  if (!fs.existsSync("./" + outputDir + "/" + category))
    fs.mkdirSync("./" + outputDir + "/" + category, 0744);
  var files = fs.readdirSync(inputDir + "/" + category);
  files.forEach(function (file) {
    var inputFile = "./" + inputDir + "/" + category + "/" + file;
    var outputFile = "./" + outputDir + "/" + category + "/" + file;
    if (!(inputFile.endsWith(".jpg") || inputFile.endsWith(".png") || inputFile.endsWith(".gif"))) {
      console.log("invalid filetype: " + inputFile);
    } else {
      console.log("Generating thumbnail: " + inputFile + " ==> " + outputFile + ", " + outputFile);
      sharp(inputFile).resize(thumbnail_size, thumbnail_size).sharpen()
        .toFile(outputFile, (err, info) => { if (err) console.log("Sharp error: " + err + " [" + info + "]") });
    }
  });
});