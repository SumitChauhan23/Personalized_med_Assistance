import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import getDiseaseInfo from './utils/filter.js';

dotenv.config();  

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint for Disease Info
app.get('/disease', (req, res) => {
    const disease = req.query.disease;
    const diseaseInfo = getDiseaseInfo(disease);
    res.json(diseaseInfo);
});

app.get('/nearby-hospitals', async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
        const geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}";
        const response = await axios.get(geocodeUrl);
        
        if (response.data.status !== 'OK') {
            return res.status(404).json({ error: "Location not found" });
        }

        // Use the location data to search for nearby hospitals
        const hospitalsUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${GOOGLE_MAPS_API_KEY}";
        const hospitalsResponse = await axios.get(hospitalsUrl);

        const hospitals = hospitalsResponse.data.results.map(hospital => ({
            name: hospital.name,
            address: hospital.vicinity,
            rating: hospital.rating || 'N/A',
            location: hospital.geometry.location,
            place_id: hospital.place_id
        }));

        res.json(hospitals);
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ error: "Failed to fetch hospitals" });
    }
});


app.listen(8000, () => {
    console.log('App is listening on port 8000');
});