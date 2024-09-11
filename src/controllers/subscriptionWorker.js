const amqp = require('amqplib');

async function processSubscription(message) {
    // Simulate subscription processing
    const subscription = JSON.parse(message.content.toString());
    console.log(`Processing subscription: ${subscription.serviceName}, Frequency: ${subscription.frequency}`);
    // Here you could update a database or log the subscription.
}

async function startWorker() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('subscription_queue', { durable: true });

    console.log('Waiting for subscription messages in queue...');

    channel.consume('subscription_queue', async (message) => {
        if (message !== null) {
            await processSubscription(message);
            channel.ack(message);
        }
    });
}

startWorker().catch(console.error);
