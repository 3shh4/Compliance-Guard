import { Database, Scale, ShieldAlert } from "lucide-react";

export function SettingsView() {
  return (
    <div className="view-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">Ustawienia</span>
          <h1>Konfiguracja demonstracyjna</h1>
          <p>MVP działa lokalnie, bez backendu, logowania, AI i zewnętrznych API.</p>
        </div>
      </section>
      <div className="settings-grid">
        <article className="settings-card">
          <Scale size={24} />
          <h2>Zastrzeżenie</h2>
          <p>Regulato ma charakter edukacyjny i pre-audytowy. Nie stanowi porady prawnej.</p>
        </article>
        <article className="settings-card">
          <Database size={24} />
          <h2>Tryb danych</h2>
          <p>Aplikacja działa jako lokalne first-view demo z mock data, lokalnym rules engine i eksportem Markdown.</p>
        </article>
        <article className="settings-card">
          <ShieldAlert size={24} />
          <h2>Zakres MVP</h2>
          <p>Dashboard, wizard, biblioteka reguł, findingi i eksport Markdown bez ciężkiej infrastruktury.</p>
        </article>
      </div>
    </div>
  );
}
