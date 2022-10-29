import { Router, Request, Response, NextFunction } from 'express';
import dataSource from "@services/dataSource";
import Image from "@entities/Image";
import { distance } from "@shared/imageUtil";

import validate from "@shared/middleware/validate";
import getImageSchema from "@schemas/getImage";
import listImagesSchema from "@schemas/listImages";
import findImagesSchema from "@schemas/findImages";
import likeImageSchema from '@schemas/likeImage';

const router: Router = Router();

// Enable CORS
router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

router.get('/list/:max?/:page?',
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

router.get('/random',
    async (req: Request, res: Response) => {
        const result: Image | null = await dataSource.manager.createQueryBuilder(Image, 'image')
            .select()
            .orderBy('RANDOM()')
            .getOne();
        if (result) res.send(result);
        else res.sendStatus(404);
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
    '/similar/:id/:max?/:page?',
    validate(findImagesSchema),
    async (req: Request, res: Response) => {
        const params = findImagesSchema.cast(req).params;
        const image: Image | null = await dataSource.manager.findOne(
            Image,
            { where: { id: params.id } },
        );
        if (!image) { res.sendStatus(404); return; }

        const result: Image[] = (await dataSource.manager.find(Image)).sort((a: Image, b: Image) => (
            distance(a, image) - distance(b, image)
        ));
        if (!result || result.length == 0) {
            res.sendStatus(404);
            return;
        }

        // Trim result
        if (params.max && result.length > params.max) result.length = params.max;
        res.send(result.slice(params.page * params.max, params.page * params.max + params.max));
    }
);

router.post('/like',
    validate(likeImageSchema),
    async (req: Request, res: Response) => {
        const image: Image | null = await dataSource.manager.findOne(Image, { where: { id: likeImageSchema.cast(req).body.id } });
        if (!image) {
            res.sendStatus(404);
            return;
        }

        if (image.likes) image.likes += 1;
        else image.likes = 1;

        await dataSource.manager.save(image);
        res.status(200).send(image.likes);
    },
);

export default router;
