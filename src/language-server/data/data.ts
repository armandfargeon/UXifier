export const statscovid = {
  title: "Statistiques Covid",
  icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/1200px-Approve_icon.svg.png",
  data: 1590,
  description: "Nombre de cas en France"
};

export const statlicenciement = {
  title: "Statistiques Licenciement",
  icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/1200px-Approve_icon.svg.png",
  data: 19,
  description: "Nombre de licenciement en 2022"
};

export const statCasContact = {
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
  description: "Statistiques Cas contact covid en 2021"
};

export const statParticipation = {
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
  description: "Nombre de licenciement en 2022"
};

export const statCrypto = {
  title: "Statistiques des cryptos monnaies",
  description: "Le marché de la crypto explose",
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

export const contaminations = {
  title: "Chiffres contaminations covid 2021",
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Contaminations quotidienne",
        data: [2500, 2700, 3000, 1600, 1100, 600],
        fill: false,
      }
    ]
  },
  description: "Moyenne des contaminations - Semestre 1 (2021)"
};

export const globalContaminations = {
  title: "Moyenne contaminations covid par jour en 2021",
  icon_url: "https://www.fai2r.org/wp-content/uploads/2020/09/COVID19-Infos-Bulles-300x297.png",
  data: 1600,
  description: "Moyenne des contaminations sur le premier semestre 2021"
};

export const newsCrypto = {
  title: "Prochain bull run, 2024 ?",
  icon_url: "https://static.euronews.com/articles/stories/06/40/93/46/1100x619_cmsv2_316c7ff6-be5c-5c9d-b4ef-70584487540f-6409346.jpg",
  data: 1600,
  description: "Comme en 2017, pourrait-on à nouveau connaître un crash du cours des crypto monnaies ?"
};

export const contact = {
  title: "Nous contacter !",
  icon_url: "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_cacba62245fb335695b27bf2f00465b2/contactus-com.png",
  data: `  
   , _ ,
  ( o o )
 /'\` ' \`'\
 |'''''''|
 |\\'''//|
    """`,
  description: "Contacter nous par e-mail pour toutes questions: team_c@polydsl.alc"
};
export const datas = {statscovid: statscovid, statlicenciement:statlicenciement, statCasContact:statCasContact, statParticipation:statParticipation, statCrypto:statCrypto, contaminations: contaminations, globalContaminations:globalContaminations, newsCrypto:newsCrypto, contact:contact}