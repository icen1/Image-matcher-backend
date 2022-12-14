import { object, string, number } from 'yup';

export default object({
    params: object({
        id: string().required().uuid(),
        max: number().min(0).required(),
        page: number().min(0).default(0),
    }),
});
