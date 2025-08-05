import { AdsVsReservations, Profit, ProfitCommunity } from './../../Services/admin.service';
import { Component, inject, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartTypeRegistry } from 'chart.js';
import { ExecException } from 'child_process';
import { AdminService, numbers } from '../../Services/admin.service';
import { CommonModule } from '@angular/common';

type NumbersKey = keyof numbers;

@Component({
  selector: 'app-dashboard-home',
  imports: [NgChartsModule,CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit {
  
  generalNumbers!:numbers;
  adsReservation:AdsVsReservations[]=[]
  profitPerCommunity:ProfitCommunity[]=[]
  public profitData: Profit[] = [];
  public doughnutChartLabels: string[] = ['Owners', 'Renters'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
   } ;
   public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: []
   } ;
  public unitStatusChartData:ChartData<'doughnut'>={
    labels:[],
    datasets:[]
  };
public unitStatusLabels: string[] = [
  'Empty Units',
  'Busy Units',
  'Empty For Rent',
  'Empty For Sell',
  'Busy For Rent',
  'Busy For Sell'
];
public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [
    { data: [], label: 'Ads', backgroundColor: '#8b5cf6',barThickness: 20 },
    { data: [], label: 'Reservations', backgroundColor:'#06b6d4',barThickness: 20 }
  ]
};
cards: { label: string; key: NumbersKey; icon: string,color:string,colorIcon:string }[]= [
    { label: 'Total Users', key: 'userCount', icon: 'bi bi-people',color:'rgb(230 218 243)',colorIcon:'rgb(193 156 234)' },
    { label: 'Total Units', key: 'unitCount', icon: 'bi bi-buildings',color:'rgb(206 245 230)' ,colorIcon:'rgb(155 223 222)' },
    { label: 'Communities', key: 'communityCount', icon: 'bi bi-diagram-3',color:'rgb(212 246 209)' ,colorIcon:'rgb(115 203 147)' },
    { label: 'Advertisements', key: 'adCount', icon: 'bi bi-megaphone',color:'rgb(219 234 250)' ,colorIcon:'rgb(154 202 212)'},
    { label: 'Total Profit', key: 'totalProfit', icon: 'bi bi-currency-dollar',color:'rgb(237 204 237)' ,colorIcon:'rgb(206 162 204)' },
  ];
  _AdminService=inject(AdminService)

  ngOnInit(): void {
    this.getAllNumbers()
    this.getAdsReservation()
    this.getProfit()
    this.getProfitCommunity()
  }

  getAllNumbers(){
    this._AdminService.getNumbers().subscribe({
      next:(res)=>{
        this.generalNumbers=res
        this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: [this.generalNumbers.ownerCount, this.generalNumbers.renterCount],
            backgroundColor: ['#8b5cf6', '#06b6d4'], 
          }
        ]
      };
      this.unitStatusChartData ={
        labels:this.unitStatusLabels,
        datasets:[
          {
            data:[this.generalNumbers.emptyUnitCount,
                this.generalNumbers.busyUnitCount,
                this.generalNumbers.emptyForRentUnitCount,
                this.generalNumbers.emptyForSellUnitCount,
                this.generalNumbers.busyForRentUnitCount,
                this.generalNumbers.busyForSellUnitCount],
            borderWidth: 1,
          }
        ]
      }
        
      },error :(err)=>{
        console.log(err);
        
      }
    })
  }

  //users
public doughnutChartType: 'doughnut' = 'doughnut'; 
public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeOutCirc',
  },
};
//ads vs Reservation
getAdsReservation(){
   this._AdminService.getadsVsReservayion().subscribe({
    next:(res) => {
      this.adsReservation=res
      console.log(this.adsReservation);
      this.barChartData.labels = res.map(d => d.month);
    this.barChartData.datasets[0].data = res.map(d => d.adsCount);
    this.barChartData.datasets[1].data = res.map(d => d.reservationsCount);
      
    },error:(err) => {
      console.log(err);
      
    }
   })
}

public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Ads vs Reservations (Monthly)'
    }
  }
};

public barChartType: 'bar' = 'bar';

//profit
getProfit(){
  this.profitData = [
      { month: '01/2025', profit: 1200 },
      { month: '02/2025', profit: 1600 },
      { month: '03/2025', profit: 1000 },
      { month: '04/2025', profit: 2000 },
      { month: '05/2025', profit: 1800 },
    ];

    this.lineChartData.labels = this.profitData.map(p => p.month);
    this.lineChartData.datasets[0].data = this.profitData.map(p => p.profit);
}
public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Monthly Profit',
        fill: false,
        tension: 0.4,
        borderColor: '#3a74b3',
        pointBackgroundColor: '#3a74b3',
        pointBorderColor: '#3a74b3'
      }
    ]
  };

  //profitpercommunity
  getProfitCommunity(){
    this._AdminService.getProfitCommunity().subscribe({
      next:(res) => {
        this.profitPerCommunity=res
        this.pieChartData.labels = ['Green Valley', 'Palm Hills', 'Madinaty'];
        this.pieChartData.datasets = [
          {
            data:[12000,15000,20000],
            backgroundColor:['#8b5cf6', '#06b6d4','#608cbb']
          }
        ];

      //   this.pieChartData.labels = res.map(d => d.communityName);
      // this.pieChartData = res.map(d => d.profit);
        
      },error:(err) =>{
        console.log(err);
        
      }
    })
  }
  public pieChartType: 'pie' = 'pie';
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          return ` ${context.label}: ${value} EGP`;
        }
      }
    }
  }
};

}
