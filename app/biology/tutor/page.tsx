import { notFound } from 'next/navigation';
import SubjectTutorPlaceholderPage from '@/components/pages/SubjectTutorPlaceholderPage';
import { getSubjectConfig } from '@/lib/subjects';

export default function BiologyTutorPage() {
  const subject = getSubjectConfig('biology');

  if (!subject) {
    notFound();
  }

  return <SubjectTutorPlaceholderPage subject={subject} />;
}