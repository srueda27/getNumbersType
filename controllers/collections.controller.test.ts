import { Request, Response } from "express";
import * as CollectionsController from "../controllers/collections.controller";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = (body: any, params: any = {}) => ({
  body,
  params
}) as Request;

describe('Unit test for collections controller', () => {
  describe('saveNumber', () => {
    it('Saves a valid number. Creating the collection in case it does not exists', () => {
      const req = mockRequest({ collectionName: 'testCollection', number: 5 });
      const res = mockResponse();

      const beforeCollections = Object.keys(CollectionsController.collections).length

      CollectionsController.saveNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("The number 5 was succesfully saved in the collection 'testCollection'");
      expect(beforeCollections).toBeLessThan(Object.keys(CollectionsController.collections).length)
    });

    it('It should save the number into an existing collection, without creating a new collection', () => {
      const req = mockRequest({ collectionName: 'testCollection', number: 15 });
      const res = mockResponse();

      const beforeCollections = Object.keys(CollectionsController.collections).length

      CollectionsController.saveNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("The number 15 was succesfully saved in the collection 'testCollection'");
      expect(beforeCollections).toEqual(Object.keys(CollectionsController.collections).length)
    });

    it('It should not save an invalid number. Response with 400', () => {
      const req = mockRequest({ collectionName: 'testCollection', number: 'string' });
      const res = mockResponse();

      CollectionsController.saveNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Not a number");
    });

    it('It should not save into an invalid collectionName == undefined. Response with 400', () => {
      const req = mockRequest({ collectionName: undefined, number: 5 });
      const res = mockResponse();

      CollectionsController.saveNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Not a valid string for collectionName");
    });

    it('It should not save into an invalid collectionName == null. Response with 400', () => {
      const req = mockRequest({ collectionName: null, number: 5 });
      const res = mockResponse();

      CollectionsController.saveNumber(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Not a valid string for collectionName");
    });

  });

  describe('getCollection', () => {
    it('Retrieves all data from a collection', () => {
      const res = mockResponse();

      let req = mockRequest({ collectionName: 'anotherCollection', number: 9 });
      CollectionsController.saveNumber(req, res);
      req = mockRequest({ collectionName: 'anotherCollection', number: 10 });
      CollectionsController.saveNumber(req, res);
      req = mockRequest({ collectionName: 'anotherCollection', number: 30 });
      CollectionsController.saveNumber(req, res);

      req = mockRequest({}, { collectionName: 'anotherCollection' });
      CollectionsController.getCollection(req, res)

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        collection: [
          { value: 9, type: 'Type 1' },
          { value: 10, type: 'Type 2' },
          { value: 30, type: 'Type 3' }
        ]
      });
    })

    it('Retrieves an empty collection for a non existing collection', () => {
      const req = mockRequest({}, { collectionName: 'newCollection' });
      const res = mockResponse();

      CollectionsController.getCollection(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ collection: [] });
    });
  })

  describe('getAll', () => {
    it('Retrieves all data from a all collections', () => {
      const res = mockResponse();
      let req = mockRequest({});

      CollectionsController.getAll(req, res)

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        collections: {
          "testCollection": [
            { value: 5, type: 'Type 2' },
            { value: 15, type: 'Type 3' }
          ],
          "anotherCollection": [
            { value: 9, type: 'Type 1' },
            { value: 10, type: 'Type 2' },
            { value: 30, type: 'Type 3' }
          ]
        }
      });
    })
  })
})
