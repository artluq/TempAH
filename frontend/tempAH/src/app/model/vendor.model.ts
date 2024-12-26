import { NumericValueAccessor } from "@ionic/angular";

export interface Vendor {
  vendorId: number;       
  vendorName: string;     
  address: string;        
  city: string;           
  phoneNumber: string;    
  email: string;          
  isActive: boolean;      
  createdAt: string;     
  stateId: number;  
  userId: number;
  imagePath?: string; 
  rating: number;
  }
  
  