const { Booking} =require('../models/index')
const {ValidationError,AppError} = require('../utils/errors')
const  {StatusCodes} =require('http-status-codes')
class BookingRepository{

    async create(data){

        try {
            const booking = await Booking.create(data)
            return booking
        } catch (error) {
            console.log('repo layer error-');
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
    async update(bookingId,data){
        try {

            const booking= await Booking.findByPk(bookingId)
            if(data.status)
            {
                booking.status=data.status
            }
                await booking.save();
                return booking
        } catch (error) {
            console.log('repo layer error update');
            throw new AppError(
                'RepositoryError',
                'Cannot Update Booking',
                'Some issue in Updating the booking',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    

}

module.exports= BookingRepository