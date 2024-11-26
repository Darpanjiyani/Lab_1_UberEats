from confluent_kafka import Consumer
from django.conf import settings

def get_kafka_consumer():
    consumer_config = {
        'bootstrap.servers': settings.KAFKA_BROKER_URL,
        'group.id': 'django-consumer-group',
        'auto.offset.reset': 'earliest',  # Start from the beginning
    }
    consumer = Consumer(consumer_config)
    consumer.subscribe([settings.KAFKA_TOPIC_NAME])
    return consumer

def consume_messages():
    consumer = get_kafka_consumer()
    try:
        while True:
            msg = consumer.poll(1.0)  # Wait up to 1 second for a message
            if msg is None:
                continue
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue

            print(f"Consumed message: {msg.key()} -> {msg.value()}")
    except KeyboardInterrupt:
        print("Consumer stopped")
    finally:
        consumer.close()
