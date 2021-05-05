const { categoryPictures } = require('./GeneratedAppInfo.js');

function imageSearch(query) {
  var results = [];
  for (var category in categoryPictures) {
    for (var i in categoryPictures[category]) {
      var imageName = categoryPictures[category][i];
      if (imageName.indexOf("__") >= 0)
        imageName = imageName.substr(0, imageName.indexOf("__"));
      if (imageName.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        results.push(imageName.replace(/_/g, " "));
    }
  }
  return results;
}

module.exports.imageSearch = imageSearch;
