
# Airline Management System - Booking Service

## Description:
The Booking Service is a crucial microservice in the Airline Management System that handles all the booking-related operations. It follows the microservices architecture, promoting scalability and maintainability.

## Database: 
    The service uses MySQL for data persistence and Sequelize ORM for efficient database operations. The 'booking' table in the database stores essential information like flightId, userId, status (InProcess, Booked, Cancelled), noOfSeats, and totalCost.
## Error Handling: 
    The service is designed to handle both application-level and service-level errors effectively, ensuring a smooth user experience.
## Message Queue: 
     Integrated a Message queue between BookingService and ReminderService using RabbitMQ message broker and amqplib Node client for reliable and efficient communication for Reminder Mails .The service uses a message queue to communicate with the Reminder Service. When a booking is made, a message is pushed onto the queue. The Reminder Service then consumes these messages and sends a reminder to the user 12 hours before their flight.
## amqplib:
    This Node client is used for reliable and efficient communication with the message queue. It ensures that the Reminder Mails are sent out accurately and on time.


This microservice, like the others in the system, follows the MVC architecture, ensuring a clean and organized codebase. It also emphasizes error handling and uses industry-standard tools and libraries for efficient operation.
