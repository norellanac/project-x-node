export interface LabelSet {
  en: string;
  es: string;
}

export interface ProductServiceLabels {
  entityName: LabelSet;
  entityNamePlural: LabelSet;
  name: LabelSet;
  description: LabelSet;
  price: LabelSet;
  specialPrice: LabelSet;
  location: LabelSet;
  provider: LabelSet;
  providerPlural: LabelSet;
  details: LabelSet;
  serviceAreas: LabelSet;
  rating: LabelSet;
}

export interface OrderLabels {
  entityName: LabelSet;
  entityNamePlural: LabelSet;
  totalAmount: LabelSet;
  startDate: LabelSet;
  endDate: LabelSet;
  comment: LabelSet;
  quantity: LabelSet;
  unitPrice: LabelSet;
  discount: LabelSet;
  charge: LabelSet;
  actions: {
    create: LabelSet;
    cancel: LabelSet;
    confirm: LabelSet;
  };
  statuses: {
    pending: LabelSet;
    confirmed: LabelSet;
    inProgress: LabelSet;
    completed: LabelSet;
    cancelled: LabelSet;
  };
}

export type PresetKey = 'services_marketplace' | 'rental' | 'rideshare' | 'ecommerce' | 'custom';

export interface FieldLabels {
  preset: PresetKey;
  productService: ProductServiceLabels;
  order: OrderLabels;
}

// ─── Presets ─────────────────────────────────────────────────────────────────

