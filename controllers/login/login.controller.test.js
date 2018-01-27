import response from '../../test-utils/response';
import login from './login.controller.js';
import { client } from '../../clients/commercetools/client';
jest.mock('../../clients/commercetools/client');

const createRequest = req => ({
  body: { password: 'yeah!' },
  ...req,
});

describe('login', () => {
  describe('when no email is sent in the request', () => {
    let req;
    let res;
    beforeEach(() => {
      res = response();
      req = createRequest();
      login(req, res);
    });
    it('should return bad request status error (400)', () => {
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should send the error back', () => {
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(
        'Valid username and password are required.'
      );
    });
    it('should not call the commercetools API', () => {
      expect(client.customers._save).not.toHaveBeenCalled();
    });
  });
  describe('when no password is sent in the request', () => {
    let req;
    let res;
    beforeEach(() => {
      req = createRequest({ body: { email: 'foo@bar.es' } });
      res = response();
      login(req, res);
    });
    it('should return bad request status error (400)', () => {
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should send the error back', () => {
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(
        'Valid username and password are required.'
      );
    });
    it('should not call the commercetools API', () => {
      expect(client.customers._save).not.toHaveBeenCalled();
    });
  });
  describe('when valid credentials passed', () => {
    describe('when no errors in commercetools', () => {
      let req;
      let res;
      beforeEach(() => {
        req = createRequest({
          body: { email: 'foo@bar.es', password: 'yeah!' },
        });
        res = response();
        login(req, res);
      });
      it('should call the commercetools API', () => {
        expect(client.customers._save).toHaveBeenCalledTimes(1);
        expect(client.customers._save).toHaveBeenCalledWith('/login', {
          anonymousCartSignInMode: 'UseAsNewActiveCustomerCart',
          email: req.body.email,
          password: req.body.password,
        });
      });
    });
  });
});
