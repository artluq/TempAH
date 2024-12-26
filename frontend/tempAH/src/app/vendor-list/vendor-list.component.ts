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
  selectedImage: File | null = null;
  selectedVendors: any = null;

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

   // Handle file input change
  //  onImageSelect(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }

  submitVendor() {
    const formData = new FormData();
    formData.append('vendorName', this.newVendor.vendorName);
    formData.append('phoneNumber', this.newVendor.phoneNumber);
    formData.append('email', this.newVendor.email);
    formData.append('address', this.newVendor.address);
    formData.append('city', this.newVendor.city); 
    formData.append('isActive', JSON.stringify(true)); // Send it as a string representation


    // Add the selected image file (if any)
    if (this.selectedImage) {
      formData.append('file', this.selectedImage, this.selectedImage.name);
    }
  
    // Call the service method to register the vendor
    this.vendorService.registerVendor(formData).subscribe(
      (response: { vendor: Vendor; message: string }) => {
        // On success
        const addedVendor = response.vendor;
        this.vendors.push(addedVendor);  // Update the vendor list with the new vendor
        this.closeAddVendorModal();
        alert(response.message);  // Display success message
      },
      (error) => {
        // On error
        console.error('There was an error!', error);
        alert('Failed to add vendor. Please try again later.');
      }
    );
  }
  // Submit the edited vendor data
  submitEditVendor() {
    this.vendorService.updateVendor(this.selectedVendor).subscribe({
      next: (updatedVendor) => {
        // Update the vendor list with the updated vendor data
        const index = this.vendors.findIndex(v => v.vendorId === updatedVendor.vendorId);
        if (index !== -1) {
          this.vendors[index] = updatedVendor;
        }
        this.closeEditVendorModal();  // Close the modal
      },
      error: (err) => {
        console.error('Error updating vendor:', err);
        alert('Failed to update vendor. Please try again.');
      }
    });
  }

  // Method to handle image selection (optional)
  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Process the file (e.g., upload it to the server)
      // For now, you can just store the file in the vendor object
      this.selectedVendor.imagePath = URL.createObjectURL(file);  // Temporarily show the image
    }
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

  viewVendor(vendorId: number) {
    this.vendorService.getVendorInfo(vendorId).subscribe({
      next: (vendor: Vendor) => {
        this.selectedVendor = vendor;
        this.selectedVendors = true; // Show the modal
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
        alert('Failed to load vendor details. Please try again.');
      }
    });
  }
  
  closeViewVendorModal() {
    this.selectedVendor = {} as Vendor; // Reset selected vendor
    this.selectedVendors = null;       // Hide the modal
  }

  openEditVendorModal(vendor: Vendor) {
    this.isEditingVendor = true;
    this.selectedVendor = { ...vendor }; // Clone the vendor to prevent direct binding
    this.closeViewVendorModal(); // Close the view modal when the edit modal opens
  }
}
