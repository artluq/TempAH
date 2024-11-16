import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Vendor } from '../model/vendor.model';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  isAddingVendor = false;
  isEditingVendor = false;
  newVendor: Vendor = {} as Vendor;
  selectedVendor: Vendor = {} as Vendor;

  constructor(private vendorService: ApiService) {}

  ngOnInit(): void {
    this.loadVendors();  // Fetch the list of vendors when the component initializes
  }

  // Fetch list of vendors from the server
  loadVendors() {
    this.vendorService.getVendor().subscribe((vendors) => {
      this.vendors = vendors;
    });
  }

  // Opens the modal to add a new vendor
  openAddVendorModal() {
    this.isAddingVendor = true;
    this.newVendor = {} as Vendor;
  }

  // Closes the modal for adding a new vendor
  closeAddVendorModal() {
    this.isAddingVendor = false;
  }

  // Opens the modal to edit the selected vendor
  editVendor(vendor: Vendor) {
    this.isEditingVendor = true;
    this.selectedVendor = { ...vendor };
  }

  // Closes the modal for editing a vendor
  closeEditVendorModal() {
    this.isEditingVendor = false;
  }

  // Submit a new vendor (add it to the list and make API call)
  submitVendor() {
    this.vendorService.registerVendor(this.newVendor).subscribe((addedVendor) => {
      this.vendors.push(addedVendor);  // Update the vendor list with the newly added vendor
      this.closeAddVendorModal();
    });
  }

  // Update the selected vendor (make API call)
  updateVendor() {
    const index = this.vendors.findIndex(v => v.vendorId === this.selectedVendor.vendorId);
    if (index !== -1) {
      this.vendors[index] = { ...this.selectedVendor };
    }
    this.closeEditVendorModal();
  }

  deleteVendor(vendor: Vendor) {
    if (confirm(`Are you sure you want to delete vendor "${vendor.vendorName}"?`)) {
      this.vendorService.deleteVendor(vendor.vendorId).subscribe({
        next: () => {
          // Remove the vendor from the local list
          this.vendors = this.vendors.filter(v => v.vendorId !== vendor.vendorId);
          alert('Vendor deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting vendor:', err);
          alert('Failed to delete vendor. Please try again.');
        }
      });
    }
  }

  // Toggle the status (active/inactive) of a vendor
  toggleVendorStatus(vendor: Vendor) {
    vendor.isActive = !vendor.isActive;
  }
}
