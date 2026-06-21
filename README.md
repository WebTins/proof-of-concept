# Hypersolid Pokedex

Ik heb van Hypersolid de opdracht gekregen om een PokeDex te maken waar de bedoeling is dat een gebruiker een lijst aan pokemon kan zien, maar ook de kenmerken van een pokemon kan lezen. 

**Developer**

In dit project werk ik in mijn eentje 

- [Tin Nguyen](https://github.com/WebTins)
- [Linkedin](https://www.linkedin.com/in/tin-nguyen-33a211202/)

## Inhoudsopgave
1. [Beschrijving](https://github.com/WebTins/proof-of-concept#beschrijving)
2. [Design](https://github.com/WebTins/proof-of-concept#design)
3. [Kenmerken](https://github.com/WebTins/proof-of-concept#kenmerken)
4. [Code conventies](https://github.com/WebTins/proof-of-concept#code-conventies)
5. [Installatie](https://github.com/WebTins/proof-of-concept#installatie)

## Beschrijving
In deze website gebruik ik een openbare API op het internet speciaal gemaakt voor de PokeDex. De data wordt uit de [PokeAPI](https://pokeapi.co/) gehaald en op de website getoont.

In deze opdracht moet ik aan een aantal dingen voldoen volgens de Acceptatie Criteria.

<img width="551" height="309" alt="image" src="https://github.com/user-attachments/assets/727eaf39-554c-4a05-a1f7-a167deef54a2" />

[Website](https://proof-of-concept-08ht.onrender.com/)

[WCAG Audit](https://github.com/WebTins/proof-of-concept/issues/12)

[Performance Audit](https://github.com/WebTins/proof-of-concept/issues/13)

## Design

Ik heb een beetje het design overgenomen van wat Hypersolid mij had aangeboden, alleen heb ik wel een paar dingen eraan veranderd omdat ik het vond dat er een paar dingen ontbraken zoals een terugknop, of active states. Ook heb ik de detailpagina layout veranderd. In het Figma bestand kan je al mijn ontwerpen zien die ik heb gemaakt voor alle pagina's en kenmerken van de website.

[Figma](https://www.figma.com/design/4JxRF7qJcIJUYTXvwsccs3/Hypersolid-PokeDex?node-id=0-1&t=AtvMKT7xhD9Azuo1-1)

***Homepage***

De home pagina is ook wel de landings pagina waar de gebruiker als eerst op komt wanneer de gebruiker de website opent. Op de home pagina kan de gebruiker een lijst met pokemon zien en ook een pokemon opzoeken met de zoekbalk. De gebruiker kan verder ook naar de "favorieten" pagina gaan waar de gebruiker zijn/haar favoriete pokemon kan zien.

**Mobiel**

https://github.com/user-attachments/assets/081ebefd-fadf-41a4-8f98-d1edf85fe5d2

**Desktop**

https://github.com/user-attachments/assets/97598938-a445-4eda-a222-0fc98f3a79a4

---

***Detail page***

Op de detail pagina kan de gebruiker de kenmerken van de pokemon bekijken. De kenmerken bestaan uit verschillende onderdelen waar dus veel data voor nodig is, dat is dus verspreid in TABS. Met de TABS kan de gebruiker door de kenmerken heen swipen/klikken. Ook kan de gebruiker op de detail pagina de pokemon favorieten.

**Mobiel**

https://github.com/user-attachments/assets/c1dd3381-8ccf-4cde-a1e0-97d3df481f7a

**Desktop**

https://github.com/user-attachments/assets/d7885713-1b18-422c-a948-381a9ea8b893

---

***Favourite page***

Op de favorieten pagina kan je een overzicht van je favorieten pokemon zien die je op de detail pagina hebt geselecteerd. Ook vanaf daar kan je naar de detailpagina gaan. Als eerst laat de pagina een bericht zien dat je geen pokemon op favoriet hebt gezet, dat bericht verwdijnt zodra je een pokemon op favoriet hebt gezet.

**Mobiel**

https://github.com/user-attachments/assets/44f258ca-0303-4f19-bec1-1d1ca09cd9e6

https://github.com/user-attachments/assets/2bf74a00-db4d-437e-87f0-b8d64cdc20b8

**Desktop**

https://github.com/user-attachments/assets/1add027f-3cc5-4a45-b41c-aae1532e3c87

https://github.com/user-attachments/assets/fcbecf9c-b62d-452e-956a-cdb9c796ddd9

---

**Errorpage**

De error page is voor als de website/link niet gevonden kan worden, de gebruiker krijgt dan een bericht te zien op de pagina met een knop om terug te kunnen gaan naar de homepagina.

https://github.com/user-attachments/assets/b448bc36-0f57-41d4-bf82-b5fc5266483b

---

## Kenmerken

In dit project is er gebruik gemaakt van HTML, CSS, JS, NodeJS, Express, JSON en Liquid.

### View transitions

Ik heb view transitions toegevoegd aan content die op een andere pagina ook staan, daarbij heb ik dus het Pokemon logo, Pokemon naam en Pokemon afbeelding een `view-transition-name` gegeven zodat er een mooie overgang is bij het landen bij een andere pagina.

**Homepage naar Detailpage**

https://github.com/user-attachments/assets/04296b7f-bfca-4eba-8f63-ffb97ba29caa

**Detailpage naar Evolutions**

https://github.com/user-attachments/assets/ee552648-da64-4f76-b41e-deacbf11370b

---

### Pokemon favorieten toevoegen [POST]

Wanneer je een pokemon erg leuk vindt en fijn vindt om het sneller te kunnen vinden, kan je de pokemon in je favorieten te zetten door op de detail pagina op "Favourite" te klikken. De pokemon wordt dan opgeslagen naar je favorieten die je terug kan vinden op de "Favourites" page.

#### <ins>Feedforward & Feedback POST</ins>

Feedforward toevoegen van pokemon aan favorieten:

- Je ziet de knop "❤Favourite"
- Met een hover over de "❤Favourite" knop, krijgt de knop een donkere kleur

Feedback toevoegen van pokemon aan favorieten:

- Je drukt op de "❤Favourite" knop
- De Pokemon is toegevoegd aan je favorieten
- De knop geeft aan "💔Unfavourite"

https://github.com/user-attachments/assets/5633f8ff-418e-41df-809a-2f1f49d813fb

### Pokemon verwijderen uit favourieten [DELETE]

Wanneer je een pokemon niet meer leuk vindt heb je ook de optie om je actie ongedaan te maken wanneer je een pokemon al op favoriet hebt staan. Zodra je op "💔Unfavourite" drukt, dan wordt de pokemon uit je favorieten gehaald en heb je weer de mogelijkheid om het weer toe te voegen aan je favorieten.

#### <ins>Feedforward & Feedback DELETE</ins>

Feedforward verwijderen van pokemon:

- Je ziet de knop "💔Unfavourite"
- Met een hover over de "💔Unfavourite" knop, krijgt de knop een donkere kleur

Feedback toevoegen van pokemon:

- Je drukt op de "💔Unfavourite" knop
- De Pokemon is verwijderd uit je favorieten
- De knop geeft aan "❤Favourite"

https://github.com/user-attachments/assets/05adbf74-05c3-4da6-936c-4a078ee7e191

---

### Searchbar

Vaak als er teveel data staat, wil je graag gelijk iets opzoeken. En dat is ook mogelijk op de website met de zoekbalk. Met de zoekbalk kan je zoeken naar de pokemon die je wilt vinden. De zoekbalk herlaad de pagina niet en zorgt ervoor dat de lijst gelijk aangepast wordt op basis van wat je intypt.

https://github.com/user-attachments/assets/6e715657-c71e-490f-a371-555d7e2eaf07

### Progressive Enhancement

Voor Progressive Enhancement heb ik de tabs carousel enhanced gemaakt door alles onder elkaar te zetten als CSS niet werkt.

**Met CSS**

https://github.com/user-attachments/assets/b81ffc89-2560-4c82-9b2d-ce9e356e1b12

**Zonder CSS**

https://github.com/user-attachments/assets/96888de7-6bf3-4900-b52c-d43da361d134

---

### Empty state

Op de favorieten pagina kan je je favorieten Pokemon zien en ik heb een empty state toegevoegd wanneer er geen Pokemon zijn, zodat de gebruiker kan zien dat er nog geen favorieten Pokemon zijn. Ik heb hiervoor in liquid een `{% if %}` `{% else %}` statement gebruikt.

[Figma design](https://www.figma.com/design/4JxRF7qJcIJUYTXvwsccs3/Hypersolid-PokeDex?node-id=240-328&m=dev)

De reden dat ik dit ontwerp heb gekozen is om de gebruiker duidelijk te laten weten dat er nog geen favorieten zijn.

https://github.com/user-attachments/assets/464d8d2b-ae15-42c6-9098-76fa608f4374

## Code conventies

### Ademruimte

In mijn code maak ik gebruik van ademruimte dat ervoor zorgt dat het lezen van code leesbaar is en te volgen is. Na elke element wordt een witregel gemaakt om het element duidelijk scheidbaar te tonen. En elementen in een elementen worden met 1 tab uitgespreid om te laten zien dat het in het parent element hoort.

**Voorbeeld**

```css
* {
    margin: 0;
    box-sizing: border-box;
    font-family: Inter;
}

@media (prefers-reduced-motion: no-preference) {
    @view-transition {
        navigation: auto;
    }

    :root {
        view-transition-name:none;
    }
}
```

### Volgorde HTML en CSS nesting

Bij mijn code conventies hou ik rekening met de vologorde van de HTML structuur die ook in het CSS bestand op volgorde wordt gehouden, hierdoor wordt het lezen van code volgbaar en leesbaar. In mijn CSS bestand nest ik code die in het parent element/class horen. Dit zorgt voor een duidelijke structuur dat het lezen makkelijker maakt.

### Custom properties

Ik maak gebruik van custom-properties zodat ik niet steeds code hoeven te herhalen (DRY). De custom properties krijgen een duidelijke naamgeving in kebabcase zoals `--head-accent-`.

### Class naamgeving

De classes die ik aanmaak worden allemaal in het Engels geschreven met kebab-cases. Dit maakt het lezen makkelijker omdat je een scheiding maakt tussen woorden die niet leesbaar zijn aan elkaar.

## Installatie

Om mijn project te kunnen uitvoeren moet je eerst `npm i(nstall)` uitvoeren en zodra alle node packages zijn geïnstalleerd moet je `npm start` uitvoeren om de localhost te kunnen starten.
