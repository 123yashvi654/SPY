// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';

// dotenv.config();

// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173",   // ← FRONTEND URL (Vite)
//   methods: "GET,POST",
//   credentials: true
// }));
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 5000;

// // Helper: Generate AI Itinerary using OpenRouter REST API
// async function generateItineraryAI(travelDetails) {
//   const prompt = `
// You are a travel planner AI. 
// A traveler named ${travelDetails.travelerName || 'Unknown'} wants to go from ${travelDetails.fromLocation} to ${travelDetails.destination} from ${travelDetails.startDate} to ${travelDetails.endDate}. 
// Group size: ${travelDetails.groupSize}, budget: ${travelDetails.budget}, interests: ${travelDetails.interests.join(', ') || 'None'}, 
// accommodation: ${travelDetails.accommodationType}, transport: ${travelDetails.transportMode}, special requests: ${travelDetails.specialRequests || 'None'}.

// Create a day-wise itinerary in JSON format like this:

// {
//   "days": [
//     {
//       "date": "YYYY-MM-DD",
//       "activities": [
//         {
//           "time": "HH:MM",
//           "activity": "Activity description",
//           "description": "More details",
//           "cost": "Approximate cost"
//         }
//       ]
//     }
//   ]
// }

// Make the itinerary realistic, budget-friendly, and include transport, accommodation, and interest-based activities.
// `;

//   try {
//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'gpt-4o-mini',
//         messages: [{ role: 'user', content: prompt }],
//         temperature: 0.7
//       })
//     });

//     const data = await response.json();
//     const textResponse = data.choices[0].message.content;

//     // Parse JSON from AI response
//     const jsonStart = textResponse.indexOf('{');
//     const jsonEnd = textResponse.lastIndexOf('}') + 1;
//     const jsonString = textResponse.slice(jsonStart, jsonEnd);
//     const itinerary = JSON.parse(jsonString);

//     return itinerary;
//   } catch (err) {
//     console.error('Error generating itinerary:', err);
//     return { days: [] };
//   }
// }

// // API Endpoint
// app.post('/generate-itinerary', async (req, res) => {
//   const travelDetails = req.body;
//   if (!travelDetails.fromLocation || !travelDetails.destination || !travelDetails.startDate || !travelDetails.endDate) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const itinerary = await generateItineraryAI(travelDetails);
//     res.json(itinerary);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to generate itinerary' });
//   }
// });

// app.get('/', (req, res) => res.send('Travel Planner AI Backend is running!'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // Make sure to install node-fetch: npm install node-fetch

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.post("/generate-itinerary", async (req, res) => {
  try {
    const data = req.body;

    console.log("Request received → ", data);

    const prompt = `
Generate a complete travel itinerary in JSON.
Currency should ALWAYS be INR.

INPUT:
${JSON.stringify(data)}

OUTPUT FORMAT:
{
  "summary": {
    "travelerName": "",
    "fromLocation": "",
    "destination": "",
    "durationDays": "",
    "tripDates": "",
    "budgetCategory": "",
    "groupSize": "",
    "totalEstimatedCostINR": ""
  },
  "stay": {
    "hotelName": "",
    "hotelAddress": "",
    "pricePerNightINR": "",
    "totalHotelCostINR": ""
  },
  "travel": {
    "mode": "",
    "ticketDetails": "",
    "costINR": ""
  },
  "dayWisePlan": [
    {
      "day": 1,
      "date": "",
      "activities": [
        {
          "time": "",
          "title": "",
          "details": "",
          "costINR": ""
        }
      ]
    }
  ],
  "foodRecommendations": [
    {
      "restaurant": "",
      "type": "",
      "approxCostINR": ""
    }
  ]
}

Rules:
- Always generate a full itinerary even if trip is only 1 day.
- Always include: breakfast, sightseeing, local travel, dinner.
- Activities must have time + cost.
- Costs must be realistic INR amounts.
- Use Mumbai-based places since destination is Mumbai.
- Keep the JSON VALID. No comments, no text outside JSON.
    `;

    // Call OpenRouter API directly
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',   // You can switch to gpt-4.1 if needed
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const result = await response.json();
const rawContent = result.choices[0].message.content;

// Clean the AI output to make it valid JSON
const cleanContent = rawContent
  .replace(/```json/g, '')
  .replace(/```/g, '')
  .trim();

res.json(JSON.parse(cleanContent));


  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
