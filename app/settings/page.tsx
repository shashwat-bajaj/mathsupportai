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
    <div className="grid" style={{ gap: 24, maxWidth: 920 }}>
      <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
        <span className="badge">Settings</span>

        <div style={{ display: 'grid', gap: 10 }}>
          <h1 style={{ margin: 0 }}>Adjust the product to fit how you learn and study.</h1>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Manage your display preferences, translation defaults, and tutor behavior for both
            Student and Parent experiences. These settings help keep the workspace more consistent
            from one session to the next.
          </p>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Display preferences</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Control theme behavior and language defaults so the interface feels more comfortable to
            use over time.
          </p>
        </div>

        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Student defaults</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Set the starting level and tutor mode used in the student workspace before each new
            session begins.
          </p>
        </div>

        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Parent defaults</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Keep the parent workspace better aligned with the child’s level so explanations feel
            more usable right away.
          </p>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <h2 style={{ margin: 0 }}>Preference controls</h2>
          <p className="small" style={{ margin: 0 }}>
            Changes saved here shape the default experience, while still letting you adjust things
            inside a session whenever needed.
          </p>
        </div>

        <SettingsForm
          initialThemePreference={preferences.themePreference || 'system'}
          initialTranslationLanguage={preferences.translationLanguage || 'English'}
          initialStudentGradeLevel={preferences.studentDefaults?.gradeLevel || 'high-school'}
          initialStudentTutorMode={preferences.studentDefaults?.tutorMode || 'auto'}
          initialParentGradeLevel={preferences.parentDefaults?.gradeLevel || 'elementary'}
        />
      </section>
    </div>
  );
}