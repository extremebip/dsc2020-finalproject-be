const db = require('../../config/db');

const findAll = async () => {
    try {
        const result = await db('provinces')
            .select('id', 'name', 'recovered', 'death', 'positive')
            .whereNull('deleted_at');

        return result;
    } catch (error) {
        throw error;
    }
};

const find = async (id) => {
    try {
        const result = await db('provinces')
            .select('name', 'recovered', 'death', 'positive')
            .where({ id: id })
            .whereNull('deleted_at');

        return result;
    } catch (error) {
        throw error;
    }
};

const create = async (data) => {
    try {
        const { name, recovered, death, positive } = data;
        return await db('provinces')
            .insert({ name, recovered, death, positive, created_at: new Date() });
    } catch (error) {
        throw error;
    }
};

const update = async (data) => {
    try {
        const { id, name, recovered, death, positive } = data;
        return await db('provinces')
            .where('id', id)
            .update({ name, recovered, death, positive, updated_at: new Date() });
    } catch (error) {
        throw error;
    }
}

const deleteData = async (id) => {
    try {
        return await db('provinces')
            .where('id', id)
            .update({
                deleted_at: new Date()
            });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findAll,
    find,
    create,
    update,
    deleteData
};