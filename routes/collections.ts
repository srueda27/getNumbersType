import { Router } from "express";
import * as CollectionsController from "../controllers/collections.controller";
const router = Router();

router.post('/saveNumber', CollectionsController.saveNumber)

router.get('/list/:collectionName', CollectionsController.getCollection)

router.get('/listAll', CollectionsController.getAll)

export default router;
