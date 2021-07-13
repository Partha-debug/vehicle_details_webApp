
import requests
from bs4 import BeautifulSoup
from states import places
import json


def get_vehicle_details(number):
    try:
        query = f"{places[f'{number[0:2].lower()}'] + number[2:4].lower()}"
        url = f'https://www.drivespark.com/rto-vehicle-registration-details/{query}/'
        page = requests.get(url)
        soup = BeautifulSoup(page.text, 'html.parser')
        data = soup.find(
            "div", {"class": "ds-bike-price-slider website-link"}).find_all('tr')[2::]

        parsed_data = {}

        for i in data:
            key = (str(*i.find_all('td')[0].text.split('\n')))
            value = str(*i.find_all('td')
                        [1].text.split('\n')).replace('\r', '')
            parsed_data[key] = value

        json_data = json.dumps(parsed_data)
        return json_data
    except Exception:
        json_data_err = json.dumps(
            {"City": 0, "State": 0, "Phone": 0, "Email": 0, "Address": 0})
        return json_data_err


if __name__ == "__main__":

    test_number = 'OR05AQ6010'

    try:
        print(get_vehicle_details(test_number))
    except Exception as e:
        print(f"Some error occured, details: {e}")
