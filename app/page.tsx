import { auth, EnrichedSession } from 'auth';
import Dashboard from '@/components/Dashboard';

export default async function Index() {
  const session = (await auth()) as EnrichedSession;

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      {session ? (
        <Dashboard />
      ) : (
        <p className="p-4">Please sign in to view your channel videos and manage comments.</p>
      )}
    </div>
  );
}
