import { Router, Request, Response, NextFunction } from 'express';
import postRoute from './postRoute'
import userRoute from './userRoute'
const router= Router()



router.use('/api/v1/post',postRoute)
router.use('/api/v1/user',userRoute)






export default router;