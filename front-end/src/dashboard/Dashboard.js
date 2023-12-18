import React, { useEffect, Link, useState } from "react";
import { listReservations,listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }


  useEffect(loadTables);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />

      {/* Display reservations as individual cards */}
      <div className="card-container">
        {reservations.map((reservation) => (
          <div key={reservation.reservation_id} className="card">
           <button className="btn btn-secondary">Seat</button>
            <h5 className="card-title">{reservation.last_name}, {reservation.first_name}</h5>
            <p className="card-text">Date: {reservation.reservation_date}</p>
            <p className="card-text">Time: {reservation.reservation_time}</p>
            {/* Add more details as needed */}
          </div>
          
        ))}
      </div>
      <div className="card-container">
        {tables.map((table) => (
          <div key={tables.table_id} className="card">
            <h5 className="card-title">{table.table_name}, {table.capacity}</h5>
    
            {/* Add more details as needed */}
          </div>
 ))}
 </div>

    </main>
  );
}

export default Dashboard;