import type Image from '@entities/Image';

export default function distance(image0: Image, image1: Image): number {
    const a = image0.hash;
    const b = image1.hash;
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            count++;
        }
    }
    return count;
}
