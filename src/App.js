import   {useState, useEffect, useCallback} from 'react';
import {BsCalendarEvent as CalIcon}  from "react-icons/bs";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {

  let [appointmentList, setAppointmentList] = useState([]);

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData]);


  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        <CalIcon className="inline-block text-blue-600 align-top" /> Appointments</h1>
        <AddAppointment />
        <Search />
        <ul className="divide-y divide-gray-200">
          {appointmentList.map(appointment => (
            <AppointmentInfo  key={appointment.id} apptmt = {appointment}  />
          ))
        }

        </ul>
    </div>
  );
}

export default App;
