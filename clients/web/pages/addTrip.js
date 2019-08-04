import { COUNTRIES_QUERY, CURRENCIES_QUERY } from "../graphql/queries";

import AddTripForm from "../components/forms/AddTripForm";
import AddTripLoader from "../components/loaders/AddTripLoader";
import BackButton from "../components/elements/BackButton";
import Meta from "../components/layouts/Meta";
import { Query } from "react-apollo";
import React from "react";
import { adopt } from "react-adopt";
import withAuth from "../lib/withAuth";

class AddTrip extends React.Component {
  render() {
    const Queries = adopt({
      countries: ({ render }) => (
        <Query query={COUNTRIES_QUERY}>{render}</Query>
      ),
      currencies: ({ render }) => (
        <Query query={CURRENCIES_QUERY}>{render}</Query>
      )
    });
    return (
      <Queries>
        {({ countries, currencies }) => {
          if (countries.loading || currencies.loading) return <AddTripLoader />;
          return (
            <>
              <Meta title={`Add trip`} />
              <h1 className="flex items-center font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase">
                <BackButton routeName="trips" />
                ADD TRIP
              </h1>
              <AddTripForm countries={countries} currencies={currencies} />
            </>
          );
        }}
      </Queries>
    );
  }
}

export default withAuth(AddTrip);
