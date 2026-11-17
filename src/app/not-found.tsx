import { Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-charcoal pt-24 text-ivory">
      <div className="container-x">
        <Eyebrow className="!text-gold">Page not found</Eyebrow>
        <h1 className="mt-6 text-5xl text-white md:text-7xl">This room hasn&rsquo;t been <em className="text-beige">built yet.</em></h1>
        <p className="mt-6 max-w-lg text-ivory/70">The page you&rsquo;re looking for may have moved. Let&rsquo;s get you somewhere useful.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="light">Back to home</Button>
          <Button href="/contact" variant="ghost-light">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
