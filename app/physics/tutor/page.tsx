import { notFound } from 'next/navigation';
import SubjectTutorPlaceholderPage from '@/components/pages/SubjectTutorPlaceholderPage';
import { getSubjectConfig } from '@/lib/subjects';

export default function PhysicsTutorPage() {
  const subject = getSubjectConfig('physics');

  if (!subject) {
    notFound();
  }

  return <SubjectTutorPlaceholderPage subject={subject} />;
}