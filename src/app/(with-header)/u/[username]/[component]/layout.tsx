export default function ComponentPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-950 py-8">
      <div className="max-w-page-max-width mx-auto p-4">{children}</div>
    </div>
  );
}
