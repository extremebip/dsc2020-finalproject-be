const model = require('../../models/v1/province');
const helper = require('../../helpers/controllerHelper');
const { del } = require('../../config/db');

/**
 * Get province
 * @method GET
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getProvinces = async (req, res) => {
    try {
        const { id } = req.params;

        let result = null;
        if (id !== undefined) {
            let data = await model.find(id);
            if (data.length > 0) {
                result = { stored: data[0] };
            }
            else {
                throw { code: 404, message: "Id not found" };
            }
        }
        else {
            let data = await model.findAll();
            data.forEach(row => {
                row.url = `/api/v1/provinces/${row.id}`;
                delete row.id;
            });
            result = { totalData: data.length, data };
        }

        return res
            .status(200)
            .json({
                status: true,
                code: 200,
                message: "Fetching data success",
                ...(result)
            });
    } catch (error) {
        const { code, message } = error;
        return res
            .status(code || 400)
            .json({
                status: false,
                code: code || 400,
                message: message || "Fetching data failed"
            });
    }
};

/**
 * Add province
 * @method POST
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addProvince = async (req, res) => {
    try {
        const missingProperties = helper
            .checkMissingBodyProperties(req.body, ['name', 'recovered', 'death', 'positive']);
        if (missingProperties.length > 0) {
            throw { message: "Missing input data: " + missingProperties.toString().replace(/,/g, ', ') };
        }
        const validationResult = validateRequestBody(req.body);
        if (validationResult.error) {
            throw { message: { errors: validationResult.message } };
        }

        const result = await model.create(req.body);
        const newRow = await model.find(result[0]);
        return res
            .status(200)
            .json({
                status: true,
                code: 200,
                message: "Storing data success",
                stored: newRow[0]
            });
    } catch (error) {
        const { code, message } = error;
        return res
            .status(code || 400)
            .json({
                status: false,
                code: code || 400,
                message: message || "Storing data failed"
            });
    }
};

/**
 * Update province
 * @method PUT
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateProvince = async (req, res) => {
    try {
        const missingProperties = helper
            .checkMissingBodyProperties(req.body, ['id', 'name', 'recovered', 'death', 'positive']);
        if (missingProperties.length > 0) {
            throw { message: "Missing input data: " + missingProperties.toString().replace(/,/g, ', ') };
        }

        let result = {};
        const { id } = req.body;
        if (id !== undefined) {
            let before = await model.find(id);
            if (before.length > 0) {
                result.before = before[0];
            }
            else {
                throw { code: 404, message: "Id not found" };
            }
        }
        else {
            throw { message: "Id must not be empty" };
        }

        const validationResult = validateRequestBody(req.body);
        if (validationResult.error) {
            throw { message: { errors: validationResult.message } };
        }

        await model.update(req.body);
        const after = await model.find(id);
        result.after = after[0];
        return res
            .status(200)
            .json({
                status: true,
                code: 200,
                message: "Updating data success",
                ...(result)
            });
    } catch (error) {
        const { code, message } = error;
        return res
            .status(code || 400)
            .json({
                status: false,
                code: code || 400,
                message: message || "Updating data failed"
            });
    }
};

const validateRequestBody = (data) => {
    data.recovered = parseInt(data.recovered);
    data.death = parseInt(data.death);
    data.positive = parseInt(data.positive);

    console.log(data);

    let error = false;
    let message = {
        name: [],
        recovered: [],
        death: [],
        positive: []
    };

    if (data.name == null || data.name.length == 0) {
        error = true;
        message.name.push('Name must not be empty');
    }

    if (message.name.length == 0) {
        delete message.name;
    }

    if (data.recovered == null) {
        error = true;
        message.recovered.push('Recovered must not be empty');
    }
    else if (!Number.isInteger(data.recovered) || data.recovered < 0) {
        error = true;
        message.recovered.push('Recovered must be a positive integer');
    }

    if (message.recovered.length == 0) {
        delete message.recovered;
    }

    if (data.death == null) {
        error = true;
        message.death.push('Death must not be empty');
    }
    else if (!Number.isInteger(data.death) || data.death < 0) {
        error = true;
        message.death.push('Death must be a positive integer');
    }

    if (message.death.length == 0) {
        delete message.death;
    }

    if (data.positive == null) {
        error = true;
        message.positive.push('Positive must not be empty');
    }
    else if (!Number.isInteger(data.positive) || data.positive < 0) {
        error = true;
        message.positive.push('Positive must be a positive integer');
    }

    if (message.positive.length == 0) {
        delete message.positive;
    }

    return { error, message };
}

/**
 * Delete province
 * @method DELETE
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProvince = async (req, res) => {
    try {
        const { id } = req.body;
        let result = {};
        if (id !== undefined) {
            let stored = await model.find(id);
            if (stored.length > 0) {
                result.stored = stored[0];
            }
            else {
                throw { code: 404, message: "Id not found" };
            }
        }
        else {
            throw { message: "Id must not be empty" };
        }

        await model.deleteData(id);
        return res
            .status(200)
            .json({
                status: true,
                code: 200,
                message: "Destroy data success",
                ...(result)
            });
    } catch (error) {
        const { code, message } = error;
        return res
            .status(code || 400)
            .json({
                status: false,
                code: code || 400,
                message: message || "Destroy data failed"
            });
    }
};

module.exports = {
    getProvinces,
    addProvince,
    updateProvince,
    deleteProvince
};