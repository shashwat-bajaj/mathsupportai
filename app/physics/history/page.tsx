import { notFound } from 'next/navigation';
import SubjectHistoryPlaceholderPage from '@/components/pages/SubjectHistoryPlaceholderPage';
import { getSubjectConfig } from '@/lib/subjects';

export default function PhysicsHistoryPage() {
  const subject = getSubjectConfig('physics');

  if (!subject) {
    notFound();
  }

  return <SubjectHistoryPlaceholderPage subject={subject} />;
}