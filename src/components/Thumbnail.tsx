// React component to render a picture thumbnail
import * as microsoftTeams from "@microsoft/teams-js";

export default function Thumbnail({ filename, category, listview }: { filename: string, category: string, listview?: Boolean }) {

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


    function onClick() {
        const tmInfo = {
            title: "Image Preview",
            Width: 400,
            height: 530,
            url: webroot + "/taskmodule?category=" + category + "&filename=" + filename + "&name=" + getImageName(filename)
        }
        microsoftTeams.tasks.startTask(tmInfo);
    }

    if (listview) return (
        <div className="tile-listview" >
            <img className="tile" src={"thumbnails/" + category + "/" + filename} width="50" height="50" title={getAttribution(filename)} alt={getImageName(filename)} onClick={onClick} />
            <p>{getAttribution(filename)}</p>
        </div>
    );
    else return (
        <img className="tile" src={"thumbnails/" + category + "/" + filename} width="100" height="100" title={getAttribution(filename)} alt={getImageName(filename)} onClick={onClick} />
    );
}