const express = require('express');
const { createUser, loginUserCtrl, getaUser, getAllUsers, deleteaUser } = require('../controller/userCtrl');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users',getAllUsers);
router.get('/:id',getaUser);
router.delete('/:id',deleteaUser);

module.exports = router;