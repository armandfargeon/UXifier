# UXifier
Second delivery of the Dashboading DSL 

**Scenarios list** : ***Responsive_scenario - Popup***

### Execution scenarios  
* Generate the new grammar
```sh
npm run langium:generate
```
* Build DSL
```sh
npm run build
```

To launch the extension (after generating the grammar && building dsl) :
* hit F5 button (the langium project must be opened in VS code at its root and not the entire ArduinoML folder)

* This opens a new VScode window allowing to edit .alc 
* chose between step 1 or 2

* 1 /To transform an .alc file into an grommet :
```sh
../bin/cli generate fileName.alc
```
* 2/ to automaticly create the grommet app :
```sh
sh build.sh fileName.alc
```

### Team
- [Rachid EL ADLANI](https://github.com/rachid-eladlani)
- [Valentin Roccelli](https://github.com/RoccelliV)
- [Abdel BELKHIRI](https://github.com/AbdelBelkhiri)
- [Armand FARGEON](https://github.com/armandfargeon)
- [Mohamed FERTALA](https://github.com/fertala2)
