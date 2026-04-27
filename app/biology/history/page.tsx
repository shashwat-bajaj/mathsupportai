import { notFound } from 'next/navigation';
import SubjectHistoryPlaceholderPage from '@/components/pages/SubjectHistoryPlaceholderPage';
import { getSubjectConfig } from '@/lib/subjects';

export default function BiologyHistoryPage() {
  const subject = getSubjectConfig('biology');

  if (!subject) {
    notFound();
  }

  return <SubjectHistoryPlaceholderPage subject={subject} />;
}