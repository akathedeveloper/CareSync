import React, { useState, useMemo } from 'react';
import { useAppointments } from '../../contexts/AppointmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { findDoctorById } from '../../data/dummyData';

const Appointments = () => {
  const { user } = useAuth();
  const {
    appointments,
    doctors,
    bookAppointment,
  } = useAppointments();

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const patientAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter(apt => apt.patientId === user.id)
      .map(apt => ({
        ...apt,
        doctor: findDoctorById(apt.doctorId),
        isUpcoming: new Date(`${apt.date}T${apt.time.replace(' ', '')}`) >= now && apt.status !== 'Cancelled' && apt.status !== 'Rejected'
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [appointments, user.id]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (selectedDoctor && selectedDate && selectedTime) {
      bookAppointment({
        patientId: user.id,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      });
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const AppointmentCard = ({ apt }) => (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
    >
      <div className={`absolute top-4 right-4 px-3 py-1 text-white text-xs font-bold rounded-full ${apt.isUpcoming ? 'bg-blue-500' : 'bg-gray-500'}`}>
        {apt.isUpcoming ? 'Upcoming' : 'Past'}
      </div>
      <div className={`h-2 ${getStatusClass(apt.status)}`}></div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Dr. {apt.doctor?.name || 'N/A'}</h3>
        <p className="text-gray-600 mb-2"><strong>Date:</strong> {apt.date}</p>
        <p className="text-gray-600 mb-4"><strong>Time:</strong> {apt.time}</p>
        <div className="flex justify-between items-center">
          <span className={`px-4 py-1 text-white text-sm font-semibold rounded-full ${getStatusClass(apt.status)}`}>
            {apt.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl shadow-lg">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">Your Appointments</h2>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {patientAppointments.length > 0 ? (
          patientAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">You have no appointments.</p>
        )}
      </div>

      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Book a New Appointment</h3>
        <form onSubmit={handleBooking} className="flex flex-col gap-6">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Doctor</option>
            {doctors && doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedDoctor}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          >
            <option value="">Select a Time</option>
            {selectedDoctor &&
              doctors
                .find((d) => d.id === selectedDoctor)
                ?.availability?.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
          </select>
          <button 
            type="submit"
            className="p-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointments;
