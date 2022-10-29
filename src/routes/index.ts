import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.send('Hello World');
})

export default router;
