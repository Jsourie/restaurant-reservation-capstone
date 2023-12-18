import React, { useEffect, Link, useState } from "react";
import { listReservations,listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Tables() {
  
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

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
        <h4 className="mb-0">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />

      {/* Display reservations as individual cards */}
      <div className="card-container">
        {tables.map((table) => (
          <div key={tables.table_id} className="card">
           <button className="btn btn-secondary">Seat</button>
            <h5 className="card-title">{table.table_name}, {table.capacity}</h5>
    
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Tables;