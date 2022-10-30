import { Response } from "express";

export default function nullSend(res: Response, value: any | null): void {
    if (value) res.send(value);
    else res.sendStatus(404);
}
