import { permanentRedirect } from 'next/navigation';

export default function CollectionsIndexPage() {
  permanentRedirect('/collections/all');
}
