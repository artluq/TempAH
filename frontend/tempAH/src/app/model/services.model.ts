export interface Service {
    serviceId: number;
    serviceName: string;
    description: string;
    price: number;
  }
  

  export interface ServiceDetail {
    serviceDetailId: number;
    serviceId: number;
    serviceTitle: string;
    description: string;
    details: string;
    priceRange: number;
    isActive: boolean;
  }
  