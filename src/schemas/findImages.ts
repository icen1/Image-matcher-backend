import { object, string, number } from 'yup';

export default object({
    params: object({
        id: string().required().uuid(),
        threshold: number().required().min(0),
    }),
});
