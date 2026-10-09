export interface ServiceInterface {
  category_id: string;
  title: string;
  description: string;
  price: number;
}

export interface ServiceQueryInterface {
  searchTerm?: string;         
  categoryId?: string;     
  technicianId?: string;  
  minPrice?: number;       
  maxPrice?: number;      
  page?: number;          
  limit?: number;       
  sortBy?: 'price' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';            
}