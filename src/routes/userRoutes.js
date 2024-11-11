const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/location/', userController.createlocationData);
router.get('/location/:uuid', userController.getlocation);
router.post('/devices/', userController.createDevicesData);
router.get('/devices/', userController.getDevicesList);
router.get('/devices/:deviceId', userController.getDevices);
router.delete('/location/:uuid', userController.deletelocation);
router.delete('/devices/:deviceId', userController.deleteDevices);


module.exports = router;