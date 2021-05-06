const { categoryPictures } = require('./GeneratedAppInfo.js');

function imageSearch(query) {
  var results = [];
  for (var category in categoryPictures) {
    for (var i in categoryPictures[category]) {
      var imageFile = categoryPictures[category][i];
      var name = imageName(imageFile);
      if (name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        results.push(category + "/" + imageFile);
    }
  }
  return results;
}

function imageName(imageFile) {
  var name = imageFile;
  if (imageFile.indexOf("/") >= 0) name = name.substr(name.indexOf("/")+1);
  if (name.indexOf("__") >= 0) name = name.substr(0, name.indexOf("__"));
  name = name.replace(/_/g, " ");
  return name;
}

function imageCategory(imageFile) {
  var category = "";
  if (imageFile.indexOf("/") >= 0) category = imageFile.substr(0, imageFile.indexOf("/"));
  category = category.replace(/_/g, " ");
  return category;
}

module.exports.imageSearch = imageSearch;
module.exports.imageName = imageName;
module.exports.imageCategory = imageCategory;
