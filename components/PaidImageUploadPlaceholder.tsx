import UpgradePrompt from '@/components/UpgradePrompt';

type PaidImageUploadPlaceholderProps = {
  compact?: boolean;
  context?: 'student' | 'parent';
};

export default function PaidImageUploadPlaceholder({
  compact = false,
  context = 'student'
}: PaidImageUploadPlaceholderProps) {
  const isParent = context === 'parent';

  return (
    <UpgradePrompt
      compact={compact}
      featureLabel="Image support"
      recommendedPlan="plus"
      title="Image and worksheet support is included in Plus and Pro."
      description={
        isParent
          ? 'Parent workspaces will support worksheet photos and image-based questions for paid plans, so adults can get clearer guidance from a child’s actual work.'
          : 'Student workspaces will support worksheet photos, screenshots, and image-based questions for paid plans. Free users can continue using text-based tutoring across all subjects.'
      }
    />
  );
}