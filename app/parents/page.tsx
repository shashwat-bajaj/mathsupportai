import MathTutor from '@/components/MathTutor';

export default function ParentsPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <MathTutor
        audience="parent"
        lockedMode="hint"
        title="Tutor support for Parents"
        description="Use this version when you want guidance on how to help a child learn, without jumping straight to the full solution."
        placeholder="Example: My child is learning long division and gets confused after the first subtraction step. How can I explain it clearly?"
      />
    </div>
  );
}