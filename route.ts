import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();
import { all_Book, create_Book, delete_Book, getById_Book, update_Book } from './controller';

router.route('/products').get(all_Book)
router.route('/products').post(create_Book)
router.route('/products/:id').get(getById_Book)
router.route('/products/:id').delete(delete_Book)
router.route('/products/:id').put(update_Book)


export default router;