from django.core.management.base import BaseCommand
from UberEatsBackend.KafkaConsumer import consume_messages

class Command(BaseCommand):
    help = 'Start the Kafka consumer to listen to user-events'

    def handle(self, *args, **kwargs):
        self.stdout.write('Starting Kafka Consumer...')
        consume_messages()  # Start consuming messages from Kafka
        self.stdout.write('Kafka Consumer started successfully')
