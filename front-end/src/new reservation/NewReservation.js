import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import NewReservationForm from "./NewReservationForm";

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const today = new Date();
    const selectedDateTime = new Date(`${formData.reservation_date}  ${formData.reservation_time}`);
    const openingTime = new Date(`${formData.reservation_date} 10:30:00`);
    const closingTime = new Date(`${formData.reservation_date} 21:30:00`);
    const errorMessages = [];

    if (selectedDateTime.getDay() === 2) {
      errorMessages.push("The restaurant is closed on Tuesdays.");
    }

    if (selectedDateTime < today) {
      errorMessages.push("Reservation date must be in the future.");
    }

    if (selectedDateTime < openingTime) {
      errorMessages.push("Reservation time must be after 10:30 AM.");
    }

    if (selectedDateTime > closingTime) {
      errorMessages.push("Reservation time must be before 9:30 PM.");
    }

    if (errorMessages.length > 0) {
      // Display multiple error messages in a single alert
      const combinedErrorMessage = errorMessages.join(" ");
      console.log("Error messages:", combinedErrorMessage);

      setErrorMessage([combinedErrorMessage]);
      return;
    }

    // If no errors, proceed with reservation creation
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

    // Clear error messages if there are no errors
    setErrorMessage(null);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      {errorMessage && errorMessage.map((error, index) => (
        <div key={index} className="alert alert-danger">
          {error}
        </div>
      ))}
      <NewReservationForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        goBack={goBack}
      />
    </div>
  );
}

export default NewReservation;
