import React, { useState, useMemo } from 'react';
import { useAppointments } from '../../contexts/AppointmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { findDoctorById } from '../../data/dummyData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Appointments = () => {
  const { user } = useAuth();
  const { appointments, doctors, bookAppointment } = useAppointments();

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // store Date object for DatePicker
  const [selectedTime, setSelectedTime] = useState('');

  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // ---- Helpers to handle 12h/24h times ----
  const normalizeTime = (str = '') => str.trim().toUpperCase();

  const parseTimeToMinutes = (timeStr) => {
    const s = normalizeTime(timeStr).replace(/\s+/g, '');
    const m12 = s.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);
    const m24 = s.match(/^(\d{1,2}):(\d{2})$/);

    let h, m;
    if (m12) {
      h = parseInt(m12[1], 10);
      m = parseInt(m12[2], 10);
      const mer = m12[3];
      if (mer === 'AM') {
        if (h === 12) h = 0;
      } else {
        if (h !== 12) h += 12;
      }
      return h * 60 + m;
    }

    if (m24) {
      h = parseInt(m24[1], 10);
      m = parseInt(m24[2], 10);
      if (isNaN(h) || isNaN(m)) return null;
      return h * 60 + m;
    }

    return null;
  };

  const to24h = (timeStr) => {
    const mins = parseTimeToMinutes(timeStr);
    if (mins == null) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const combineDateAndTime = (dateObj, timeStr) => {
    const t24 = to24h(timeStr);
    if (!t24 || !(dateObj instanceof Date)) return null;
    const [hh, mm] = t24.split(':').map(Number);
    const d = new Date(dateObj);
    d.setHours(hh, mm, 0, 0);
    return d;
  };
  // ----------------------------------------

  const patientAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((apt) => apt.patientId === user.id)
      .map((apt) => {
        const when = combineDateAndTime(new Date(apt.date), apt.time);
        const isUpcoming =
          !!when &&
          when >= now &&
          apt.status !== 'Cancelled' &&
          apt.status !== 'Rejected';
        return {
          ...apt,
          doctor: findDoctorById(apt.doctorId),
          isUpcoming,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [appointments, user.id]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    const selectedDateTime = combineDateAndTime(selectedDate, selectedTime);
    const now = new Date();

    if (!selectedDateTime || selectedDateTime < now) {
      alert('You cannot book an appointment in the past.');
      return;
    }

    bookAppointment({
      patientId: user.id,
      doctorId: selectedDoctor,
      date: selectedDate.toISOString().split('T')[0], // keep as YYYY-MM-DD
      time: selectedTime,
    });

    setSelectedDoctor('');
    setSelectedDate(null);
    setSelectedTime('');
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div
        className={`absolute top-4 right-4 px-3 py-1 text-white text-xs font-bold rounded-full ${
          apt.isUpcoming ? 'bg-blue-500' : 'bg-gray-500'
        }`}
      >
        {apt.isUpcoming ? 'Upcoming' : 'Past'}
      </div>
      <div className={`h-2 ${getStatusClass(apt.status)}`}></div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Dr. {apt.doctor?.name || 'N/A'}
        </h3>
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {apt.date}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Time:</strong> {apt.time}
        </p>
        <div className="flex justify-between items-center">
          <span
            className={`px-4 py-1 text-white text-sm font-semibold rounded-full ${getStatusClass(
              apt.status
            )}`}
          >
            {apt.status}
          </span>
        </div>
      </div>
    </div>
  );

  const getAvailableTimes = () => {
    if (!selectedDoctor) return [];
    const doc = doctors?.find((d) => String(d.id) === String(selectedDoctor));
    if (!doc?.availability) return [];

    const selectedDateStr = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : '';

    if (selectedDateStr === todayStr) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      return doc.availability.filter((time) => {
        const mins = parseTimeToMinutes(time);
        return mins != null && mins > currentMinutes;
      });
    }
    return doc.availability;
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl shadow-lg">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">Your Appointments</h2>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {patientAppointments.length > 0 ? (
          patientAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            You have no appointments.
          </p>
        )}
      </div>

      <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Book a New Appointment
        </h3>
        <form onSubmit={handleBooking} className="flex flex-col gap-6">
          <select
            value={selectedDoctor}
            onChange={(e) => {
              setSelectedDoctor(e.target.value);
              setSelectedTime('');
            }}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Doctor</option>
            {doctors &&
              doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.specialization}
                </option>
              ))}
          </select>

          {/* Updated Calendar UI */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedTime('');
            }}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            calendarClassName="shadow-lg border border-gray-200 rounded-lg p-2"
          />

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedDoctor || !selectedDate}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          >
            <option value="">Select a Time</option>
            {getAvailableTimes().map((time) => (
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
