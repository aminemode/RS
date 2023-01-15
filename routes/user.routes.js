const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
const upload = multer()

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
// on patch car follower et following sont des tableau de chaine de carractere
// et pour pas supprimer tout le tableau on fait un patch et pas un put 
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

//upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil)


module.exports = router