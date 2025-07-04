This repository contains the backend source code for the Image Editor Platform Powered by AI, developed for the Year 4 Semester 2 Final Defense Project.

The backend is built using Node.js, Express, and MySQL, with integrations for Cloudinary (for AI-based image transformations) and Paddle (for subscription billing and payment handling). It also features user authentication, transformation limits, and webhook handling.

Run Paddle Webhook:
<br/>hookdeck listen --path /paddle/webhook 5000
