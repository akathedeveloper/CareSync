// Centralized dummy data for open-source contributors to use
// All demo users share the same password for convenience

export const DEMO_PASSWORD = 'password123';

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
