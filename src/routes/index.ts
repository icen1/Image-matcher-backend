import {
    Router, Request, Response, NextFunction,
} from 'express';
import dataSource from '@services/dataSource';
import Image from '@entities/Image';

import validate from '@shared/middleware/validate';
import getImageSchema from '@schemas/getImage';
import listImagesSchema from '@schemas/listImages';
import findImagesSchema from '@schemas/findImages';
import likeImageSchema from '@schemas/likeImage';
import randomImageSchema from '@schemas/randomImage';
import randomGroupSchema from '@schemas/randomGroup';
import {
    get, getSimilar, list, random, trim,
} from '@services/parser';
import nullSend from '@shared/nullSend';

const router: Router = Router();

// Enable CORS
router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

router.get(
    '/list/:max?/:page?',
    validate(listImagesSchema),
    async (req: Request, res: Response) => {
        const { params } = listImagesSchema.cast(req);
        res.send(trim(await list(), params.max, params.page));
    },
);

router.get(
    '/random/:weighted?',
    validate(randomImageSchema),
    async (req: Request, res: Response) => {
        const props = randomImageSchema.cast(req).params;
        nullSend(res, await random(props.weighted));
    },
);

router.get(
    '/group/:weighted?/:max?/:page?',
    validate(randomGroupSchema),
    async (req: Request, res: Response) => {
        const props = randomGroupSchema.cast(req).params;
        const image: Image | null = await random(props.weighted);
        if (image) {
            res.send(trim(
                await getSimilar(image),
                props.max,
                props.page,
            ));
        } else res.sendStatus(404);
    },
);

router.get(
    '/image/:id',
    validate(getImageSchema),
    async (req: Request, res: Response) => {
        const props = getImageSchema.cast(req).params;
        nullSend(res, await get(props.id as string));
    },
);

router.get(
    '/similar/:id/:max?/:page?',
    validate(findImagesSchema),
    async (req: Request, res: Response) => {
        const { params } = findImagesSchema.cast(req);
        const image: Image | null = await get(params.id as string);
        if (image) {
            res.send(trim(
                await getSimilar(image),
                params.max,
                params.page,
            ));
        } else res.sendStatus(404);
    },
);

router.post(
    '/like',
    validate(likeImageSchema),
    async (req: Request, res: Response) => {
        const props = likeImageSchema.cast(req).body;
        const image: Image | null = await get(props.id as string);
        if (!image) {
            res.sendStatus(404);
            return;
        }

        image.likes = (image.likes ?? 0) + 1;

        await dataSource.manager.save(image);
        res.status(200).send(image.likes);
    },
);

export default router;
