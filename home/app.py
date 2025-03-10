from flask import Flask, request, jsonify
from supabase import create_client, Client
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://trzqbkvhlxcqvkmplxpr.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyenFia3ZobHhjcXZrbXBseHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNzg3MDcsImV4cCI6MjA1Njc1NDcwN30.Phhz4_gUMy1mzt6kXu7Kz1I_M3jTzP77xnyFzX8axLU")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/submit-survey', methods=['POST'])
def submit_survey():
    try:
        data = request.json
        suggestions = data.get('suggestions')
        thoughts = data.get('thoughts')
        rating = data.get('rating')

        if not all([suggestions, thoughts, rating]):
            return jsonify({"error": "Missing required fields"}), 400

        response = supabase.table("survey_responses").insert({
            "suggestions": suggestions,
            "thoughts": thoughts,
            "rating": rating
        }).execute()

        return jsonify({"message": "Survey submitted successfully", "response": response.data}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
