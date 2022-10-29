import { BaseSchema, ValidationError } from 'yup';
import type { NextFunction, Request, Response } from 'express';

import config from '@shared/config';
import { NodeEnvironments } from '@shared/enums';

export default (
    schema: BaseSchema,
    onError?: { code?: number, msg?: string },
) => async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        await schema.validate({
            body: req.body as object,
            query: req.query,
            params: req.params,
        });
    } catch (e) {
        if (config.nodeEnv !== NodeEnvironments.DEVELOPMENT || !onError?.msg) {
            res.sendStatus(onError?.code ?? 400);
        } else {
            res.status(onError?.code ?? 400)
                .send(
                    onError?.msg
                    ?? `Bad request: \
                    \n ${(e as ValidationError).errors.join('\n')}`,
                );
        }
        return;
    }
    next();
};
