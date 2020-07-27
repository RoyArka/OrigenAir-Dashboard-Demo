import random
import time
import json
import requests

def main(pk):
    while(True):
        sensor_input = random.uniform(-5, 110)
        sensor_input = round(sensor_input, 2)

        url = "http://127.0.0.1:8000/sensor/api/for/bc-transit/" + str(pk)
        headers = {'Content-Type': "application/json", 'Accept': "application/json"}
        data = {}
        data['value'] = sensor_input

        print(data)
        res = requests.put(url, json=data, headers=headers,)
        print(res.status_code)
        time.sleep(1)

<<<<<<< HEAD
main(40)
=======
main(1)
>>>>>>> arka
