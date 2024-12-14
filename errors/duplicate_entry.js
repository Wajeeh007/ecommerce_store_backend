const CustomError = require('./custom_error')

class DuplicateEntryError extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}

module.exports = DuplicateEntryError