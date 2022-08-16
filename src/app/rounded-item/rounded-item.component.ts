import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-item',
  templateUrl: './rounded-item.component.html',
  styleUrls: ['./rounded-item.component.scss']
})
export class RoundedItemComponent implements OnInit {
  @Input() item: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
