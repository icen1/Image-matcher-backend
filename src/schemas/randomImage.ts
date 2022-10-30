import { object, boolean } from "yup";

export default object({
    params: object({
        weighted: boolean(),
    }),
});
