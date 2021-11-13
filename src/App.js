import   {useState, useEffect, useCallback} from 'react';
import {BsCalendarEvent as CalIcon}  from "react-icons/bs";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return(
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a,b) => {
    return(
      (orderBy === 'asc' ? 1 : -1) * (a[sortBy].toLowerCase() >= b[sortBy].toLowerCase() ? 1 : -1)
    );
  }) ;

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
        <Search query={query}
          onQueryChange={myQuery => setQuery(myQuery)}
          orderBy = {orderBy} onOrderByChange = {myOrder => setOrderBy(myOrder)}
          sortBy = {sortBy} onSortByChange = {mySort => setSortBy(mySort)}
        />
        <ul className="divide-y divide-gray-200">
          {filteredAppointments.map(appointment => (
            <AppointmentInfo  key={appointment.id}
              apptmt = {appointment}
              onDeleteAppointment = {appointmentId =>
                setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId ))}
             />

          ))
        }

        </ul>
    </div>
  );
}

export default App;
