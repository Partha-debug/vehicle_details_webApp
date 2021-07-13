#!C:/Users/DIBYA JYOTI/AppData/Local/Programs/Python/Python39/python.exe
from main import get_vehicle_details
from cgi import FieldStorage
print("Content-Type: application/json")
print()

incoming_request = FieldStorage()

vehicle_num = incoming_request.getvalue("num")


response = get_vehicle_details(vehicle_num)


print(response)


# OD05E1234
