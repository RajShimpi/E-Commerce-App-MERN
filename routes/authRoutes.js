const express = require('express');
const { createUser, loginUserCtrl, getaUser, getAllUsers, deleteaUser, updateaUser, blockUser, unblockUser } = require('../controller/userCtrl');
const { authMiddleware , isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users',getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete('/:id',deleteaUser);
router.put('/edit-user',authMiddleware,updateaUser);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser);

module.exports = router;