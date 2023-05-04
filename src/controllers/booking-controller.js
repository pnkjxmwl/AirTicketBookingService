
const { StatusCodes } = require('http-status-codes');
const {BookingService} =require('../services/index')

const bookingService= new BookingService();


const create = async (req,resp)=>{

    try {
        const response= await bookingService.createBooking(req.body)
        return resp.status(StatusCodes.OK).json({
            data:response,
            message:'success in booking',
            err:{},
            success:true
        })
        
    } catch (error) {
        console.log('controller error');

        return resp.status(error.statusCodes).json({
            data:{},
            name:error.name,
            message:error.message,
            err:error.explanation,
            success:false
        })
    }

}

module.exports={
    create
}