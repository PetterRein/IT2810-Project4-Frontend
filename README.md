# Project 4 Frontend

## Dokumentasjon

### Backend

Backenden er for det meste basert på backend i Prosjekt 3. 
Vi refererer derfor til eksisterende dokumentasjon på følgende lenke:

https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-40/project-3-backend

ENdringer som er gjort er å implementere følgende:

- Movies har comments som child i modellen, hvor comment har en egen resolver

- MovieList er en ny query som gir deg movies og antall movies du kan hente ut. (Dette er tidligere movies og numberofmovies som er slått sammen).

- Schemas er de samme, men strukturert og delt opp i flere filer for å sikre modularitet, struktur og enklere oversikt.

### Design

I prosjektet er det benyttet to hoved-biblioteker for å utvide funksjonaliteten. 

- react-native-material-ui
- react-native-paper

Komponentene er strukturert på samme måte som Prosjekt 3 med DetailView og MovieList som hoved-menyer.

### Frontend

Vi benytter Screens fra Expo/React Native boilerplatingen og har endret HomeScreen og lagt til våre egne komponenter. Mye av konseptet er basert på forrige prosjekt.

AsyncStore holder orden på valg som er gjort i henhold til eksisterende filtreringsmuligheter og programmets state. Ved å benytte verdier for checkboxer basert på state vil disse vise og endres ettersom state blir endret på. Vi gjenbruker react-native-paper bibliotekets RadioButton.Group komponent for å gruppere sammen og endre state når en radiobutton blir trykket ned. 

Våre komponenter benytter i større grad useEffet istedenforcomponentDidUpdate-ekvivalenten i klassebasert React. Ettersom vi strukturerte forrige oppgave på const / funksjoner var det lett å oversette tidligere implementeringer til React Native.

Vi har implementert en "retrieveData" funksjon som holder på state og som brukes i render funksjonen for å kontrollere felter og filtreringer. 






