const User = require('../../models/user-account');

module.exports = {
    listAllCategories(req, res) {
        (async () => {
            try {
                const getCategories = User.findAll({
                    attributes: ['categoryId', 'value']
                })
                res.status(200).json({
                    getCategories
                })
            }
            catch(error) {
                res.status(400).json({
                    error
                })
            }

        })()
    }
}