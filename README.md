# UXifier
Second delivery of the Dashboading DSL 

**Scenarios list** : ***Responsive_scenario - Popup - Scenario***

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
* Hit F5 (the Langium project must be opened in VS Code at its root and not the entire UXifier folder)

* This opens a new VScode window allowing to edit .alc 
* Chose between either 

  * To transform an .alc file into an grommet :
  ```sh
  ../bin/cli generate fileName.alc
  ``` 

  * To automaticly create the grommet app : \
  this build takes longer because we create the application from scratch
  ```sh
  sh build.sh fileName.alc
  ``` 
Then go to the directory 
```sh
cd fileName
npm i 
npm start
``` 


### Team
- [Rachid EL ADLANI](https://github.com/rachid-eladlani)
- [Valentin Roccelli](https://github.com/RoccelliV)
- [Abdel BELKHIRI](https://github.com/AbdelBelkhiri)
- [Armand FARGEON](https://github.com/armandfargeon)
- [Mohamed FERTALA](https://github.com/fertala2)
