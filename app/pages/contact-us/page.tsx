// /pages/contact-us redirects to /pages/contact
import { redirect } from 'next/navigation';

export default function ContactUsPage() {
  redirect('/pages/contact');
}
