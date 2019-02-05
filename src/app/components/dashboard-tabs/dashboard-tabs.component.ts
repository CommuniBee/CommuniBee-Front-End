import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent {
  private selectedTab: number;

  constructor() {
    this.selectedTab = 0;
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
