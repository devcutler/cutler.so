import { ContactForm } from '@/components/ContactForm';
import { Smile } from 'lucide-react';

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Shoot me a message
        </h1>
        <p className="text-lg text-muted-foreground flex items-center gap-2">
          Response time is usually pretty quick <Smile size={20} />
        </p>
      </header>
      
      <div className="card p-8">
        <ContactForm />
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          You can also reach me through other platforms or check out my work on GitHub.
        </p>
      </footer>
    </main>
  );
}