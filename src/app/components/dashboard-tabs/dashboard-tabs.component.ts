import {Component, OnInit} from '@angular/core';
import {VolunteeringEventsService} from '../../services/communibee-backend/volunteering-events/volunteering-events.service';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {
  private selectedTab: number;
  events: any;

  constructor(private eventsService: VolunteeringEventsService) {
    this.selectedTab = 0;
  }

  async ngOnInit() {
    this.events = [
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'},
      {kesem: 'kesem', david: 'david'}
    ];
    //this.events = await this.eventsService.getAll();
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
