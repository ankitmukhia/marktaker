import { redirect } from 'next/navigation'

export default function Home() {
  const session = true;

  if (session) {
    redirect('/notes')
  }
  return (
    <div className="h-screen">
      Landing page
    </div>
  );
}
