from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("pages/index.html")


@app.route("/robots.txt")
def robots():
    return send_from_directory(app.static_folder, "robots.txt")


@app.route("/sitemap.xml")
def sitemap():
    return send_from_directory(app.static_folder, "sitemap.xml", mimetype="application/xml")


@app.route("/submit-request", methods=["POST"])
def submit_request():
    data = request.get_json()
    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    area = data.get("area", "").strip()
    service = data.get("service", "").strip()
    message = data.get("message", "").strip()

    if not name or not phone:
        return jsonify({"success": False, "error": "Name and phone are required."}), 400

    # Here you could send an email, save to DB, etc.
    print(f"New booking request: {name} | {phone} | {area} | {service} | {message}")

    return jsonify({"success": True, "message": f"Thank you, {name}! We will contact you at {phone} shortly."})


if __name__ == "__main__":
    app.run(debug=True)
