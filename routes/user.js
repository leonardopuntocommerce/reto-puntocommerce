const express = require('express');

const router = express.Router();


const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers);

router.post('/', userCtrl.createUser);

router.get('/emails', userCtrl.orderUserEmails);

router.get('/search/:searchValue', userCtrl.searchDuplicateEmails);

router.put('/:id', userCtrl.updateUser);

router.delete('/:id', userCtrl.deleteUser);

module.exports = router;