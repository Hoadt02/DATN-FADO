import {Component, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductDetailsService} from '../../shared/services/api-service-impl/product-details.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../shared/services/api-service-impl/order.service';
import {OrderDetailService} from '../../shared/services/api-service-impl/orderDetail.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartBar;

  displayedColumns: string[] = ['index', 'name', 'price', 'quantityO'];
  dataSource!: MatTableDataSource<any>;
  isLoading = true;

  tongDoanhThu: any;
  tongDonHang = [];
  tongDonHuy = [];
  tongDoanhThuOneDay: any;


  barChart: any[] = [];
  dateMonth: any[] = [];
  totalPay: any[] = [];
  total: any[] = [];
  cancel: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getData();
    this.chart();
    this.getProduct();
  }

  constructor(
    private productDetailService: ProductDetailsService,
    private toastrService: ToastrService,
    private orderService: OrderService,
  ) {
  }

  getProduct() {
    this.productDetailService.getFeaturedProductDetail().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastrService.warning('Lỗi load dữ liệu!');
      }
    });
  }

  getData() {
    this.orderService.getTotalRevenue().subscribe(data => {
      // @ts-ignore
      this.tongDoanhThu = data;
    }),
      this.orderService.getTotalOneDay().subscribe(data => {
        // @ts-ignore
        this.tongDoanhThuOneDay = data;
      })
  }

  chart() {
    this.orderService.getChartBar().subscribe(data => {
      // @ts-ignore
      this.barChart = data;
      this.dateMonth = this.barChart.map((coins: any) => coins.month);
      this.totalPay = this.barChart.map((coins: any) => coins.sum);
      this.chartBar = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.dateMonth,
          datasets: [
            {
              data: this.totalPay,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            },
          ],
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{}],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function(label) {
                    return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }
                }
              }
            ]
          },
          tooltips: {
            enabled: true,
            intersect: true,
            titleFontSize: 20,
            callbacks: {
              // tslint:disable-next-line:no-shadowed-variable
              label: function(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const currentValue = dataset.data[tooltipItem.index];
                return currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }
            }
          },

        }
      });
    });

    this.orderService.getTotalOrder().subscribe(data => {
      // @ts-ignore
      this.tongDonHang = data;
      // tslint:disable-next-line:no-shadowed-variable
      this.orderService.getOrderCancel().subscribe(data => {
        // @ts-ignore
        this.tongDonHuy = data;

        this.total = this.tongDonHang.map((coins: any) => coins.total);
        this.cancel = this.tongDonHuy.map((coins: any) => coins.cancel);

        this.canvas = document.getElementById('chartPie');
        this.ctx = this.canvas.getContext('2d');
        this.chartEmail = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: ['Đơn hàng', 'Đã hủy'],
            datasets: [{
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: [
                '#4acccd',
                '#ef8157'
              ],
              borderWidth: 0,
              data: [this.total, this.cancel],
            }]
          },

          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Pie Chart'
              }
            }
          }
        });
      });
    });
  }
}
