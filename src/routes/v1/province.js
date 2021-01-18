const express = require('express');

const router = express.Router();

const controller = require('../../controllers/v1/province');

router
    .route('/')
    .get(controller.getProvinces)
    .post(controller.addProvince)
    .put(controller.updateProvince)
    .delete(controller.deleteProvince);

router
    .route('/:id')
    .get(controller.getProvinces);

module.exports = router;