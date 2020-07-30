import random
import time
import json
import requests
import datetime

def main(pk):
    while(True):
        sensor_input = random.uniform(-5, 110)
        sensor_input = round(sensor_input, 2)
        
        created_at = datetime.datetime.utcnow() - datetime.timedelta(days=1)
        json_created_at = created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        

        url = "http://127.0.0.1:8000/sensor/api/for/bc-transit/" + str(pk) + "/new/record/"
        headers = {'Content-Type': "application/json", 'Accept': "application/json"}
        data = {}
        data['created_at'] = json_created_at
        data['value'] = sensor_input

        print(data)
        res = requests.put(url, json=data, headers=headers,)
        print(res.status_code)
        time.sleep(1)

main(6)
