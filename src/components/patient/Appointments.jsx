import React, { useState, useMemo, useRef, useEffect } from "react";
import { useAppointments } from "../../contexts/AppointmentContext";
import { useAuth } from "../../contexts/AuthContext";
import { findDoctorById } from "../../data/dummyData";
import { ChevronDownIcon, CalendarIcon, ClockIcon, UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const Appointments = () => {
  const { user } = useAuth();
  const { appointments, doctors, bookAppointment } = useAppointments();

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState(user?.name || "");
  const [notes, setNotes] = useState("");
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const doctorRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (doctorRef.current && !doctorRef.current.contains(event.target)) {
        setIsDoctorOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setIsTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear selected time when date or doctor changes to ensure consistency
  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate, selectedDoctor]);

  const patientAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((apt) => apt.patientId === user.id)
      .map((apt) => ({
        ...apt,
        doctor: findDoctorById(apt.doctorId),
        isUpcoming:
          new Date(`${apt.date}T${apt.time.replace(" ", "")}`) >= now &&
          apt.status !== "Cancelled" &&
          apt.status !== "Rejected",
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [appointments, user.id]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (selectedDoctor && selectedDate && selectedTime && patientName) {
      bookAppointment({
        patientId: user.id,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        patientName: patientName,
        notes: notes,
      });
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTime("");
      setPatientName(user?.name || "");
      setNotes("");
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const AppointmentCard = ({ apt }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <div className={`h-1 ${getStatusClass(apt.status).split(' ')[0]}`}></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(apt.status)}`}>
            {apt.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
            <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Dr. {apt.doctor?.name || "N/A"}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {apt.doctor?.specialization || "Specialization not available"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <CalendarIcon className="w-5 h-5 mr-3 text-gray-400" />
            <span className="font-medium">{formatDate(apt.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <ClockIcon className="w-5 h-5 mr-3 text-gray-400" />
            <span className="font-medium">{apt.time}</span>
          </div>

          {apt.patientName && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <UserIcon className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium">{apt.patientName}</span>
            </div>
          )}

          {apt.notes && (
            <div className="flex items-start text-gray-600 dark:text-gray-300">
              <DocumentTextIcon className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <span className="text-sm">{apt.notes}</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
            apt.isUpcoming ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}>
            {apt.isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>
    </div>
  );

  const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder,
    isOpen,
    setIsOpen,
    ref,
    disabled = false,
    icon: Icon,
  }) => {
    const selectedOption = options?.find((option) => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : value;

    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors ${
            disabled
              ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          } ${
            value
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <div className="flex items-center">
            {Icon && <Icon className="w-5 h-5 mr-3 text-gray-400" />}
            <span className="block truncate">{displayValue || placeholder}</span>
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options && options.length > 0 ? (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none transition-colors"
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                No options available
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const doctorOptions = doctors
    ? doctors.map((doc) => ({
        value: doc.id,
        label: `${doc.name} - ${doc.specialization}`,
      }))
    : [];

  // Enhanced time filtering logic with better current time handling
  const timeOptions = useMemo(() => {
    if (!selectedDoctor || !selectedDate) return [];

    const doctor = doctors.find((d) => d.id === selectedDoctor);
    if (!doctor?.availability) return [];

    const now = new Date();
    const todayString = now.toISOString().split('T')[0];
    const isToday = selectedDate === todayString;

    return doctor.availability
      .filter((timeSlot) => {
        if (!isToday) return true;
        
        // Parse the time slot - handle different formats
        let hours, minutes;
        
        // Handle formats like "09:00", "9:00 AM", "2:00 PM", etc.
        if (timeSlot.includes('AM') || timeSlot.includes('PM')) {
          // Handle 12-hour format
          const timeOnly = timeSlot.replace(/\s*(AM|PM)/i, '');
          [hours, minutes] = timeOnly.split(':').map(Number);
          const isPM = timeSlot.toUpperCase().includes('PM');
          
          if (isPM && hours !== 12) {
            hours += 12;
          } else if (!isPM && hours === 12) {
            hours = 0;
          }
        } else {
          // Handle 24-hour format
          [hours, minutes] = timeSlot.split(':').map(Number);
        }
        
        // Get current time in minutes since midnight
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTotalMinutes = currentHours * 60 + currentMinutes;
        
        // Get slot time in minutes since midnight
        const slotTotalMinutes = hours * 60 + (minutes || 0);
        
        // Only show time slots that are greater than current time
        return slotTotalMinutes > currentTotalMinutes;
      })
      .map((time) => ({
        value: time,
        label: time,
      }));
  }, [selectedDoctor, selectedDate, doctors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Appointments
          </h1>
        </div>

        <div className="mb-12">
          {patientAppointments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {patientAppointments.map((apt) => (
                <AppointmentCard key={apt.id} apt={apt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                You have no scheduled appointments
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Schedule your first medical appointment using the form below
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Book a New Appointment
            </h3>
            <p className="text-blue-100 text-center mt-2">
              Complete the form to schedule your medical appointment
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label htmlFor="patientName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Patient Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="patientName"
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select Doctor
                </label>
                <CustomSelect
                  value={selectedDoctor}
                  onChange={setSelectedDoctor}
                  options={doctorOptions}
                  placeholder="Choose a doctor and specialization"
                  isOpen={isDoctorOpen}
                  setIsOpen={setIsDoctorOpen}
                  ref={doctorRef}
                  icon={UserIcon}
                />
              </div>

              <div>
                <label htmlFor="appointmentDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Appointment Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="appointmentDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onClick={(e) => e.target.showPicker?.()}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Appointment Time
                </label>
                <CustomSelect
                  value={selectedTime}
                  onChange={setSelectedTime}
                  options={timeOptions}
                  placeholder={
                    !selectedDoctor 
                      ? "Select a doctor first" 
                      : !selectedDate 
                      ? "Select a date first"
                      : timeOptions.length === 0 
                      ? "No available slots for today" 
                      : "Select an available time"
                  }
                  isOpen={isTimeOpen}
                  setIsOpen={setIsTimeOpen}
                  ref={timeRef}
                  disabled={!selectedDoctor || !selectedDate}
                  icon={ClockIcon}
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <div className="relative">
                  <DocumentTextIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly describe the reason for your consultation or any additional information..."
                    rows="4"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedDoctor || !selectedDate || !selectedTime || !patientName}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none enabled:hover:scale-[1.02] enabled:active:scale-[0.98]"
              >
                Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;