# Project 4 Frontend

## Dokumentasjon
### Kjøring av appen
Appen vil bare fungere hvis du er koblet til eduroam, pga backend er bare tilgjenlig fra eduroam på Gløshaugen

### Kjøring lokalt
Hvis du vil kjøre databasen loaklt så endre API_Key i .env.development

### Backend

Backenden er for det meste basert på backend i Prosjekt 3. Koden for denne finnes på: https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-40/project-4-backend-new
Vi refererer derfor til eksisterende dokumentasjon på følgende lenke:

https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-40/project-3-backend

Endringer som er gjort er å implementere følgende:

- Movies har comments som child i modellen, hvor comment har en egen resolver

- MovieList er en ny query som gir deg movies og antall movies du kan hente ut. (Dette er tidligere movies og numberofmovies som er slått sammen).

- Schemas er de samme, men strukturert og delt opp i flere filer for å sikre modularitet, struktur og enklere oversikt.

Grunnen til at nytt repo for backend ble laget er at vi ville at Prosjekt 3 Frontend kunne være oppe å kjøre og vi gjorde noen breaking changes i Backend så det trengs 2 versjoner.

### Design

I prosjektet er det benyttet to hoved-biblioteker for å utvide funksjonaliteten. 

- react-native-material-ui
- react-native-paper

Komponentene er strukturert på samme måte som Prosjekt 3 med DetailView og MovieList som hoved-menyer.

### Frontend

Vi benytter Screens fra Expo/React Native boilerplatingen og har endret HomeScreen og lagt til våre egne komponenter. Mye av konseptet er basert på forrige prosjekt.

AsyncStorage holder orden på valg som er gjort i henhold til eksisterende filtreringsmuligheter og programmets state. Ved å benytte verdier for checkboxer basert på state vil disse vise og endres ettersom state blir endret på. Vi gjenbruker react-native-paper bibliotekets RadioButton.Group komponent for å gruppere sammen og endre state når en radiobutton blir trykket ned. For hvert valg som blir gjort blir valget lagret i AsyncStorage, når komponenter loader så sjekker de AsyncStorge for verdier de kan bruke og laster de inn. Dette fører til noen ekstra kall, både for verdiene i initialState og de nye verdiene for AsyncStorage.

Våre komponenter benytter i større grad useEffect istedenforcomponentDidUpdate-ekvivalenten i klassebasert React. Ettersom vi strukturerte forrige oppgave på const / funksjoner var det lett å oversette tidligere implementeringer til React Native. For å hente data fra den globale staten er React Context brukt, denne fungerer noe likt som Redux, med actions og reducers. Actions og reducers har ikke egene mapper for det ble en del.

DetailView får du ved å trykke på rowen av en film (Bilde, Titel) biten.

Testing er gjort på vår egne telefoner som er av typen Android så vi vet ikke hvordan dette fungerer på iPhone. På våre så laster appen fint og vi kan søke i topbaren (Blå på toppen se tegnet høyre hjørne), velge sortinger osv. Av filmene vi får så kan vi velge de for å se kommenterer om de. Filmene har ikke kommentarer, men hvis det hadde vært det på de i databasen så hadde du sett de :-) 









