
const { StatusCodes } = require('http-status-codes');
const {BookingService} =require('../services/index')

const bookingService= new BookingService();
const { createChannel ,publishMessage }= require('../utils/messageQueue')

const {REMINDER_BINDING_KEY} =require('../config/serverConfig')
class BookingController {

        constructor(channel){
                this.channel=channel
        }
        async sendMessageToQueue(req,resp){
            
            const channel = await createChannel()
            const data= { message:"success"}
            publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data))
            return resp.status(200).json({
                message:"succes publish event"
            })
        }

        async create(req,resp) {
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


}

module.exports= BookingController



// const create = async (req,resp)=>{

//     try {
//         const response= await bookingService.createBooking(req.body)
//         return resp.status(StatusCodes.OK).json({
//             data:response,
//             message:'success in booking',
//             err:{},
//             success:true
//         })
        
//     } catch (error) {
//         console.log('controller error');

//         return resp.status(error.statusCodes).json({
//             data:{},
//             name:error.name,
//             message:error.message,
//             err:error.explanation,
//             success:false
//         })
//     }

// }

// module.exports={
//     create
// }