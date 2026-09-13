import { restaurantConfig } from '@/config/restaurant';
import { catalog } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import type { OrderDraft, OrderProvider, OrderResult } from '@/types/order';

// A provider boundary; no messaging, payment, server submission, or external API.
export class LocalPreviewOrderProvider implements OrderProvider {
  readonly id = 'local-preview';
  readonly label = 'Preview my order';
  async submit(draft: OrderDraft): Promise<OrderResult> {
    if (!draft.items.length) throw new Error('Add something delicious to your order first.');
    const lines = draft.items.map((line) => {
      const item = catalog.getItem(line.itemId);
      if (!item || !item.available || !Number.isInteger(line.quantity) || line.quantity < 1) throw new Error('An item in your order is unavailable. Please review your bag.');
      return `${item.name} × ${line.quantity} — ${formatPrice(item.price * line.quantity)}`;
    });
    const subtotal = draft.items.reduce((sum, line) => sum + (catalog.getItem(line.itemId)?.price ?? 0) * line.quantity, 0);
    return { status: 'preview', summary: [
      `${restaurantConfig.name} — DEMO ORDER PREVIEW`, '', ...lines, '',
      `Subtotal: ${formatPrice(subtotal)}`, `Order type: ${draft.customer.fulfillment}`, '',
      `Name: ${draft.customer.name}`, `Phone: ${draft.customer.phone}`,
      ...(draft.customer.fulfillment === 'delivery' ? [`Address: ${draft.customer.address}`] : []),
      ...(draft.customer.notes ? [`Notes: ${draft.customer.notes}`] : []), '',
      'Preview only. This order has NOT been placed. No payment collected.',
      'Delivery charges and applicable taxes are not configured in this demo.',
    ].join('\n') };
  }
}
export const orderProvider: OrderProvider = new LocalPreviewOrderProvider();
