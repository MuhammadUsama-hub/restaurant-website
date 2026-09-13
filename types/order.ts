export interface CartLine { itemId: string; quantity: number }
export interface CustomerDetails { name: string; phone: string; fulfillment: 'delivery' | 'pickup'; address: string; notes: string }
export interface OrderDraft { items: CartLine[]; customer: CustomerDetails; restaurantId: string }
export interface OrderResult { status: 'preview'; summary: string }
export interface OrderProvider { readonly id: string; readonly label: string; submit(draft: OrderDraft): Promise<OrderResult> }
