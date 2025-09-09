import Image from 'next/image';

const companies = [
  { name: 'Articulate', src: '/img-articulate.svg' },
  { name: 'Mailchimp', src: '/img-mailchimp.svg' },
  { name: 'Microsoft', src: '/img-microsoft.svg' },
  { name: 'Mybite', src: '/img-mybite.svg' },
  { name: 'StubHub', src: '/img-stubhub.svg', hideOnLarge: true },
  { name: 'Uber', src: '/img-uber.svg' },
];

export default function LogoCloud() {
  return (
    <section>
      <div className="hero-logo-cloud">
        <div className="mx-auto px-0">
          <h2 className="text-center text-[0.8rem] tracking-[0.1rem] uppercase font-semibold leading-6 lg:leading-8 text-white mb-4">
            Trusted by these innovative companies
          </h2>
          <div className="grid items-center grid-cols-2 lg:grid-cols-5 gap-4 md:gap-12 xl:gap-24 w-3/4 xl:w-10/12 2xl:w-3/4 3xl:w-7/12 4xl:w-1/2 mx-auto">
            {companies.map((company) => (
              <Image
                key={company.name}
                className={`logo ${company.hideOnLarge ? 'block lg:hidden' : ''}`}
                src={company.src}
                alt={company.name}
                width={120}
                height={40}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}