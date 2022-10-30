import { object, boolean, number } from 'yup';

export default object({
    params: object({
        weighted: boolean(),
        max: number().min(0),
        page: number().min(0),
    }),
});
