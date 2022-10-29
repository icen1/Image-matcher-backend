import { object, string } from 'yup';

export default object({
    body: object({
        id: string().uuid().required(),
    }),
});
