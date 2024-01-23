import { Request, Response } from "express";
import { multiplesService } from "../services/multiplesService";
import { Collections } from "../interfaces/collections";
import { Collection } from "../interfaces/collection";
import { CollectionItem } from "../interfaces/collectionsItem";

export let collections: Collections = {};

export const saveNumber = (request: Request, response: Response) => {
  if (typeof request.body.collectionName !== 'string') {
    response.status(400).send('Not a valid string for collectionName')
    return
  }

  if (typeof request.body.number !== 'number') {
    response.status(400).send('Not a number')
    return
  }

  const collectionName = request.body.collectionName as string;
  const number = parseInt(request.body.number);
  const collectionID: string = collectionName.toLowerCase()

  if (!collections[collectionID]) collections[collectionID] = { collectionName: collectionName, numbers: [] }

  const itemsExists = collections[collectionID].numbers.some(item => item.value == number)

  if (itemsExists) {
    response.status(409).send(`The number ${number} already exists in '${collectionName}'`)
    return
  }

  collections[collectionID].collectionName = collectionName
  collections[collectionID].numbers.push({ value: number, type: multiplesService.getNumbersType(number) })

  collections[collectionID].numbers.sort((a, b) => a.value - b.value)

  response.status(200).send(`The number ${number} was succesfully saved in the collection '${collectionName}'`)
}

export const getCollection = (request: Request, response: Response) => {
  const collectionName = request.params.collectionName

  response.status(200).json({
    collection: collections[collectionName.toLowerCase()]?.numbers || []
  })
}

export const getAll = (request: Request, response: Response) => {
  const keys = Object.keys(collections)
  let results: {
    [key: string]: CollectionItem[];
  } = {}

  for (let i = 0; i < keys.length; i++) {
    const collectionID = keys[i]
    const collectionName = collections[collectionID].collectionName
    results[collectionName] = collections[collectionID].numbers
  }

  response.status(200).json({
    collections: results
  })
}
