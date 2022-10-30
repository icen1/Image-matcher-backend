import Image from "@entities/Image";
import dataSource from "@services/dataSource";
import { distance } from "@shared/imageUtil";

export async function list(): Promise<Image[]> {
    return dataSource.manager.find(Image);
}

export async function trim(data: Image[], max?: number, page?: number) {
    return max ? data.slice(max * (page ?? 0), max * (page ?? 0) + max) : data;
}

export function weightedRandom<T>(items: T[], weights: number[]): T {
    let i;

    for (i = 0; i < weights.length; i++) {
        weights[i] += weights[i - 1] || 0;
    }

    const random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) break;
    }

    return items[i];
}

export async function random(weighted?: boolean): Promise<Image | null> {
    if (!weighted) return dataSource.manager.createQueryBuilder(Image, 'image')
        .select()
        .orderBy('RANDOM()')
        .getOne();
    const images: Image[] = await list();
    const weights: number[] = images.map((image: Image) =>  image.likes && image.likes > 0 ? Math.floor(Math.log(image.likes)) + 1 : 1);
    return weightedRandom(images, weights);
}

export async function get(id: string): Promise<Image | null> {
    return dataSource.manager.findOne(
        Image,
        { where: { id } },
    );
}

export async function getSimilar(image: Image): Promise<Image[]> {
    return (await dataSource.manager.find(Image))
        .sort((a: Image, b: Image) =>
            distance(a, image) - distance(b, image)
        );
}
