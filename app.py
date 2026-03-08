import json
import os
from flask import Flask, render_template, request, jsonify, send_from_directory, abort

app = Flask(__name__)

# ── HELPER: load blogs ────────────────────────────────────
def load_blogs():
    data_path = os.path.join(app.static_folder, 'data', 'blogs.json')
    with open(data_path, 'r', encoding='utf-8') as f:
        return json.load(f)


@app.route("/")
def index():
    return render_template("pages/index.html")


@app.route("/blogs")
def blogs():
    all_blogs = load_blogs()
    return render_template("pages/blogs.html", blogs=all_blogs)


@app.route("/blogs/<slug>")
def blog_detail(slug):
    all_blogs = load_blogs()
    blog = next((b for b in all_blogs if b["slug"] == slug), None)
    if not blog:
        abort(404)
    # Related blogs: other 2 posts
    related = [b for b in all_blogs if b["slug"] != slug]
    return render_template("pages/blog_detail.html", blog=blog, related=related)


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
