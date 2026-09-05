import { STORE_INFO } from '../data/storeData';
import { Product, CartItem } from '../types';

export function getGeneralWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = `Olá, equipe Nova City MCZ! Gostaria de tirar uma dúvida sobre os produtos e serviços da loja.`;
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${STORE_INFO.phoneRaw}?text=${text}`;
}

export function getProductWhatsAppUrl(product: Product, selectedColor?: string, selectedModel?: string): string {
  let msg = `Olá! Vi o produto *${product.name}* no site da *Nova City MCZ* (R$ ${product.price.toFixed(2).replace('.', ',')}) e gostaria de saber se tem disponível na loja para fechar a compra!`;
  
  if (selectedColor) {
    msg += `\n🎨 *Cor de interesse:* ${selectedColor}`;
  }
  if (selectedModel) {
    msg += `\n📱 *Modelo do aparelho:* ${selectedModel}`;
  }
  
  msg += `\n📍 Pretendo retirar na loja da Rua do Uruguai ou verificar entrega em Maceió.`;

  return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
}

export function getRepairQuoteWhatsAppUrl(data: {
  brand: string;
  model: string;
  issue: string;
  details?: string;
  clientName?: string;
}): string {
  let msg = `🛠️ *SOLICITAÇÃO DE ORÇAMENTO - ASSISTÊNCIA NOVA CITY MCZ*\n\n`;
  if (data.clientName) {
    msg += `👤 *Nome:* ${data.clientName}\n`;
  }
  msg += `📱 *Marca:* ${data.brand}\n`;
  msg += `📲 *Modelo:* ${data.model}\n`;
  msg += `⚠️ *Problema:* ${data.issue}\n`;
  if (data.details) {
    msg += `📝 *Observação do cliente:* ${data.details}\n`;
  }
  msg += `\n📍 Gostaria de saber valores, tempo de reparo e garantia.`;

  return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
}

export function getCartWhatsAppUrl(cartItems: CartItem[]): string {
  if (cartItems.length === 0) return getGeneralWhatsAppUrl();

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let msg = `🛒 *NOVO PEDIDO / ORÇAMENTO - SITE NOVA CITY MCZ*\n\n`;
  msg += `Olá! Gostaria de verificar a disponibilidade e fechar os seguintes itens:\n\n`;

  cartItems.forEach((item, index) => {
    msg += `${index + 1}. *${item.product.name}* (Qtd: ${item.quantity})\n`;
    if (item.selectedColor) msg += `   - Cor: ${item.selectedColor}\n`;
    if (item.selectedModel) msg += `   - Modelo: ${item.selectedModel}\n`;
    msg += `   - Valor: R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
  });

  msg += `💰 *Total Estimado: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
  msg += `💳 *Forma de Pagamento desejada:* ( ) Pix  ( ) Cartão InfinitePay  ( ) Dinheiro\n`;
  msg += `📍 *Retirada:* Rua do Uruguai, 338D ou Entrega em Maceió`;

  return `https://wa.me/${STORE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
}
