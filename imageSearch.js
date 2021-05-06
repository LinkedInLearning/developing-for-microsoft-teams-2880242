const { categoryPictures } = require('./GeneratedAppInfo.js');

function imageSearch(query) {
  var results = [];
  for (var category in categoryPictures) {
    for (var i in categoryPictures[category]) {
      var imageFile = categoryPictures[category][i];
      var name = imageName(imageFile);
      if (name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        results.push(imageFile);
    }
  }
  return results;
}

function imageName(imageFile) {
  var name = imageFile;
  if (name.indexOf("__") >= 0) name = name.substr(0, name.indexOf("__"));
  name = name.replace(/_/g, " ");
  return name;
}

module.exports.imageSearch = imageSearch;
module.exports.imageName = imageName;
