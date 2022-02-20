const statscovid = {
  title: "Statistiques Covid",
  icon_url: "shorturl.at/osJY4",
  data: 1590,
  description: "Statistique de la covid-19 référencant un nombre de cas en France"
};

const statlicenciement = {
  title: "Statistiques Licenciement",
  icon_url: "shorturl.at/osJY4",
  data: 19,
  description: "Statistique de licensiement référencant un nombre de licensiement en 2022"
};

const statCasContact = {
  title: "Statistiques Cas contact covid",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [-40, 92, -44, -75, -65, -89, 78],
        fill: false,
      },
      {
        label: "Dataset 2",
        data: [-78, -21, -43, 70, 11, -91, -63],
        fill: false,
      }
    ]
  },
  description: "Statistique de licensiement référencant un nombre de licensiement en 2022"
};

const statParticipation = {
  title: "Statistiques participation",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [94, 94, 97, 92, 96, 91, 99],
        opacity: 0.2,
      }
    ]
  },
  options: {
    themedData: true,
    legend: {
      position: 'right',
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
      reverse: false,
    },
  },
  description: "Statistique de licensiement référencant un nombre de licensiement en 2022"
};

const statCrypto = {
  title: "Statistiques des cryptos monaies",
  description: "Les cryptos montant sur le marché",
  options: {
    colors: ['#abeb65', '#a565ea', '#72C6FF', '#c808f9'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: [''],
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    }
  },
  series: [{
    name: 'Etherum',
    data: [44]
  }, {
    name: 'Bitcoin',
    data: [76]
  },{
    name: 'Solana',
    data: [12]
  },{
    name: 'Cardano',
    data: [28]
  }],
};

export const datas = {statscovid: statscovid, statlicenciement:statlicenciement, statCasContact:statCasContact, statParticipation:statParticipation, statCrypto:statCrypto}