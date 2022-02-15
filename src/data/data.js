export const statscovid = {
    title: "Statistiques Covid",
    icon_url: "shorturl.at/osJY4",
    data: 1590,
    description: "Statistique de la covid-19 référencant un nombre de cas en France" 
};

export const statlicenciement = {
    title: "Statistiques Licenciement",
    icon_url: "shorturl.at/osJY4",
    data: 19,
    description: "Statistique de licensiement référencant un nombre de licensiement en 2022" 
};

export const statCasContact = {
    title: "Statistiques Cas contact covid",
    data:{
        labels: ["January","February","March","April","May","June","July"],
        datasets: [
          {
            label: "Dataset 1",
            data: [-40,92,-44,-75,-65,-89,78],
            fill: false,
          },
          {
            label: "Dataset 2", 
            data: [-78,-21,-43,70,11,-91,-63],
            fill: false,
          }
        ]
    },
    description: "Statistique de licensiement référencant un nombre de licensiement en 2022" 
};