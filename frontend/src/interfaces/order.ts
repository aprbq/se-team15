export interface OrderItem {
    id: string;
    name: string;
    price: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    employee: string;
    customer: string;
}   
  
export interface FilterOptions {
    status: string;
    search: string;
}