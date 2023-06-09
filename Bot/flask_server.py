from flask import Flask, request
import json
from flask_cors import CORS
from pymongo import MongoClient
import requests


"""
FLASK SERVER FOR RECEIVING DATA FROM THE BOT
"""

mongo_uri = "mongodb+srv://hitman:zaeem123@cluster0.rmbcl.mongodb.net/?retryWrites=true&w=majority";

mongo = MongoClient(mongo_uri)

app = Flask(__name__)

CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST"], allow_headers=["Content-Type"])


# @app.route('/')
# def hello_world():
#     return 'Please Wait while the bot is running'



def send_alert(message, webhok_url):
    data = {"content": message}
    requests.post(webhok_url, json=data)
    


@app.route('/data', methods=['POST'])
def receive_data():
    data = request.data
    
    # Converting data to json
    data = json.loads(data)
    
    db = mongo["blockchain"]
    col = db["data"]
    
    if col.find_one({"_id": data["binance_api"]}) is None:
        col.insert_one({"_id": data["binance_api"], "data": data})
        send_alert("`You have successfully created a Bot`", data["discord_webhook"])
        
        
    
    #delete the old one and insert the new one    
    else:       
        col.delete_one({"_id": data["binance_api"]})
        col.insert_one({"_id": data["binance_api"], "data": data})
        send_alert("`Your Bot is Updated`", data["discord_webhook"])
        
    
    return "OK"

if __name__ == '__main__':
    app.run(port=3001)
