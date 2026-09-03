export type NavigationPage = 'home' | 'speakers' | 'agenda' | 'venue' | 'register' | 'about';

export type Language = 'en' | 'ja' | 'bn';

export interface Speaker {
  id: string;
  name: string;
  nameJa?: string;
  role: string;
  roleJa?: string;
  organization: string;
  organizationJa?: string;
  isKeynote?: boolean;
  photoUrl?: string;
  bio: string;
  bioJa?: string;
  badge?: string;
  topic?: string;
  topicJa?: string;
  category: 'government' | 'diplomatic' | 'business' | 'education' | 'culture';
  speechTime?: string;
}

export interface AgendaSession {
  time: string;
  title: string;
  titleJa?: string;
  speakerIds: string[];
  theme: 'general' | 'study' | 'human-resources' | 'business';
  description: string;
  descriptionJa?: string;
  room?: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  roleOrField: string;
  attendeeType: 'student' | 'business_exec' | 'professional' | 'educator' | 'government' | 'media' | 'general';
  attendanceMode: 'in_person' | 'online_stream';
  interests: string[];
  translationNeeded: boolean;
  languagePreference: 'en' | 'ja' | 'bn';
  questionsForSpeakers?: string;
}

export interface ConfirmedTicket {
  ticketNumber: string;
  attendee: RegistrationFormData;
  registeredAt: string;
  seatZone: string;
  qrValue: string;
}

export interface Sponsor {
  name: string;
  nameJa?: string;
  role: string;
  roleJa?: string;
  description: string;
  descriptionJa?: string;
  type: 'host' | 'sponsor' | 'partner' | 'embassy';
  logoText: string;
  websiteUrl?: string;
}
