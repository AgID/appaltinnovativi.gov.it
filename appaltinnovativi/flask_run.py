from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/refresh', methods=["POST", "GET"])
def hello_world():
    subprocess.Popen(["/gatsby_refresh.bash"])
    return "OK", 200

def main():
	app.run(host='0.0.0.0', port='8080')

if __name__ == "__main__":
	main()
