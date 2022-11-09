from flask import Flask
import os

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


def main():
    """Run the Flask app."""
    app.run(port=int(os.environ.get('PORT', 8000)), debug=True)


if __name__ == "__main__":
    main()
