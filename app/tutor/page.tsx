import MathTutor from '@/components/MathTutor';

export default function TutorPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <MathTutor
        audience="student"
        title="Tutor support for Students"
        description="Use this page for direct math help, worked solutions, hints, diagnosis mode, and practice questions."
      />
    </div>
  );
}