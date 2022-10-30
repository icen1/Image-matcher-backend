import { object, number } from 'yup';

export default object({
    params: object({
        max: number().min(0),
        page: number().min(0),
    }),
});
