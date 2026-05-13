type LeadRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  source: string;
  userAgent: string | null;
};

type BookingRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  company: string;
  bookingDate: string;
  bookingTime: string;
  userAgent: string | null;
};

type FallbackStore = {
  leads: LeadRecord[];
  bookings: BookingRecord[];
};

declare global {
  var __edproFallbackStore__: FallbackStore | undefined;
}

export function getFallbackStore(): FallbackStore {
  if (!globalThis.__edproFallbackStore__) {
    globalThis.__edproFallbackStore__ = {
      leads: [],
      bookings: [],
    };
  }

  return globalThis.__edproFallbackStore__;
}

export type { BookingRecord, LeadRecord };
