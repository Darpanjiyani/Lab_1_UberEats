from confluent_kafka import Producer
from django.conf import settings

def get_kafka_producer():
    producer_config = {
        'bootstrap.servers': settings.KAFKA_BROKER_URL,
    }
    return Producer(producer_config)

def produce_message(topic, key, value):
    producer = get_kafka_producer()
    producer.produce(topic, key=key, value=value)
    producer.flush()
