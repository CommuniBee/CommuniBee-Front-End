import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit{
  private selectedTab: number;

  constructor() {

  }

  ngOnInit(){
    this.selectedTab = 0;
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
