// Centralized dummy data for open-source contributors to use
// All demo users share the same password for convenience

export const DEMO_PASSWORD = 'password123';
export const COUNTRY_CODES = [
  { code: "+1", symbol: "US" },
  { code: "+91", symbol: "IN" },
  { code: "+44", symbol: "UK" },
  { code: "+81", symbol: "JP" },
  { code: "+61", symbol: "AU" },
  { code: "+971", symbol: "AE" },
  { code: "+92", symbol: "PK" },
  { code: "+880", symbol: "BD" },
  { code: "+49", symbol: "DE" },
  { code: "+86", symbol: "CN" },
  { code: "+7", symbol: "RU" },
  { code: "+34", symbol: "ES" },
  { code: "+39", symbol: "IT" },
  { code: "+33", symbol: "FR" },
  { code: "+60", symbol: "MY" },
  { code: "+65", symbol: "SG" },
  { code: "+20", symbol: "EG" },
  { code: "+62", symbol: "ID" },
  { code: "+63", symbol: "PH" },
  { code: "+27", symbol: "ZA" },  // South Africa
  { code: "+54", symbol: "AR" },  // Argentina
  { code: "+48", symbol: "PL" },  // Poland
  { code: "+41", symbol: "CH" },  // Switzerland
  { code: "+46", symbol: "SE" },  // Sweden
  { code: "+31", symbol: "NL" },  // Netherlands
  { code: "+82", symbol: "KR" },  // South Korea
  { code: "+30", symbol: "GR" },  // Greece
  { code: "+358", symbol: "FI" }, // Finland
  { code: "+64", symbol: "NZ" },  // New Zealand
  { code: "+234", symbol: "NG" }, // Nigeria
  { code: "+212", symbol: "MA" }, // Morocco
  { code: "+351", symbol: "PT" }, // Portugal
  { code: "+351", symbol: "PT" }, // Portugal
  { code: "+52", symbol: "MX" },  // Mexico
  { code: "+357", symbol: "CY" }, // Cyprus
  { code: "+353", symbol: "IE" }, // Ireland
  { code: "+90", symbol: "TR" },  // Turkey
  { code: "+354", symbol: "IS" }, // Iceland
  { code: "+297", symbol: "AW" }, // Aruba
  { code: "+359", symbol: "BG" }, // Bulgaria
  { code: "+389", symbol: "MK" }, // North Macedonia
  { code: "+226", symbol: "BF" }, // Burkina Faso
  { code: "+223", symbol: "ML" }, // Mali
  { code: "+995", symbol: "GE" }, // Georgia
];


export let doctors = [
  {
    id: 'doc1',
    role: 'doctor',
    email: 'sarah.j@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    availability: ['09:00 AM', '11:00 AM', '02:00 PM'],
  },
  {
    id: 'doc2',
    role: 'doctor',
    email: 'emily.w@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Dr. Emily White',
    specialization: 'Dermatology',
    availability: ['10:00 AM', '12:00 PM', '03:00 PM'],
  },
];

export let patients = [
  {
    id: 'pat1',
    role: 'patient',
    email: 'john.d@caresync.com',
    password: DEMO_PASSWORD,
    name: 'John Doe',
  },
  {
    id: 'pat2',
    role: 'patient',
    email: 'jane.s@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Jane Smith',
  },
];

export let pharmacists = [
  {
    id: 'pharma1',
    role: 'pharmacist',
    email: 'mike.w@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Mike Wilson',
  },
  {
    id: 'pharma2',
    role: 'pharmacist',
    email: 'susan.c@caresync.com',
    password: DEMO_PASSWORD,
    name: 'Susan Clark',
  },
];

export let appointments = [
  {
    id: 'apt1',
    patientId: 'pat1',
    doctorId: 'doc1',
    date: '2025-08-15',
    time: '09:00 AM',
    status: 'Confirmed',
  },
  {
    id: 'apt2',
    patientId: 'pat2',
    doctorId: 'doc2',
    date: '2025-08-16',
    time: '10:00 AM',
    status: 'Pending',
  },
];

export let allUsers = [...patients, ...doctors, ...pharmacists];

export let usersByEmail = allUsers.reduce((acc, u) => {
  acc[u.email] = u;
  return acc;
}, {});

export const findDoctorById = (id) => allUsers.find((d) => d.id === id && d.role === 'doctor');
export const findPatientById = (id) => allUsers.find((p) => p.id === id && p.role === 'patient');

export const addUser = (user) => {
  if (user.role === 'patient') {
    patients.push(user);
  } else if (user.role === 'doctor') {
    doctors.push(user);
  } else if (user.role === 'pharmacist') {
    pharmacists.push(user);
  }
  allUsers.push(user);
  usersByEmail[user.email] = user;
};
