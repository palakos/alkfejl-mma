# Marvel Mozi Alkalmazás

## <center>Alkalmazások fejlesztése project - 2019.</center>

<p align="left">
    <b>Szerzők:</b> Páldi Ákos, Zsár Ádám Ottó
</p>

## Tartalomjegyzék

- [Leírás](#leírás)
- [Funkcionális követelmények](#funkcionális-követelmények)
- [Nem funkcionális követelmények](#nem-funkcionális-követelmények)
- [Fogalomjegyzék](#fogalomjegyzék)
- [Szerepkörök](#szerepkörök)


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

---

[Vissza a Tartalomjegyzékhez](#tartalomjegyzék)
