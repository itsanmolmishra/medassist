export interface TestResult {
  parameter: string;
  value: string;
  normalRange: string;
  unit: string;
  status: 'normal' | 'attention' | 'critical';
}

export interface TrendDataPoint {
  date: string;
  value: number;
}

export interface Report {
  id: string;
  name: string;
  date: string;
  status: 'normal' | 'attention' | 'critical';
  patientName: string;
  patientAge: number;
  patientGender: string;
  testResults: TestResult[];
  aiExplanation: string;
  recommendations: {
    lifestyle: string[];
    diet: string[];
    consultation: string[];
    emergency: string[];
  };
  carePlan?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export const mockReports: Report[] = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    date: 'Dec 10, 2025',
    status: 'attention',
    patientName: 'John Doe',
    patientAge: 35,
    patientGender: 'Male',
    testResults: [
      {
        parameter: 'Hemoglobin',
        value: '11.5',
        normalRange: '13.5-17.5',
        unit: 'g/dL',
        status: 'attention',
      },
      {
        parameter: 'RBC Count',
        value: '4.2',
        normalRange: '4.5-5.5',
        unit: 'million/µL',
        status: 'attention',
      },
      {
        parameter: 'WBC Count',
        value: '7.2',
        normalRange: '4.0-11.0',
        unit: 'thousand/µL',
        status: 'normal',
      },
      {
        parameter: 'Platelet Count',
        value: '220',
        normalRange: '150-400',
        unit: 'thousand/µL',
        status: 'normal',
      },
      {
        parameter: 'Hematocrit',
        value: '38',
        normalRange: '40-50',
        unit: '%',
        status: 'attention',
      },
    ],
    aiExplanation: 'Your Complete Blood Count test shows some values that need attention. Your hemoglobin and red blood cell count are slightly below the normal range, which may indicate mild anemia. This could be due to iron deficiency, vitamin B12 deficiency, or other nutritional factors. Your white blood cell and platelet counts are within normal ranges, which is good news for your immune system and blood clotting function.',
    recommendations: {
      lifestyle: [
        'Get adequate sleep (7-8 hours per night)',
        'Engage in moderate exercise, but avoid overexertion',
        'Manage stress through relaxation techniques',
      ],
      diet: [
        'Increase iron-rich foods (spinach, red meat, lentils)',
        'Consume vitamin C with iron-rich meals for better absorption',
        'Add vitamin B12 sources (eggs, dairy, fortified cereals)',
        'Stay hydrated with at least 8 glasses of water daily',
      ],
      consultation: [
        'Schedule a follow-up with your primary care physician within 2-3 weeks',
        'Consider consulting a hematologist if symptoms persist',
        'Discuss iron or vitamin supplementation with your doctor',
      ],
      emergency: [
        'Seek immediate care if you experience severe fatigue or weakness',
        'Visit ER for unusual bruising or bleeding',
        'Get help immediately for shortness of breath or chest pain',
      ],
    },
    carePlan: {
      immediate: [
        'Start drinking at least 8 glasses of water daily',
        'Begin taking a multivitamin with iron (consult doctor first)',
        'Avoid strenuous physical activity until levels improve',
      ],
      shortTerm: [
        'Schedule appointment with primary care doctor this week',
        'Start incorporating iron-rich foods in every meal',
        'Begin light walking for 15-20 minutes daily',
        'Keep a food diary to track iron and B12 intake',
        'Get adequate rest (aim for 7-9 hours of sleep)',
      ],
      longTerm: [
        'Maintain a balanced diet rich in iron, B12, and folate',
        'Gradually increase exercise intensity as energy improves',
        'Get follow-up blood work in 6-8 weeks',
        'Consider working with a nutritionist for meal planning',
        'Monitor symptoms and track progress monthly',
      ],
    },
  },
  {
    id: '2',
    name: 'Lipid Profile',
    date: 'Nov 28, 2025',
    status: 'critical',
    patientName: 'John Doe',
    patientAge: 35,
    patientGender: 'Male',
    testResults: [
      {
        parameter: 'Total Cholesterol',
        value: '265',
        normalRange: '<200',
        unit: 'mg/dL',
        status: 'critical',
      },
      {
        parameter: 'LDL Cholesterol',
        value: '180',
        normalRange: '<100',
        unit: 'mg/dL',
        status: 'critical',
      },
      {
        parameter: 'HDL Cholesterol',
        value: '38',
        normalRange: '>40',
        unit: 'mg/dL',
        status: 'attention',
      },
      {
        parameter: 'Triglycerides',
        value: '235',
        normalRange: '<150',
        unit: 'mg/dL',
        status: 'critical',
      },
    ],
    aiExplanation: 'Your lipid profile shows concerning results that require immediate attention. Your total cholesterol and LDL (bad cholesterol) levels are significantly elevated, while your HDL (good cholesterol) is below optimal. High triglycerides combined with high LDL increases your risk for cardiovascular disease. These results suggest you may need lifestyle modifications and possibly medication to manage your cholesterol levels.',
    recommendations: {
      lifestyle: [
        'Start regular aerobic exercise (30 minutes, 5 days/week)',
        'Quit smoking if applicable',
        'Reduce alcohol consumption',
        'Maintain healthy weight (aim for BMI 18.5-24.9)',
      ],
      diet: [
        'Follow a heart-healthy Mediterranean diet',
        'Limit saturated fats and trans fats',
        'Increase omega-3 fatty acids (fish, walnuts, flaxseeds)',
        'Add soluble fiber (oats, beans, apples)',
        'Eliminate processed and fried foods',
      ],
      consultation: [
        'Schedule urgent appointment with cardiologist',
        'Discuss statin medication with your doctor',
        'Get cardiovascular risk assessment',
        'Consider working with a registered dietitian',
      ],
      emergency: [
        'Seek immediate care for chest pain or pressure',
        'Call 911 for severe shortness of breath',
        'Get help for sudden numbness or weakness',
      ],
    },
    carePlan: {
      immediate: [
        'Stop eating fried and processed foods immediately',
        'Schedule cardiologist appointment today',
        'Start walking for 15 minutes after each meal',
      ],
      shortTerm: [
        'Begin Mediterranean diet this week',
        'Increase exercise to 30 minutes daily',
        'Start taking prescribed statin medication if recommended',
        'Get cholesterol rechecked in 6 weeks',
        'Keep a food and exercise diary',
      ],
      longTerm: [
        'Maintain heart-healthy eating habits permanently',
        'Regular cardiovascular exercise (150 min/week)',
        'Annual lipid panel monitoring',
        'Maintain healthy weight (target BMI < 25)',
        'Regular check-ups with cardiologist',
      ],
    },
  },
  {
    id: '3',
    name: 'Metabolic Panel',
    date: 'Oct 15, 2025',
    status: 'normal',
    patientName: 'John Doe',
    patientAge: 35,
    patientGender: 'Male',
    testResults: [
      {
        parameter: 'Glucose (Fasting)',
        value: '92',
        normalRange: '70-100',
        unit: 'mg/dL',
        status: 'normal',
      },
      {
        parameter: 'Creatinine',
        value: '0.9',
        normalRange: '0.7-1.3',
        unit: 'mg/dL',
        status: 'normal',
      },
      {
        parameter: 'Sodium',
        value: '140',
        normalRange: '136-145',
        unit: 'mEq/L',
        status: 'normal',
      },
      {
        parameter: 'Potassium',
        value: '4.2',
        normalRange: '3.5-5.0',
        unit: 'mEq/L',
        status: 'normal',
      },
    ],
    aiExplanation: 'Great news! Your metabolic panel results are all within normal ranges. Your blood sugar, kidney function markers, and electrolyte levels are healthy. This indicates good metabolic health and proper kidney function. Continue maintaining your current healthy lifestyle habits.',
    recommendations: {
      lifestyle: [
        'Continue your current exercise routine',
        'Maintain consistent sleep schedule',
        'Keep up with stress management practices',
      ],
      diet: [
        'Continue balanced, nutritious diet',
        'Stay well-hydrated',
        'Maintain moderate portions',
      ],
      consultation: [
        'Schedule annual check-up with primary care physician',
        'Continue routine health screenings as recommended',
      ],
      emergency: [],
    },
  },
];

export const demoReport: Report = mockReports[0];

// Trend data for charts
export const hemoglobinTrend: TrendDataPoint[] = [
  { date: 'Jul', value: 10.2 },
  { date: 'Aug', value: 10.8 },
  { date: 'Sep', value: 11.0 },
  { date: 'Oct', value: 11.3 },
  { date: 'Nov', value: 11.4 },
  { date: 'Dec', value: 11.5 },
];

export const cholesterolTrend: TrendDataPoint[] = [
  { date: 'Jul', value: 285 },
  { date: 'Aug', value: 280 },
  { date: 'Sep', value: 275 },
  { date: 'Oct', value: 272 },
  { date: 'Nov', value: 268 },
  { date: 'Dec', value: 265 },
];

export const glucoseTrend: TrendDataPoint[] = [
  { date: 'Jul', value: 105 },
  { date: 'Aug', value: 102 },
  { date: 'Sep', value: 98 },
  { date: 'Oct', value: 95 },
  { date: 'Nov', value: 93 },
  { date: 'Dec', value: 92 },
];