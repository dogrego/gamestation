# Feladat

## 1. Állapot leírása

- Mező:
  - Akna-e
  - van-e zászló
  - fel van-e fedve
  - hány akna szomszédja van
- Tábla:
  - Mátrix (mezők mátrixa)
  - Tábla használja a mező típust
- Állapot:
  -hogyan tárolom az állapotokat

## 2. Állapot megjelenítése

- Alulról felfele hogyan jelenik meg az állapot
  - egy darab mező megjelenítése
  - a táblázet egy sorának megjelenítése
  - a táblázet egészének megjelenítése
  - mosolygós fej a tábla felett

## 3. Események kezelése

- start lenyomása -> új játék kezdése a bemeneti paraméterek alapján
- bal gomb kattintás egy felfedetlen cellára
  - ha szám, akkor felfedjük
  - ha akna, akkor vége a játéknak
  - ha üres, akkor felfedi az üres mezős szomszédokat
- jobb gombbal kattintunk egy felfedetlen cellára -> zászló/nem zászló
- dupla gombos kattintás -> összes nem zászló szomszédot felfedjük
