from flask import Flask, request


app = Flask(__name__)


@app.route("/topology", methods=['GET'])
def route_topology():
    return app.config['TOPOLOGY_WRAPPER'].to_dict()


@app.route("/stopAreas", methods=['GET'])
def route_stop_areas():
    body = request.get_json()
    return {
        'TEST': "This is the stop area response.",
        'SENT-BODY': body
    }
