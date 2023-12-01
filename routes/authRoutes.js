const express = require('express');
const { createUser, loginUserCtrl, getaUser, getAllUsers, deleteaUser, updateaUser } = require('../controller/userCtrl');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users',getAllUsers);
router.get('/:id', authMiddleware, getaUser);

router.delete('/:id',deleteaUser);
router.put('/:id',updateaUser);

module.exports = router;