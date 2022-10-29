import { Router, Request, Response } from 'express';
import dataSource from "@services/dataSource";
import Image from "@entities/Image";
import { distance } from "@shared/imageUtil";

import validate from "@shared/middleware/validate";
import getImageSchema from "@schemas/getImage";
import listImagesSchema from "@schemas/listImages";
import findImagesSchema from "@schemas/findImages";

const router: Router = Router();

router.get('/:max?/:page?',
    validate(listImagesSchema),
    async (req: Request, res: Response) => {
        const params = listImagesSchema.cast(req).params;
        res.send(params.max
            ? await dataSource.manager.findAndCount(
                Image,
                { take: params.max, skip: ((params.page ?? 1) * params.max) })
            : await dataSource.manager.find(Image));
    }
);

router.get(
    '/image/:id',
    validate(getImageSchema),
    async (req: Request, res: Response) => {
        const result: Image | null = await dataSource.manager.findOne(
            Image,
            { where: { id: getImageSchema.cast(req).params.id } },
        );
        if (result) res.send(result);
        else res.sendStatus(404);
    }
);

router.get(
    '/similar/:id/:threshold/:max?',
    validate(findImagesSchema),
    async (req: Request, res: Response) => {
        const params = findImagesSchema.cast(req).params as { id: string, max?: number, threshold: number };
        const image: Image | null = await dataSource.manager.findOne(
            Image,
            { where: { id: params.id } },
        );
        if (!image) { res.sendStatus(404); return; }

        const result: Image[] = (await dataSource.manager.find(Image)).filter((other: Image) =>
            distance(image, other) <= params.threshold);
        if (!result || result.length == 0) {
            res.sendStatus(404);
            return;
        }

        // Trim result
        if (params.max && result.length > params.max) result.length = params.max;
        res.send(result);
    }
);

export default router;
