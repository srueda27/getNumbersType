import { Router } from "express";
import { multiplesService } from "../services/multiplesService";

const router = Router();

router.get('/100list', function (request, response) {
  let list: string[] = []

  for (let i = 1; i < 101; i++) {
    list.push(multiplesService.getNumbersType(i))
  }

  response.status(200).json({
    list
  })
})

router.get('/:number', function (request, response) {
  const number = parseInt(request.params.number);

  if (!number) {
    response.status(400).send('Not a number')
    return
  }

  const value = multiplesService.getNumbersType(number)

  response.status(200).json({
    value
  })
})

export default router;
