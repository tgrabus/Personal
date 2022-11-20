import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvasNavbarLabel' });
  }

  close() {
    this.offcanvasService.dismiss();
  }

}
