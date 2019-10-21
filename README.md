# Marvel Mozi Alkalmazás

## Alkalmazások fejlesztése project - 2019.


**Szerzők:** Páldi Ákos, Zsár Ádám Ottó


## Tartalomjegyzék

- [Leírás](#leírás)
- [Funkcionális követelmények](#funkcionális-követelmények)
- [Nem funkcionális követelmények](#nem-funkcionális-követelmények)
- [Fogalomjegyzék](#fogalomjegyzék)
- [Szerepkörök](#szerepkörök)
- [Adatbázis és táblák](#adatbázis-és-táblák)
  - [USER](#user)
  - [TICKET](#ticket)
  - [PROJECTION](#projection)
  - [ROOM](#room)
  - [MOVIE](#movie)
  - [HERO](#hero)
- [Autentikáció](#autentikáció)


## Leírás

Az API egy Marveles mozihoz tartozó adatokat fog kezelni, úgy mint:  
- mozifilmek
- mozijegyek
- mozitermek  

## Funkcionális követelmények

- Vendégként szeretném böngészni a filmeket, illetve legyen lehetőségem szűrésre is --> **Filmek böngészése**
- Felhasználóként szeretnék a böngészésen túl jegyet vásárolni egy kiválasztott filmre --> **Jegyvásárlás**
- Felhasználóként szeretném látni a lefoglalt jegyeimet --> **Saját jegyek listázása**
- Adminisztrátorként szeretném módosítani az adatokat --> **Adatmódosítás**
- Adminisztrátorként szeretném törölni az adatokat --> **Adattörlés**
- Adminisztrátorként szeretnék új adatot felvenni --> **Adatfelvétel**
- A felhasználók és az adminisztrátor bejelentkezés után használhatják a funkciókat. Ezeket egy előre megadott listából, vagy LDAP - authentikációval kell elvégezni.
- A főoldalon az alkalmazás ismertetése jelenik meg
 
## Nem funkcionális követelmények

- Felhasználóbarát, ergonomikus elrendezés és reszponzív kinézet (Bootstrap).
- Gyors működés.
- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés.

## Fogalomjegyzék

- **Felhasználói fiók:** A felhasználói fiók segítségével a felhasználó autentikálhatja (hitelesítheti) magát a rendszer szolgáltatásai felé. 
- **Autentikáció:** Autentikáció során a felhasználónak jellemzően hitelesítenie kell magát jelszó vagy más hitelesítő adat megadásával.
- **Mozi:** A mozi, vagy filmszínház azt a helyet jelöli, amelyet abból a célból hoznak létre, hogy benne filmeket vetítsenek.
- **Mozijegy:** Részvételre jogosító (digitális) cédula, amely egy személyt feljogosít egy filmvetítés megtekintésére. A mozijegy meghatározott filmre, vetítési időpontra és teremre szól.
- **Film:** Képekből álló sorozat, amely a vásznon olyan gyorsan változik, hogy azt az illúziót kelti, mintha mozogna.
- **Terem:** Az a helység, ahol filmeket vetítenek.
- **Hős:** Olyan férfi vagy nő, aki film központi szereplője, egy átlagos személynél lényegesen kiválóbb jellem vagy rendkívüliek a tulajdonságai.
- **Jegyvásárlás:** Az a tevékenység, mely során a személy pénzt ad egy szolgáltatásért cserébe. Jelen esetben ez a szolgáltatás a filmvetítés megtekintésére vonatkozik.

## Szerepkörök

- **Vendég (ROLE_GUEST):** Az a személy, aki nem regisztrált az oldalra, ezért nem veheti igénybe az API szolgáltatásait, csupán a filmek adatait látja. Lehetősége van regisztrálni.
- **(Regisztrált) Felhasználó (ROLE_USER):** Az a személy, aki az API szolgáltatás használója. Regisztrált felhasználói fiókját használva böngészheti a filmeket, jegyet vásárolhat, valamint kezelheti az általa vásárolt jegyeket.
- **Adminisztrátor (ROLE_ADMIN):** Az a személy, aki az API szolgáltatás vezető felügyelője. Hozzáférése van az API által kezelt adatokhoz.

## Adatbázis és táblák


Felhasznált Forrás: [dbdiagram.io](https://dbdiagram.io) 
![Forrás: dbdiagram.io](./img/mma-db.png "Forrás: dbdiagram.io")

### USER

Oszlopnév | Típus | Leírás
--------- | ----- | ------
id | int | elsődleges kulcs
role | enum | ROLE_GUEST \| ROLE_USER \| ROLE_ADMIN
name | varchar | felhasználó neve
email | varchar | felhasználó email címe (belépéshez szükséges)
pass | varchar | felhasználó jelszava (belépéshez szükséges)



### TICKET

Oszlopnév | Típus | Leírás
--------- | ----- | ------
id | int | elsődleges kulcs
user_id | int | a jegyvásárlást lebonyolító felhasználó ID-je
projection_id | int | a vetítés ID-je, amire szól a jegy
row_num | int | sor száma, ahova szól a jegy
seat_num | int | szék száma, ahova szól a jegy
price | int | jegyár forintban

### PROJECTION

Oszlopnév | Típus | Leírás
--------- | ----- | ------
id | int | elsődleges kulcs
room_id | int | a vetítést adó terem ID-je
movie_id | int | a vetített film ID-je
time | timestamp | vetítés ideje
is_full | tele van-e a vetített terem

### ROOM:

Oszlopnév | Típus | Leírás
--------- | ----- | ------
id | int | elsődleges kulcs
name | varchar | a terem neve
rows | int | sorok száma
seats | int | egy sorban lévő székek száma

### MOVIE

Oszlopnév | Típus | Leírás
--------- | ----- | ------
id | int | elsődleges kulcs
title_hu | varchar | film magyar címe
title_en | varchar | film angol címe
year | int | megjelenés éve
description | varchar | film leírása
phase | int | a film melyik fázishoz tartozik az MCU-ban
order_num | int | film sorszáma az MCU idővonala szerint
rate | float | film értékelése  (1-10)
length | int | film hossza percben

### HERO

Oszlopnév | Típus | Leírás
--------- | ----- | ------
id | int | elsődleges kulcs
name | varchar | hős identitása (valódi neve)
alias | varchar | hős neve
species | varchar | hős faja
portrayed_by | varchar | hőst megformáló színész neve

## Autentikáció

Az autentikációban annyi különbség van a példaprogramhoz képest, hogy nem felhasználónévvel kell autentikálni, hanem email címmel.
Adminnál admin@admin.hu, usernél user@user.hu. A jelszü pedig mindkét esetben "password".

---

[Vissza a Tartalomjegyzékhez](#tartalomjegyzék)
