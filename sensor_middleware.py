import random
import time
import json
import requests

def main(pk):
    while(True):
        sensor_input = random.uniform(0, 100)
        sensor_input = round(sensor_input, 2)

        # url = "http://127.0.0.1:8000/sensor/api/for/origen-air/" + str(pk)
        url = "http://127.0.0.1:8000/sensor/api/for/testorg/" + str(pk)
        headers = {'Content-Type': "application/json", 'Accept': "application/json"}
        data = {}
        data['value'] = sensor_input

        print(data)
        res = requests.put(url, json=data, headers=headers,)
        print(res.status_code)
        time.sleep(1)

main(1)
# main(3) this is the origin air one
main(2) # this is the ok for the one you are using 
