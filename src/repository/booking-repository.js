const { Booking} =require('../models/index')
const {ValidationError,AppError} = require('../utils/errors')
const  {StatusCodes} =require('http-status-codes')
class BookingRepository{

    async create(data){
        try {
            const booking = await Booking.create(data)
            return booking

        } catch (error) {
            if(error.name=='SequelizeValidationError')
            {
                throw new ValidationError(error)
            }
            throw new AppError(
                'RepositoryError',
                'Cannot Create Booking',
                'Some issue in Creating the booking',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    

}

module.exports= BookingRepository