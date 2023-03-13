import { useState } from "react";

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const DetailGallery = ({photos}) => {
    const [index, setIndex] = useState(-1);

    const photosRender = [];
    photos.map((image, i) => {
        photosRender.push({
            src : image,
            width: 800,
            height: 600
        });
    });

    const slides = photosRender.map(({ src, width, height }) => ({
        src,
        width,
        height
    }));

    return (
        <>
            <PhotoAlbum photos={photosRender} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} />
            <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </>
    )
}

export default DetailGallery;