# Use a slim Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy only Python-related files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy only Python source files
COPY app.py .
COPY faq_matcher.py .    
# Add any other required Python files

# Optional: copy your .env if needed in build (rare)
# COPY .env .

# Expose the port
EXPOSE 5000

# Start Flask app using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
