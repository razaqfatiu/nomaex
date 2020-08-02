const User = require('../../models/user-account');
const Categories = require('../../models/category');
const models = require('../../models/index')

module.exports = {
    listAllCategories(req, res) {
        (async () => {
            try {
                const getCategories = await models.Category.findAll({
                    attributes: ['categoryId', 'value']
                })
                res.status(200).json({
                    getCategories
                })
            }
            catch(error) {
                console.log(error)
                res.status(500).json({
                    error
                })
            }

        })()
    }
}