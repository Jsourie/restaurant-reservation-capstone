import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../new reservation/NewReservation";
import NewTable from "../tables/NewTable";
import ReservationSeat from "../tables/ReservationSeat";
import SearchReservation from "../new reservation/SearchReservation";
import EditReservation from "../new reservation/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact path= "/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      <Route exact path = "/tables/new">
        <NewTable />
      </Route>
      <Route exact path="/search">
        <SearchReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
