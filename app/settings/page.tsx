import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SettingsForm from '@/components/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const preferences = user.user_metadata?.preferences || {};

  return (
    <div className="grid" style={{ gap: 24, maxWidth: 900 }}>
      <section className="card">
        <h1>Settings</h1>
        <p className="small">
          Manage your display and tutor preferences for both Student and Parent modes.
        </p>
      </section>

      <SettingsForm
        initialThemePreference={preferences.themePreference || 'system'}
        initialTranslationLanguage={preferences.translationLanguage || 'English'}
        initialStudentGradeLevel={preferences.studentDefaults?.gradeLevel || 'high-school'}
        initialStudentTutorMode={preferences.studentDefaults?.tutorMode || 'teach'}
        initialParentGradeLevel={preferences.parentDefaults?.gradeLevel || 'elementary'}
      />
    </div>
  );
}