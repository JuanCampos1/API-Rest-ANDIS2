const amqp = require('amqplib');

async function processPayment(message) {
    // Simulate payment processing
    const payment = JSON.parse(message.content.toString());
    console.log(`Processing payment: ${payment.serviceName}, Amount: ${payment.amount}`);
    // Here you could update a database or log the payment.
}

async function startWorker() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('payment_queue', { durable: true });

    console.log('Waiting for payment messages in queue...');

    channel.consume('payment_queue', async (message) => {
        if (message !== null) {
            await processPayment(message);
            channel.ack(message);
        }
    });
}

startWorker().catch(console.error);
