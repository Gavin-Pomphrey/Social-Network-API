//import necessary modules
const router = require('express').Router();
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usersController');

//routes for getting all users, creating a user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//routes for getting a user by id, updating a user, deleting a user
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//routes for adding a friend, deleting a friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;

