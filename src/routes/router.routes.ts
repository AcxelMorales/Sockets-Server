import { Router, } from 'express';

import * as routerCtrl from '../controllers/router.controller';

const router = Router();

router.get('/messages', routerCtrl.getMessages);

router.get('/users', routerCtrl.getIdsByUsers);

router.get('/users/detail', routerCtrl.getUsersWithName);

router.post('/messages', routerCtrl.postMessages);

router.post('/messages/:id', routerCtrl.postMessagesWithId);

export default router;