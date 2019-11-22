import { expect } from "chai";
import * as sinon from "sinon";
import { v4 as UUIDV4 } from "uuid";
import RestifyRequestId from "../../../src/lib/restify-x-request-id";

describe("class RestifyRequestId", ()  => {
    const req = {
        headers: {},
        reqId: null
     };

    const res = {
        headers: {},
        header: (key, value = undefined) => {
             if (value) {
                 res.headers[key] = value;
             }
             return res.headers[key];
         }
     };
    let next;

    it("checks if contains no X-Request-Id header in request", done => {
        next = sinon.spy();
        RestifyRequestId.middleware(req, res, next);
        expect(req.reqId).to.not.be.undefined;
        expect(next.called).to.be.true;
        done();
    });

    it("checks if contains X-Request-Id header in request", done => {
        req.reqId = UUIDV4();
        next = sinon.spy();
        RestifyRequestId.middleware(req, res, next);
        expect(req.reqId).to.be.equal(res.header("X-Request-Id"));
        expect(next.called).to.be.true;
        done();
    });

});
