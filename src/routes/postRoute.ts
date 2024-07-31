import { Router, Request, Response, NextFunction } from 'express';
import { showMessage } from '../controller/postController';


const router= Router()

router.get('/', showMessage);






export default router