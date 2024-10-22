import { auth, EnrichedSession } from 'auth';
import Dashboard from '@/components/Dashboard';
import Homepage from '@/components/homepage';

export default async function Index() {
  const session = (await auth()) as EnrichedSession;

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      {session ? (
        <Dashboard />
      ) : (
        <Homepage />
      )}
    </div>
  );
}
