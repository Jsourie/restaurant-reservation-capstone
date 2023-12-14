import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {createReservation } from "../utils/api"

function NewReservation() {
    const history = useHistory();
  
    const initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: "",
    };
  
    const [formData, setFormData] = useState({ ...initialFormState });
    const [errorMessage, setErrorMessage] = useState(null);
  
    const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = formData;
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (isInvalidReservation()) {
        return;
      }
  
      createReservation(formData)
        .then(() => {
          setFormData({ ...initialFormState });
  
          const reservationDate = formData.reservation_date;
  
          const dashboardRoute = `/dashboard?date=${reservationDate}`;
          history.push(dashboardRoute);
        })
        .catch((error) => {
          console.error("Error creating reservation:", error);
        });
    };
  
    const isInvalidReservation = () => {
        const today = new Date();
        const selectedDate = new Date(reservation_date);
        const errorMessages = [];
      
        if (selectedDate.getDay() === 2) {
            console.log("Tuesday condition met");

          errorMessages.push("The restaurant is closed on Tuesdays.");
        }
      
        if (selectedDate < today) {
          errorMessages.push("Reservation date must be in the future.");
        }
      
        if (errorMessages.length > 0) {
          setErrorMessage(errorMessages.join(" "));
          return true;
        } else {
          setErrorMessage(null);
          return false;
        }
      };
      
  
    return (
      <div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleInputChange}
            value={first_name}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
           <input
            id="last_name"
            type="text"
            name="last_name"
            onChange={handleInputChange}
            value={last_name}
            className="form-control"
            required
          />
            </div>
             
            <div className="form-group">
            <label htmlFor="mobile_number">Phone Number</label>
           <input
          type="tel"  
          name="mobile_number"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
          value={mobile_number}
          onChange={handleInputChange}
          placeholder="e.g., 555-123-4567"
          required
        />
         </div>
         <div className="form-group">
  <label htmlFor="reservation_date">Date of reservation</label>
  <input
    type="date"
    id="reservation_date"
    name="reservation_date"
    value={reservation_date}
    onChange={handleInputChange}
    className="form-control"
    required
  />
</div>
<div className="form-group">
  <label htmlFor="reservation_time">Time of reservation</label>
  <input
    type="time"
    id="reservation_time"
    name="reservation_time"
    value={reservation_time}
    onChange={handleInputChange}
    className="form-control"
    required
  />
</div>
<div className="form-group">
  <label htmlFor="people">Number of People</label>
  <input
    type="people"
    id="people"
    name="people"
    value={people}
    onChange={handleInputChange}
    className="form-control"
    min="1"
    required
  />
</div>
        <div className="text-center">
          <Link to="/" className="btn btn-danger mr-2">Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}

export default NewReservation;