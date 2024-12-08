export interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
  location: string;
}

export interface Booking {
  bookingId: number;
  userId: number;
  workshopId: number;
  serviceId: number;
  bookingDate: Date; 
  notes: string;
  createdAt: Date; // Use string type for date if it's in ISO format
  updatedAt: Date; // Use string type for date if it's in ISO format
  statusId: number;
  status: string;
  slot: string;
}

export interface ViewBooking {
  bookingDate: Date; // The date of the booking (ISO string format)
  status: string | null; // Status can be null, otherwise it's a string
  notes: string; // Any notes about the booking
  createdAt: Date; // Date when the booking was created
  statusId: number; // ID for the status (could be mapped to an enum or a set of constants)
  expr1: string; // Status description (e.g., "Pending")
  serviceTitle: string; // Title of the service booked
  description: string; // Detailed description of the service
  details: string; // Additional details about the service
  priceRange: number; // Price for the service
  vendorName: string; // Name of the vendor providing the service
  userId: number; // ID of the user who made the booking
  serviceName: string | null; // Service name (can be null if not applicable)
  vendorId: number; // Vendor ID (who is offering the service)
  bookingId: number; // Unique ID for the booking
  slot: string;
}
