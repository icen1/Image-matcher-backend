const dist = require("sharp-phash/distance");

export function distance(image0, image1) {
    return dist(image0.hash, image1.hash);
}
