import { v4 as UUIDV4 } from "uuid";

class RestifyXRequestId {

    public static middleware(req, res, next): void {
        // Request
        req.reqId = req.reqId || UUIDV4();
        // Response
        res.header("X-Request-Id", req.reqId);
        return next();
    }
}

export default RestifyXRequestId;
