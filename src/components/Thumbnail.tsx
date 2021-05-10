// React component to render a picture thumbnail
import * as microsoftTeams from "@microsoft/teams-js";

export default function Thumbnail({ filename, category, listview, liked, onChangeLike }: { filename: string, category: string, listview?: Boolean, liked?: Boolean, onChangeLike?: any }) {

    var webroot = (typeof window === "undefined") ? "https://{{HOSTNAME}}" : window.location.protocol + "//" + window.location.host;

    function removeImageExtension(image: string) {
        if (image.endsWith(".jpg") || image.endsWith(".png") || image.endsWith(".gif"))
            return image.substr(0, image.length - 4);
        return image;
    }

    function getImageName(image: string) {
        var imageName = image;
        var bars = image.indexOf("__");
        if (bars > 0) imageName = image.substr(0, bars);
        imageName = imageName.replace(/_/g, " ");
        return removeImageExtension(imageName);
    }

    function getAttribution(image: string) {
        var attrib = "anonymous";
        var bars = image.indexOf("__");
        if (bars > 0) attrib = removeImageExtension(image.substr(image.indexOf("__") + 2).replace(/_/g, " "));
        return getImageName(image) + " - " + attrib;
    }

    function submitHandler(err: string, result: string) {
        if (onChangeLike)
            onChangeLike(result === "true", filename);
    }

    function onClick() {
        const tmInfo = {
            title: getImageName(filename),
            Width: 530,
            height: 500,
            url: webroot + "/taskmodule?category=" + category + "&filename=" + filename + "&name=" + getImageName(filename) + "&liked=" + liked
        }
        microsoftTeams.tasks.startTask(tmInfo, submitHandler);
        //if (onChangeLike) onChangeLike(!liked, filename); // toggle like status
    }

    if (listview) return (
        <div className="tile-listview" >
            <img className="tile" src={"thumbnails/" + category + "/" + filename} width="50" height="50" title={getAttribution(filename)} alt={getImageName(filename)} onClick={onClick} />
            <p>{getAttribution(filename)}</p>
        </div>
    );
    else return (
        <div className="tile-div">
            <img className="tile" src={"thumbnails/" + category + "/" + filename} width="100" height="100" title={getAttribution(filename)} alt={getImageName(filename)} onClick={onClick} />
            {liked && <img className="tile-icon" src="heart.png" width="15" height="15" title="liked" alt="heart logo" />}
        </div>
    );
}