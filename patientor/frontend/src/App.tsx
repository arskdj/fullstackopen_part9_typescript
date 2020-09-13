import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, MatchParams, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetch = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));

        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, [dispatch]);



  const [{ patients },] = useStateValue();
  const match = useRouteMatch<MatchParams>('/patients/:id');
  const patientId = match?.params?.id;
  let patient: Patient;

  if (patientId) {
    patient = patients[patientId];
  }


  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientPage patient={patient} />} />
            <Route path="/" render={() => <PatientListPage />} />

          </Switch>
        </Container>
    </div>
  );
};

export default App;
