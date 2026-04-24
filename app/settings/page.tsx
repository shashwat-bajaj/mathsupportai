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
    <div className="grid" style={{ gap: 30, maxWidth: 980 }}>
      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 6
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 900 }}>
          <span className="badge">Settings</span>
          <h1 style={{ margin: 0 }}>Adjust the product to fit how you learn and study.</h1>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Manage display preferences, translation defaults, and tutor behavior for both Student
            and Parent experiences. These settings help keep the workspace more consistent from one
            session to the next.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            paddingTop: 14,
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Display preferences</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Theme behavior and translation defaults for a more comfortable interface.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Student defaults</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Set the starting level and tutor mode before new student sessions begin.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Parent defaults</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Keep the parent workspace better aligned with the child’s level from the start.
            </p>
          </div>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 18 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <h2 style={{ margin: 0 }}>Preference controls</h2>
          <p className="small" style={{ margin: 0, maxWidth: 760 }}>
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