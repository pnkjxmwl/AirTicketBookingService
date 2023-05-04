
const { StatusCodes} = require('http-status-codes')

class ValidationError extends Error {

    constructor(error){
        super()
        let explanation =[]


        error.errors.forEach((err) => {
            explanation.push(err.message)
        });

            this.name='ValidationError',
            this.message='Not Able to Validate the data sent in Req',
            thiis.explanation=explanation,
            this.statusCodes=StatusCodes.BAD_REQUEST


        }

}
module.exports= ValidationError