import { Component, OnInit } from '@angular/core';
import { Vendor } from '../model/vendor.model';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent  implements OnInit {
  vendors: Vendor[] = [
    { id: 1, name: 'Workshop A', service: 'Car Wash', contact: '012-34567890', active: true },
    { id: 2, name: 'Workshop B', service: 'Tire Repair', contact: '011-23456789', active: false }
  ];

  ngOnInit(): void {}

  addVendor() {
    // Logic to add a new vendor
  }

  editVendor(vendor: Vendor) {
    // Logic to edit vendor details
  }

  deleteVendor(vendor: Vendor) {
    // Logic to delete the vendor
  }

  toggleVendorStatus(vendor: Vendor) {
    vendor.active = !vendor.active;
  }
}