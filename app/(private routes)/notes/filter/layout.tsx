import css from "@/app/(private routes)/notes/filter/LayoutNotes.module.css";

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.container}>{children}</main>
    </section>
  );
}
