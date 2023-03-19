import { FAQ_DATA } from 'data/Home/homeData';

export default function Faq() {
  return (
    <section className="mx-auto my-32 w-full max-w-7xl py-4 px-6 sm:mt-44">
      <div className="grid grid-cols-none grid-rows-1 gap-20 lg:grid-cols-3">
        {/* Title */}
        <div className="col-span-2 mx-auto w-full text-left lg:col-span-1">
          <p className="text-lg font-semibold leading-8 tracking-tight text-violet-500">
            Your questions, <span className="text-violet-500">answered.</span>
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Can&#39;t find the answer you&#39;re lookinf for? Please{' '}
            <a
              href="mailto:jinpark0625@gmail.com"
              className="font-medium text-violet-500"
            >
              contact
            </a>{' '}
            to us.
          </p>
        </div>
        {/* contents */}
        <div className="col-span-2 mx-auto">
          <dl className="flex flex-col gap-16">
            {FAQ_DATA.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  <div
                    className={`absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}
                  >
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 whitespace-pre-line text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
