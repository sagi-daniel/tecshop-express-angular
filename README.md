# techSHOP

## 1. Alkalmazás leírása

### Célja:

### _Online IT termékeket forgalmazó webshop_

Az alkalmazás feladata, hogy a egy online it eszközöket értékesítő oldal szerepét betöltse és a felhasználóknak egy könnyen kezelhető, jó felhasználó élményt nyújtson.

### Technikai követelmények és előírások:

- Az alkalmazás Angular alapú, model-service-component architectúra jelemzi
- Az egyes service-eket egy base service gyűjti össze és szolgálja ki
- A megjelenés kinézetéért a Bootstrap, Font Awesome és SCSS felel
- MongoDB alapú, NoSQL adatbázissal rendelkezik
- NodeJS API: saját API végpontok szolgálják ki a frontendet
- Minden API végponthoz tartozik egy saját unit teszt
- Az API-hoz Swagger alapó dokumentáció tartozik
- A felület bizonyos oldalai csak bejelntkezés után elérhetők (JWT autentikáció)
- Az alkalmazás dockerizálva van, konténerből futtatható
- Markdown dokumentáció documentation.md-ben

#### Megjelenése:

- Az alkalmazás egy fejléces navigációval rendelkezik, amivel az egyes oldalak között lehet navigálni
- Teljesen reszponzív, mobile-first szemlélet
- Az alkalmazott színeket, betűtípusokat, mixineket és az előre meghatárzott stílus osztályokat a styles/base mappa tárolja, és a main.scss fájl gyűjti össze.

## 2. Az alkalmazás telepítése

- Forkolni kell az adott GitHub repository tartalmát:
  LINK

- A célgépre le kell klónozni az adott GitHub repository tartalmát
  `git clone LINK`

- Telepíteni kell az alkalmazás függőségeit:
  -- Backend:
  A terminálon be kell lépni a /backend mappába és futtatni az npm i parancsot.
  -- Frontend:
  A terminálon be kell lépni a /frontend mappába és futtatni az npm i parancsot.

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.

- A terminálban ki kell adni az `ng build ` parancsot.

- A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába.

  VAGY

- A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot.

## 3. Az alkalmazás konfigurálása

A /frontend/environments mappában be kell állítani az API végpont elérési útvonalát:

- environment.ts állomány: http://127.0.0.1:3000/
- environment.prod.ts állomány: http://localhost:3000/

## 4. Az alkalmazás indítása

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /backend mappába belépve a terminálban ki kell adni az npm run dev parancsot. (Ha szükséges, a /frontend mappába belépve a terminálban az npm start paranccsal indítható a frontend.)

_Megjegyzés_:
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):
|E-mail | Jelszó |
| ------ | ------ |
|email | password |

## 5. A végpontok dokumentációja

Swagger

- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api-docs

## 6. Alkalmazás tesztek futtatása

### Integrációs tezstek futtatása:

### Egység tesztek futtatása:

## 7. Entitások

### Product:

### CartItem:

### User:

### Order:

## 8. User Story lista

Aloldalak szerinti user story

## 9. Képernyők

### Home

### About

### Products

### Contact

### Regisztráció

### Login

### Cart

### Logged in pages

### Thank you

### NotFound

## 10. Projekt egyéb adatai:

### Piorítás:

### A megvalósítás időtartama:

### Tovább fejlesztési lehetőségek:

### Nehézségek:

- n1
- n2
