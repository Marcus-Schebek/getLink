from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route('/report/<string:url>', methods=['GET'])
def scraper(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.find('h1', {'class': 'title'}).text
    subtitle = soup.find('h2', {'class': 'subtitle'}).text
    image = soup.find('img', {'class': 'report-image'})['src']

    report = {
        'title': title,
        'subtitle': subtitle,
        'image': image
    }

    return jsonify(report)

if __name__ == '__main__':
    app.run(debug=True)
