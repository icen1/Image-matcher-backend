import { object, string } from 'yup';

export default object({
    params: object({
        id: string().uuid().required(),
    }),
});
