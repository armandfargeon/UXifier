# UXifier
Second delivery of the Dashboading DSL 

**Scenarios list** : ***Responsive_scenario - Popup - basic_scenario***

### Scenarios execution  
* Generate the new grammar
```sh
npm run langium:generate
```
* Build DSL
```sh
npm run build
```

To launch the extension (after generating the grammar and building the DSL) :
* Hit F5 (the Langium project must be opened in VS Code at its root and not the entire UXifier folder)

* This opens a new VScode window allowing to edit .alc 
* Chose between either 

 >Generate target code in folder ./scenarios/generated
  * To transform an .alc file into an grommet :
  ```sh
  ../bin/cli generate fileName.alc
  ``` 

  >Execution of our relevants scenarios with a grommet build-app:
  * To automaticly create the grommet app : \
  this build takes longer because we create the application from scratch
  ```sh
  sh build.sh fileName.alc
  ``` 
Then go to the directory with the name of the scenario executed
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
