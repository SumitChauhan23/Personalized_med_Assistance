const diseasesData = [
  {
    "name": "Fever",
    "prevention": [
      "Stay hydrated.",
      "Avoid excessive heat exposure.",
      "Maintain good hygiene."
    ],
    "medicines": [
      "Paracetamol",
      "Ibuprofen"
    ],
    "homeRemedies": [
      "Drink plenty of fluids.",
      "Cold compress on the forehead."
    ]
  },
  {
    "name": "Headache",
    "prevention": [
      "Maintain a regular sleep schedule.",
      "Stay hydrated.",
      "Manage stress effectively."
    ],
    "medicines": [
      "Paracetamol",
      "Ibuprofen",
      "Aspirin"
    ],
    "homeRemedies": [
      "Peppermint oil on temples.",
      "Ginger tea."
    ]
  },
  {
    "name": "Fungal infection",
    "prevention": [
      "Keep skin dry and clean.",
      "Avoid sharing personal items.",
      "Wear breathable clothing."
    ],
    "medicines": [
      "Antifungal creams",
      "Oral antifungal medications"
    ],
    "homeRemedies": [
      "Tea tree oil can help.",
      "Apple cider vinegar applied to the affected area."
    ]
  },
  {
    "name": "Allergy",
    "prevention": [
      "Avoid known allergens.",
      "Keep indoor air clean.",
      "Use air purifiers."
    ],
    "medicines": [
      "Antihistamines",
      "Corticosteroids"
    ],
    "homeRemedies": [
      "Local honey to build immunity.",
      "Saline nasal rinse."
    ]
  },
  {
    "name": "GERD",
    "prevention": [
      "Avoid trigger foods.",
      "Eat smaller meals.",
      "Elevate the head while sleeping."
    ],
    "medicines": [
      "Proton pump inhibitors",
      "Antacids"
    ],
    "homeRemedies": [
      "Ginger tea can soothe the stomach.",
      "Apple cider vinegar diluted in water."
    ]
  },
  {
    "name": "Chronic cholestasis",
    "prevention": [
      "Maintain a healthy diet.",
      "Regular exercise.",
      "Limit alcohol intake."
    ],
    "medicines": [
      "Ursodeoxycholic acid"
    ],
    "homeRemedies": [
      "Turmeric for liver health.",
      "Dandelion tea."
    ]
  },
  {
    "name": "Drug Reaction",
    "prevention": [
      "Always inform doctors about allergies.",
      "Avoid unnecessary medications."
    ],
    "medicines": [
      "Antihistamines",
      "Corticosteroids"
    ],
    "homeRemedies": [
      "Oatmeal baths for skin relief.",
      "Aloe vera gel."
    ]
  },
  {
    "name": "Peptic ulcer disease",
    "prevention": [
      "Avoid NSAIDs.",
      "Limit alcohol and smoking.",
      "Manage stress."
    ],
    "medicines": [
      "Proton pump inhibitors",
      "Antibiotics"
    ],
    "homeRemedies": [
      "Honey may help heal ulcers.",
      "Cabbage juice."
    ]
  },
  {
    "name": "AIDS",
    "prevention": [
      "Safe sex practices.",
      "Avoid sharing needles."
    ],
    "medicines": [
      "Antiretroviral therapy (ART)"
    ],
    "homeRemedies": [
      "Proper nutrition to boost immune system.",
      "Stay hydrated."
    ]
  },
  {
    "name": "Diabetes",
    "prevention": [
      "Maintain a healthy weight.",
      "Eat a balanced diet low in refined sugars.",
      "Exercise regularly.",
      "Monitor blood sugar levels."
    ],
    "medicines": [
      "Metformin",
      "Insulin",
      "Sulfonylureas"
    ],
    "homeRemedies": [
      "Cinnamon can help lower blood sugar levels.",
      "Bitter melon juice may improve insulin sensitivity.",
      "Fenugreek seeds soaked in water overnight.",
      "Maintain a diet rich in fiber."
    ]
  },
  {
    "name": "Gastroenteritis",
    "prevention": [
      "Practice good hygiene.",
      "Avoid contaminated food and water."
    ],
    "medicines": [
      "Rehydration solutions",
      "Antidiarrheal medications"
    ],
    "homeRemedies": [
      "Ginger tea for nausea.",
      "Clear broths."
    ]
  },
  {
    "name": "Bronchial Asthma",
    "prevention": [
      "Avoid triggers.",
      "Regular exercise.",
      "Use air filters."
    ],
    "medicines": [
      "Inhalers",
      "Corticosteroids"
    ],
    "homeRemedies": [
      "Steam inhalation.",
      "Turmeric milk."
    ]
  },
  {
    "name": "Hypertension",
    "prevention": [
      "Maintain a healthy diet.",
      "Reduce sodium intake.",
      "Regular exercise."
    ],
    "medicines": [
      "ACE inhibitors",
      "Beta-blockers"
    ],
    "homeRemedies": [
      "Garlic for blood pressure.",
      "Hibiscus tea."
    ]
  },
  {
    "name": "Migraine",
    "prevention": [
      "Identify and avoid triggers.",
      "Maintain a regular sleep schedule."
    ],
    "medicines": [
      "Triptans",
      "NSAIDs"
    ],
    "homeRemedies": [
      "Peppermint oil for headaches.",
      "Ginger tea."
    ]
  },
  {
    "name": "Cervical spondylosis",
    "prevention": [
      "Maintain good posture.",
      "Regular neck exercises."
    ],
    "medicines": [
      "Pain relievers",
      "Muscle relaxants"
    ],
    "homeRemedies": [
      "Warm compresses.",
      "Turmeric milk."
    ]
  },
  {
    "name": "Paralysis (brain hemorrhage)",
    "prevention": [
      "Control blood pressure.",
      "Manage diabetes."
    ],
    "medicines": [
      "Anticoagulants",
      "Rehabilitation therapies"
    ],
    "homeRemedies": [
      "Physical therapy.",
      "Massage therapy."
    ]
  },
  {
    "name": "Jaundice",
    "prevention": [
      "Vaccination for hepatitis.",
      "Avoid alcohol."
    ],
    "medicines": [
      "Antivirals",
      "Liver support supplements"
    ],
    "homeRemedies": [
      "Papaya leaf juice.",
      "Beetroot juice."
    ]
  },
  {
    "name": "Malaria",
    "prevention": [
      "Use mosquito nets.",
      "Take antimalarial medications."
    ],
    "medicines": [
      "Chloroquine",
      "Artemisinin-based combination therapies"
    ],
    "homeRemedies": [
      "Neem leaves.",
      "Ginger tea."
    ]
  },
  {
    "name": "Chicken pox",
    "prevention": [
      "Vaccination.",
      "Avoid contact with infected individuals."
    ],
    "medicines": [
      "Antihistamines for itching",
      "Pain relievers"
    ],
    "homeRemedies": [
      "Oatmeal baths.",
      "Calamine lotion."
    ]
  },
  {
    "name": "Dengue",
    "prevention": [
      "Avoid mosquito bites.",
      "Use mosquito repellents."
    ],
    "medicines": [
      "Pain relievers",
      "IV fluids for severe cases"
    ],
    "homeRemedies": [
      "Papaya leaf juice.",
      "Stay hydrated."
    ]
  },
  {
    "name": "Typhoid",
    "prevention": [
      "Vaccination.",
      "Drink clean water."
    ],
    "medicines": [
      "Antibiotics",
      "Fluids and electrolytes"
    ],
    "homeRemedies": [
      "Ginger tea.",
      "Banana diet."
    ]
  },
  {
    "name": "Hepatitis A",
    "prevention": [
      "Vaccination.",
      "Good hygiene practices."
    ],
    "medicines": [
      "Rest and hydration",
      "Supportive care"
    ],
    "homeRemedies": [
      "Turmeric for liver support.",
      "Ginger tea."
    ]
  },
  {
    "name": "Hepatitis B",
    "prevention": [
      "Vaccination.",
      "Avoid sharing needles."
    ],
    "medicines": [
      "Antivirals",
      "Interferons"
    ],
    "homeRemedies": [
      "Green tea.",
      "Milk thistle."
    ]
  },
  {
    "name": "Hepatitis C",
    "prevention": [
      "Avoid sharing needles.",
      "Safe sex practices."
    ],
    "medicines": [
      "Antivirals",
      "Direct-acting antivirals"
    ],
    "homeRemedies": [
      "Turmeric for liver health.",
      "Diet rich in antioxidants."
    ]
  },
  {
    "name": "Hepatitis D",
    "prevention": [
      "Vaccination for Hepatitis B.",
      "Avoid risky behaviors."
    ],
    "medicines": [
      "Antivirals",
      "Supportive care"
    ],
    "homeRemedies": [
      "Healthy diet.",
      "Regular exercise."
    ]
  },
  {
    "name": "Hepatitis E",
    "prevention": [
      "Good sanitation.",
      "Avoid contaminated water."
    ],
    "medicines": [
      "Supportive care",
      "Hydration"
    ],
    "homeRemedies": [
      "Coconut water.",
      "Ginger tea."
    ]
  },
  {
    "name": "Alcoholic hepatitis",
    "prevention": [
      "Limit alcohol consumption.",
      "Maintain a healthy diet."
    ],
    "medicines": [
      "Corticosteroids",
      "Nutritional support"
    ],
    "homeRemedies": [
      "Milk thistle.",
      "Turmeric."
    ]
  },
  {
    "name": "Tuberculosis",
    "prevention": [
      "Vaccination (BCG).",
      "Avoid close contact with infected individuals."
    ],
    "medicines": [
      "Antituberculosis drugs",
      "Rifampicin"
    ],
    "homeRemedies": [
      "Garlic for immunity.",
      "Turmeric milk."
    ]
  },
  {
    "name": "Common Cold",
    "prevention": [
      "Wash hands frequently.",
      "Avoid close contact with sick individuals."
    ],
    "medicines": [
      "Decongestants",
      "Antihistamines"
    ],
    "homeRemedies": [
      "Honey and lemon in warm water.",
      "Ginger tea."
    ]
  },
  {
    "name": "Pneumonia",
    "prevention": [
      "Vaccination.",
      "Good hygiene."
    ],
    "medicines": [
      "Antibiotics",
      "Cough medicine"
    ],
    "homeRemedies": [
      "Steam inhalation.",
      "Warm fluids."
    ]
  },
  {
    "name": "Dimorphic hemorrhoids (piles)",
    "prevention": [
      "High-fiber diet.",
      "Stay hydrated."
    ],
    "medicines": [
      "Topical treatments",
      "Oral pain relievers"
    ],
    "homeRemedies": [
      "Warm sitz baths.",
      "Aloe vera."
    ]
  },
  {
    "name": "Heart attack",
    "prevention": [
      "Healthy lifestyle choices.",
      "Regular health check-ups."
    ],
    "medicines": [
      "Aspirin",
      "Beta-blockers"
    ],
    "homeRemedies": [
      "Garlic for heart health.",
      "Omega-3 fatty acids."
    ]
  },
  {
    "name": "Varicose veins",
    "prevention": [
      "Regular exercise.",
      "Avoid long periods of standing."
    ],
    "medicines": [
      "Compression stockings",
      "Sclerotherapy"
    ],
    "homeRemedies": [
      "Leg elevation.",
      "Apple cider vinegar."
    ]
  },
  {
    "name": "Hypothyroidism",
    "prevention": [
      "Regular check-ups.",
      "Manage stress."
    ],
    "medicines": [
      "Levothyroxine"
    ],
    "homeRemedies": [
      "Iodine-rich foods.",
      "Regular exercise."
    ]
  },
  {
    "name": "Hyperthyroidism",
    "prevention": [
      "Regular medical check-ups.",
      "Manage stress."
    ],
    "medicines": [
      "Antithyroid medications",
      "Beta-blockers"
    ],
    "homeRemedies": [
      "Avoid caffeine.",
      "Healthy diet."
    ]
  },
  {
    "name": "Hypoglycemia",
    "prevention": [
      "Regular meals and snacks.",
      "Avoid excessive alcohol."
    ],
    "medicines": [
      "Glucose tablets",
      "Glucagon"
    ],
    "homeRemedies": [
      "Honey for quick sugar boost.",
      "Orange juice."
    ]
  },
  {
    "name": "Osteoarthritis",
    "prevention": [
      "Maintain a healthy weight.",
      "Regular exercise."
    ],
    "medicines": [
      "Pain relievers",
      "Topical treatments"
    ],
    "homeRemedies": [
      "Warm compresses.",
      "Turmeric milk."
    ]
  },
  {
    "name": "Arthritis",
    "prevention": [
      "Regular exercise.",
      "Healthy diet."
    ],
    "medicines": [
      "NSAIDs",
      "Corticosteroids"
    ],
    "homeRemedies": [
      "Cold compresses.",
      "Turmeric."
    ]
  },
  {
    "name": "Paroxysmal Positional Vertigo",
    "prevention": [
      "Avoid head movements that trigger symptoms."
    ],
    "medicines": [
      "Vestibular suppressants"
    ],
    "homeRemedies": [
      "Epley maneuver.",
      "Ginger tea."
    ]
  },
  {
    "name": "Acne",
    "prevention": [
      "Keep skin clean.",
      "Avoid touching the face."
    ],
    "medicines": [
      "Topical retinoids",
      "Antibiotics"
    ],
    "homeRemedies": [
      "Tea tree oil.",
      "Aloe vera gel."
    ]
  },
  {
    "name": "Urinary tract infection",
    "prevention": [
      "Stay hydrated.",
      "Urinate after intercourse."
    ],
    "medicines": [
      "Antibiotics",
      "Pain relievers"
    ],
    "homeRemedies": [
      "Cranberry juice.",
      "Warm compress."
    ]
  },
  {
    "name": "Psoriasis",
    "prevention": [
      "Moisturize skin regularly.",
      "Avoid triggers."
    ],
    "medicines": [
      "Topical corticosteroids",
      "Phototherapy"
    ],
    "homeRemedies": [
      "Aloe vera gel.",
      "Oatmeal baths."
    ]
  },
  {
    "name": "Impetigo",
    "prevention": [
      "Keep wounds clean.",
      "Avoid sharing personal items."
    ],
    "medicines": [
      "Antibiotic ointments",
      "Oral antibiotics"
    ],
    "homeRemedies": [
      "Honey for its antibacterial properties.",
      "Tea tree oil."
    ]
  }
];
   
  //  module.exports = diseasesData;
  export default diseasesData;