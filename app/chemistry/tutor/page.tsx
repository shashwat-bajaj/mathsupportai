import { notFound } from 'next/navigation';
import SubjectTutorPlaceholderPage from '@/components/pages/SubjectTutorPlaceholderPage';
import { getSubjectConfig } from '@/lib/subjects';

export default function ChemistryTutorPage() {
  const subject = getSubjectConfig('chemistry');

  if (!subject) {
    notFound();
  }

  return <SubjectTutorPlaceholderPage subject={subject} />;
}