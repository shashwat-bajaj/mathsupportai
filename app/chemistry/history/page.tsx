import { notFound } from 'next/navigation';
import SubjectHistoryPlaceholderPage from '@/components/pages/SubjectHistoryPlaceholderPage';
import { getSubjectConfig } from '@/lib/subjects';

export default function ChemistryHistoryPage() {
  const subject = getSubjectConfig('chemistry');

  if (!subject) {
    notFound();
  }

  return <SubjectHistoryPlaceholderPage subject={subject} />;
}