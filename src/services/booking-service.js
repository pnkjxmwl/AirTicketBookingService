const {BookingRepository} =require('../repository/index')
const axios= require('axios')
const {FLIGHT_SERVICE_PATH} =require('../config/serverConfig')
const { ServiceError } = require('../utils/errors/index')
class BookingService{

    constructor(){
        this.bookingRepository = new BookingRepository()
    }

    async createBooking(data){

        try {
            const flightId=data.flightid
            let getFlightReqURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response = await axios.get(getFlightReqURL)
            const flightData= response.data.data
           
            let priceOfFlight= flightData.price
            if(data.noOfSeats > flightData.totalSeats)
            {
                throw new ServiceError(
                    'Something went wrong in booking service',
                'Insufficient Seats'
                )   
            }
            const totalCost= priceOfFlight*data.noOfSeats

            const bookingPayload= {...data,totalCost}
            const booking= await this.bookingRepository.create(bookingPayload)
            const updateFlightReqURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
             axios.patch(updateFlightReqURL,{totalSeats: flightData.totalSeats-booking.noOfSeats})
            const finalbooking =await this.bookingRepository.update(booking.id,{status:"Booked"});
            
             return finalbooking

        } catch (error) {
            console.log('service layer error',error);
            if(error.name=='RepositoryError' || error.name=='ValidationError')
            {
                throw error
            }
            throw new ServiceError();            
        }

    }

}

module.exports =BookingService