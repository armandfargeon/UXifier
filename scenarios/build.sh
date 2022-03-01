#!/bin/bash 
if [[ $# -eq 0 ]] ; then
    echo "besoin d'un argument !!"
    exit 0
fi
../bin/cli generate $1
IFS='.' read -r -a titre <<< $1
echo $titre

cd ..

echo "Le scénario est "$titre
echo "create app "$titre
npx create-react-app $titre
rm -rf yarn.lock
rm -rf node_modules

echo "copie des fichiers de configuration"
cp -rf "example\responsive-app\package.json"  "$titre\package.json"
cp -rf "example\responsive-app\src\data"  "$titre\src\data"
echo "copie des fichiers génerer "

cp -rf "scenarios\generated\test.js" "$titre\src\app.js"
cp -rf "scenarios\generated\components" "$titre\src\components"

echo "installing the packages"
cd $titre
npm i 
npm start