export const PRESETS: Record<Exclude<PresetKey, 'custom'>, FieldLabels> = {
  services_marketplace: {
    preset: 'services_marketplace',
    productService: {
      entityName:       { en: 'Service',       es: 'Servicio' },
      entityNamePlural: { en: 'Services',      es: 'Servicios' },
      name:             { en: 'Service name',  es: 'Nombre del servicio' },
      description:      { en: 'Description',   es: 'Descripción' },
      price:            { en: 'Price',          es: 'Precio' },
      specialPrice:     { en: 'Special price', es: 'Precio especial' },
      location:         { en: 'Location',       es: 'Ubicación' },
      provider:         { en: 'Professional',  es: 'Profesional' },
      providerPlural:   { en: 'Professionals', es: 'Profesionales' },
      details:          { en: 'Details',        es: 'Detalles' },
      serviceAreas:     { en: 'Service areas', es: 'Áreas de servicio' },
      rating:           { en: 'Rating',         es: 'Calificación' },
    },
    order: {
      entityName:       { en: 'Order',       es: 'Orden' },
      entityNamePlural: { en: 'Orders',      es: 'Órdenes' },
      totalAmount:      { en: 'Total',       es: 'Total' },
      startDate:        { en: 'Start date',  es: 'Fecha de inicio' },
      endDate:          { en: 'End date',    es: 'Fecha de fin' },
      comment:          { en: 'Notes',       es: 'Notas' },
      quantity:         { en: 'Quantity',    es: 'Cantidad' },
      unitPrice:        { en: 'Unit price',  es: 'Precio unitario' },
      discount:         { en: 'Discount',    es: 'Descuento' },
      charge:           { en: 'Extra charge', es: 'Cargo extra' },
      actions: {
        create:  { en: 'Book service',   es: 'Contratar servicio' },
        cancel:  { en: 'Cancel',         es: 'Cancelar' },
        confirm: { en: 'Confirm',        es: 'Confirmar' },
      },
      statuses: {
        pending:    { en: 'Pending',     es: 'Pendiente' },
        confirmed:  { en: 'Confirmed',   es: 'Confirmada' },
        inProgress: { en: 'In progress', es: 'En progreso' },
        completed:  { en: 'Completed',   es: 'Completada' },
        cancelled:  { en: 'Cancelled',   es: 'Cancelada' },
      },
    },
  },

  rental: {
    preset: 'rental',
    productService: {
      entityName:       { en: 'Property',        es: 'Propiedad' },
      entityNamePlural: { en: 'Properties',      es: 'Propiedades' },
      name:             { en: 'Property name',   es: 'Nombre de la propiedad' },
      description:      { en: 'About this place', es: 'Sobre este lugar' },
      price:            { en: 'Per night',        es: 'Por noche' },
      specialPrice:     { en: 'Weekend rate',     es: 'Tarifa fin de semana' },
      location:         { en: "Where you'll be",  es: 'Dónde estarás' },
      provider:         { en: 'Host',             es: 'Anfitrión' },
      providerPlural:   { en: 'Hosts',            es: 'Anfitriones' },
      details:          { en: 'Amenities',        es: 'Comodidades' },
      serviceAreas:     { en: 'Available in',     es: 'Disponible en' },
      rating:           { en: 'Guest rating',     es: 'Calificación de huéspedes' },
    },
    order: {
      entityName:       { en: 'Booking',      es: 'Reserva' },
      entityNamePlural: { en: 'Bookings',     es: 'Reservas' },
      totalAmount:      { en: 'Total',        es: 'Total' },
      startDate:        { en: 'Check-in',     es: 'Entrada' },
      endDate:          { en: 'Check-out',    es: 'Salida' },
      comment:          { en: 'Special requests', es: 'Solicitudes especiales' },
      quantity:         { en: 'Nights',       es: 'Noches' },
      unitPrice:        { en: 'Rate per night', es: 'Tarifa por noche' },
      discount:         { en: 'Discount',     es: 'Descuento' },
      charge:           { en: 'Cleaning fee', es: 'Tarifa de limpieza' },
      actions: {
        create:  { en: 'Reserve',          es: 'Reservar' },
        cancel:  { en: 'Cancel booking',   es: 'Cancelar reserva' },
        confirm: { en: 'Confirm booking',  es: 'Confirmar reserva' },
      },
      statuses: {
        pending:    { en: 'Awaiting confirmation', es: 'Esperando confirmación' },
        confirmed:  { en: 'Confirmed',             es: 'Confirmada' },
        inProgress: { en: 'Checked in',            es: 'Huésped hospedado' },
        completed:  { en: 'Checked out',           es: 'Check-out completado' },
        cancelled:  { en: 'Cancelled',             es: 'Cancelada' },
      },
    },
  },

  rideshare: {
    preset: 'rideshare',
    productService: {
      entityName:       { en: 'Ride',            es: 'Viaje' },
      entityNamePlural: { en: 'Rides',           es: 'Viajes' },
      name:             { en: 'Ride type',       es: 'Tipo de viaje' },
      description:      { en: 'Description',     es: 'Descripción' },
      price:            { en: 'Base fare',        es: 'Tarifa base' },
      specialPrice:     { en: 'Promo fare',       es: 'Tarifa promo' },
      location:         { en: 'Pickup point',     es: 'Punto de recogida' },
      provider:         { en: 'Driver',           es: 'Conductor' },
      providerPlural:   { en: 'Drivers',          es: 'Conductores' },
      details:          { en: 'Vehicle details',  es: 'Detalles del vehículo' },
      serviceAreas:     { en: 'Coverage area',    es: 'Área de cobertura' },
      rating:           { en: 'Passenger rating', es: 'Calificación de pasajeros' },
    },
    order: {
      entityName:       { en: 'Ride',        es: 'Viaje' },
      entityNamePlural: { en: 'Rides',       es: 'Viajes' },
      totalAmount:      { en: 'Fare',        es: 'Tarifa' },
      startDate:        { en: 'Pickup time', es: 'Hora de recogida' },
      endDate:          { en: 'Drop-off time', es: 'Hora de destino' },
      comment:          { en: 'Pickup notes', es: 'Notas de recogida' },
      quantity:         { en: 'Seats',        es: 'Asientos' },
      unitPrice:        { en: 'Base fare',    es: 'Tarifa base' },
      discount:         { en: 'Promo discount', es: 'Descuento promo' },
      charge:           { en: 'Surge fee',    es: 'Cargo por demanda' },
      actions: {
        create:  { en: 'Request ride',  es: 'Solicitar viaje' },
        cancel:  { en: 'Cancel ride',   es: 'Cancelar viaje' },
        confirm: { en: 'Accept ride',   es: 'Aceptar viaje' },
      },
      statuses: {
        pending:    { en: 'Looking for driver', es: 'Buscando conductor' },
        confirmed:  { en: 'Driver on the way',  es: 'Conductor en camino' },
        inProgress: { en: 'On the way',         es: 'En camino' },
        completed:  { en: 'Arrived',            es: 'Viaje completado' },
        cancelled:  { en: 'Cancelled',          es: 'Cancelado' },
      },
    },
  },

  ecommerce: {
    preset: 'ecommerce',
    productService: {
      entityName:       { en: 'Product',          es: 'Producto' },
      entityNamePlural: { en: 'Products',         es: 'Productos' },
      name:             { en: 'Product name',     es: 'Nombre del producto' },
      description:      { en: 'Description',      es: 'Descripción' },
      price:            { en: 'Price',             es: 'Precio' },
      specialPrice:     { en: 'Sale price',        es: 'Precio de oferta' },
      location:         { en: 'Ships from',        es: 'Envía desde' },
      provider:         { en: 'Seller',            es: 'Vendedor' },
      providerPlural:   { en: 'Sellers',           es: 'Vendedores' },
      details:          { en: 'Specifications',    es: 'Especificaciones' },
      serviceAreas:     { en: 'Ships to',          es: 'Envía a' },
      rating:           { en: 'Customer rating',   es: 'Calificación de clientes' },
    },
    order: {
      entityName:       { en: 'Order',            es: 'Pedido' },
      entityNamePlural: { en: 'Orders',           es: 'Pedidos' },
      totalAmount:      { en: 'Order total',       es: 'Total del pedido' },
      startDate:        { en: 'Order date',        es: 'Fecha del pedido' },
      endDate:          { en: 'Expected delivery', es: 'Entrega estimada' },
      comment:          { en: 'Order notes',       es: 'Notas del pedido' },
      quantity:         { en: 'Units',             es: 'Unidades' },
      unitPrice:        { en: 'Item price',        es: 'Precio del artículo' },
      discount:         { en: 'Discount',          es: 'Descuento' },
      charge:           { en: 'Delivery fee',      es: 'Costo de envío' },
      actions: {
        create:  { en: 'Add to cart',   es: 'Agregar al carrito' },
        cancel:  { en: 'Cancel order',  es: 'Cancelar pedido' },
        confirm: { en: 'Place order',   es: 'Realizar pedido' },
      },
      statuses: {
        pending:    { en: 'Processing',  es: 'Procesando' },
        confirmed:  { en: 'Confirmed',   es: 'Confirmado' },
        inProgress: { en: 'Shipped',     es: 'Enviado' },
        completed:  { en: 'Delivered',   es: 'Entregado' },
        cancelled:  { en: 'Cancelled',   es: 'Cancelado' },
      },
    },
  },
};

export const DEFAULT_FIELD_LABELS: FieldLabels = PRESETS.services_marketplace;

export const resolveLabels = (fieldLabels: FieldLabels, lang: string): Record<string, any> => {
  const l = lang.startsWith('es') ? 'es' : 'en';
  const resolve = (obj: any): any => {
    if (obj && typeof obj === 'object' && 'en' in obj && 'es' in obj) {
      return obj[l];
    }
    if (obj && typeof obj === 'object') {
      return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, resolve(v)]));
    }
    return obj;
  };
  return resolve(fieldLabels);
};
