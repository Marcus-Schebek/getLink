from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/api/scraper")
def scraper():
    url = request.args.get("url")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.find('title').text
    subtitle = soup.find('meta')['content']
    image = soup.find('img')['src']

    return jsonify({
        "title": title,
        "subtitle": subtitle,
        "image": image
    })

if __name__ == "__main__":
    app.run()