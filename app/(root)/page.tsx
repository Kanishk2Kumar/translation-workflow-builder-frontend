import Header from "@/components/header"
export default function Home() {
  return (
    <>
      <div className="bg-background-dark text-slate-100 font-display antialiased overflow-x-hidden selection:bg-primary selection:text-background-dark">
        <div className="relative flex min-h-screen w-full flex-col">
          <Header />

          <main className="flex-1">
            {/* Hero Section */}
            <section className="relative isolate pt-14 lg:pt-16 pb-20 overflow-hidden">
              {/* Abstract Background Gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#13ec5b] to-[#1c271f] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
              </div>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-12 sm:py-16 lg:py-20 text-center">
                  <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <span>New: EHR Integration 2.0 is live</span>
                    <span className="material-symbols-outlined ml-1 text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Enterprise level translation workflows, tailored for {" "}
                    <span className="text-primary">Healthcare Needs</span>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-text-muted">
                    Streamline hospital workflows, reduce staff burnout, and
                    improve patient engagement with our HIPAA-compliant
                    conversational voice assistants.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      className="rounded-lg bg-primary px-6 py-3 text-base font-bold text-background-dark shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
                      href="#"
                    >
                      Book a Demo
                    </a>
                    <a
                      className="group text-sm font-semibold leading-6 text-white flex items-center gap-1"
                      href="#"
                    >
                      View Solutions{" "}
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>

                {/* Glassmorphism Product Preview */}
                <div className="mt-8 flow-root sm:mt-12">
                  <div className="relative rounded-xl bg-card-dark/50 p-2 ring-1 ring-inset ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <div className="rounded-lg bg-card-dark shadow-2xl ring-1 ring-white/10 overflow-hidden aspect-[16/9] relative group">
                      <img
                        alt="Dashboard interface showing medical voice analytics and waveforms"
                        className="w-full h-full object-cover opacity-60"
                        data-alt="Modern healthcare dashboard interface with data visualization"
                        src="./screen.png"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="glass-panel p-8 rounded-xl max-w-lg w-full text-center transform group-hover:scale-105 transition-transform duration-500">
                          <div className="flex justify-center mb-4 text-primary">
                            <span className="material-symbols-outlined text-6xl">
                              mic
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Live Workflow Simulation
                          </h3>
                          <p className="text-slate-300">
                            Experience how our AI handles complex medical
                            scheduling conversations in real-time.
                          </p>
                          <button className="mt-6 border border-primary text-primary hover:bg-primary hover:text-background-dark px-4 py-2 rounded-lg font-bold transition-colors">
                            Try Interactive Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Metrics Section */}
            <section className="border-y border-border-dark bg-card-dark/30 py-12">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                  <div className="flex flex-col gap-y-2">
                    <dt className="text-sm leading-6 text-text-muted">
                      Reduction in Hold Times
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                      92%
                    </dd>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <dt className="text-sm leading-6 text-text-muted">
                      Appointment Show Rate
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                      +18%
                    </dd>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <dt className="text-sm leading-6 text-text-muted">
                      Staff Hours Saved/Week
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                      400+
                    </dd>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <dt className="text-sm leading-6 text-text-muted">
                      Patient Satisfaction
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                      4.8/5
                    </dd>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section className="py-24 sm:py-32 bg-background-dark relative overflow-hidden">
              <div className="absolute right-0 top-1/4 -z-10 translate-x-1/2 transform-gpu blur-3xl opacity-20 w-[40rem] h-[40rem] bg-primary rounded-full pointer-events-none"></div>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                  <h2 className="text-base font-semibold leading-7 text-primary">
                    Trust & Compliance
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Enterprise-Grade Security
                  </p>
                  <p className="mt-6 text-lg leading-8 text-text-muted">
                    Built for healthcare providers who demand the highest
                    standards of data protection, reliability, and regulatory
                    adherence.
                  </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                  <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
                    {/* Security Card 1 */}
                    <div className="flex flex-col bg-card-dark p-8 rounded-2xl border border-border-dark hover:border-primary/50 transition-colors">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          verified_user
                        </span>
                      </div>
                      <dt className="text-xl font-bold leading-7 text-white">
                        HIPAA Compliant
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                        <p className="flex-auto">
                          Fully compliant with all healthcare data privacy
                          regulations to protect sensitive patient information
                          at every touchpoint.
                        </p>
                      </dd>
                    </div>
                    {/* Security Card 2 */}
                    <div className="flex flex-col bg-card-dark p-8 rounded-2xl border border-border-dark hover:border-primary/50 transition-colors">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          lock
                        </span>
                      </div>
                      <dt className="text-xl font-bold leading-7 text-white">
                        SOC 2 Type II Certified
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                        <p className="flex-auto">
                          Regularly audited and verified security controls to
                          ensure your organizational data is always safe and
                          process integrity is maintained.
                        </p>
                      </dd>
                    </div>
                    {/* Security Card 3 */}
                    <div className="flex flex-col bg-card-dark p-8 rounded-2xl border border-border-dark hover:border-primary/50 transition-colors">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          encrypted
                        </span>
                      </div>
                      <dt className="text-xl font-bold leading-7 text-white">
                        End-to-End Encryption
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                        <p className="flex-auto">
                          AES-256 encryption protocols for data in transit and
                          at rest, ensuring that voice data is never accessible
                          to unauthorized parties.
                        </p>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Workflows Section */}
            <section className="py-20 bg-card-dark/20">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Pre-built Healthcare Workflows
                    </h2>
                    <p className="mt-4 text-lg text-text-muted">
                      Deploy proven conversation templates in minutes, not
                      months.
                    </p>
                  </div>
                  <a
                    className="text-primary font-bold flex items-center hover:underline"
                    href="#"
                  >
                    View all templates{" "}
                    <span className="material-symbols-outlined ml-1">
                      arrow_forward
                    </span>
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Workflow Card 1 */}
                  <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card-dark border border-border-dark hover:border-primary/40 transition-all shadow-lg">
                    <div className="aspect-[16/9] bg-gray-800 sm:aspect-[2/1] lg:aspect-auto lg:h-64 relative overflow-hidden">
                      <img
                        alt="Doctor reviewing digital appointment schedule on tablet"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                        data-alt="Doctor reviewing digital appointment schedule"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo4QBBzCTG0Fx-MZWT0RpGwu-58oFeeHLyQFHZdqL8wYsAD5M3jJEfwFPK0r5HcNISOBg2j_jvUc8tftdC5FPRzdg_427jpiSLLGbYoYGizUhnMdhzfvx93k76iqvdLFOe8KHC35MxyyhPgfpvlLtnIx3fmkwZhd36O75VXNM3OxPXgOGSrkjewulhBDijcZujRThWHaA5vu0BjOffFdeaMF9Y4HWP5zUm13ye88F_Z_6k3drEnX2oUNmVkABFZTNrNqHOteKQwuY"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-card-dark/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/30">
                          Scheduling
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        <a href="#">
                          <span className="absolute inset-0"></span>
                          Appointment Booking Bot
                        </a>
                      </h3>
                      <p className="text-text-muted text-sm mb-4">
                        Handle inbound calls for new appointments,
                        cancellations, and rescheduling. Syncs directly with
                        Epic, Cerner, and AthenaHealth.
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            schedule
                          </span>
                          24/7 Availability
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            sync
                          </span>
                          Real-time EHR Sync
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Card 2 */}
                  <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card-dark border border-border-dark hover:border-primary/40 transition-all shadow-lg">
                    <div className="aspect-[16/9] bg-gray-800 sm:aspect-[2/1] lg:aspect-auto lg:h-64 relative overflow-hidden">
                      <img
                        alt="Medical professional analyzing patient data"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                        data-alt="Nurse checking patient vitals for follow up"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD83ZkMYbs3EBYRlU8jmKDWsOo0yf2yjefH5GXf0uGKZBQEbyNPQI2IWYFNUlWKj7buZ83MRre56PdMHSgDI6AAtwfrbuC8l42NigXsKvRFrN4jv-FfDRNCZFIk7tMSbNIBjUrOCnJs3_R1lw6W4PeqifingrcaV3Ey5cerJBzZAI1ehByJ3s1UwapdRKiqagXZMQHV1fXW9mwZgTWomHVybFEdpxl-PhlIFEPXx1oJdrOKzu-aT4hpnVWI8mS0jQFUz_4gVbEM9bY"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-card-dark/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center rounded-md bg-blue-400/20 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
                          Post-Care
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        <a href="#">
                          <span className="absolute inset-0"></span>
                          Post-Discharge Follow-up
                        </a>
                      </h3>
                      <p className="text-text-muted text-sm mb-4">
                        Automated check-in calls to monitor patient recovery,
                        medication adherence, and symptom tracking after
                        hospital discharge.
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            trending_up
                          </span>
                          Reduces Readmission
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            sentiment_satisfied
                          </span>
                          Patient Engagement
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Card 3 */}
                  <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card-dark border border-border-dark hover:border-primary/40 transition-all shadow-lg">
                    <div className="aspect-video bg-gray-800 sm:aspect-2/1 lg:aspect-auto lg:h-64 relative overflow-hidden">
                      <img
                        alt="Medical team meeting discussing triage procedures"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                        data-alt="Abstract medical triage concept with team"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsA6mdY0lfs0jiIlNNUt2_C7PIRvaYotfDrLKeFYiFwbgNWlzKlFeKaswTgZhC-NSNWBI-7NqMWTlQTguPvMIXShMl9PYkuK6W6YLrGE9QymxpAARyQ3FjZ1A5N395jFVEWdeT4eYe47AtAqm_HJh3cmOxZb4BsqOoBb1g63zdm3Hs3c5zf8XqkL_wMhIMUMu11TOhe8TlaLVaz8Ak1nO9qDTgmQKMtQ6tmlMCoqdx8-w9TCB-i9kB0nGXe28k1MSr-GdPBGjPhco"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-card-dark via-card-dark/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center rounded-md bg-purple-400/20 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
                          Triage
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        <a href="#">
                          <span className="absolute inset-0"></span>
                          Symptom Checker & Triage
                        </a>
                      </h3>
                      <p className="text-text-muted text-sm mb-4">
                        AI-driven initial assessment to route patients to the
                        appropriate level of care, reducing ER overcrowding and
                        non-urgent visits.
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            medical_services
                          </span>
                          Clinical Protocols
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            speed
                          </span>
                          Instant Routing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
                  <div className="max-w-xl lg:max-w-lg">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Ready to modernize your patient communication?
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-text-muted">
                      Join over 500+ healthcare providers using Translatio to
                      deliver better care at scale.
                    </p>
                    <div className="mt-6 flex max-w-md gap-x-4">
                      <div className="flex-1">
                        <label className="sr-only" htmlFor="email-address">
                          Email address
                        </label>
                        <input
                          autoComplete="email"
                          className="min-w-0 flex-auto w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                          id="email-address"
                          name="email"
                          placeholder="Enter your work email"
                          required
                          type="email"
                        />
                      </div>
                      <button
                        className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-bold text-background-dark shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        type="submit"
                      >
                        Request Access
                      </button>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-400">
                      No credit card required. By subscribing, you agree to our{" "}
                      <a
                        className="font-semibold text-primary hover:text-primary-hover"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                  <div className="relative lg:ml-auto">
                    <div className="rounded-2xl border border-border-dark bg-card-dark p-8 shadow-2xl">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-600 flex-shrink-0 overflow-hidden">
                          <img
                            alt="Doctor profile"
                            className="h-full w-full object-cover"
                            data-alt="Portrait of Dr. Sarah Jenkins"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVhob6Nrz0Y_Y41GQuxJb6vPJS9CGu4txsj0dSsk2KRZX_9TbT3-t1qhyxdZIGzIQz5H7ZCc4pHeBkrooIjLphv_dyDhA_Zif8s3MJjM0tyOKgfDeFxjPLDByj9Iuy__3QroomRM2v3DmsQL_MVfrkTsWn7NQKAqypTB3F6re7il_-DsEyiSdA1f8YHsFTwLzWXENXvL_y2gzq7RCA9yQcfm3Sv0cMobaviKsY_u9wJNYaU4wplkn2vFZJuyaYBBvolYBSklzyfs0"
                          />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-white italic">
                            "Translatio has transformed our front desk
                            operations. We've seen a 40% drop in missed calls
                            and our patients love the instant responses."
                          </p>
                          <div className="mt-4">
                            <p className="text-base font-bold text-white">
                              Dr. Sarah Jenkins
                            </p>
                            <p className="text-sm text-text-muted">
                              Chief Medical Officer, Mercy General
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer
            aria-labelledby="footer-heading"
            className="bg-background-dark border-t border-border-dark"
          >
            <h2 className="sr-only" id="footer-heading">
              Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
              <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded text-primary">
                  <div className="size-8 text-primary">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                    <span className="text-md font-bold text-white">
                      Translatio
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-text-muted">
                    Empowering healthcare providers with intelligent voice
                    automation. secure, scalable, and patient-centric.
                  </p>
                  <div className="flex space-x-6">
                    <a className="text-gray-400 hover:text-white" href="#">
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        aria-hidden="true"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          clipRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a className="text-gray-400 hover:text-white" href="#">
                      <span className="sr-only">Twitter</span>
                      <svg
                        aria-hidden="true"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                      <h3 className="text-sm font-semibold leading-6 text-white">
                        Solutions
                      </h3>
                      <ul className="mt-6 space-y-4" role="list">
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Appointment Booking
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Patient Triage
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Prescription Refill
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Post-Discharge
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-10 md:mt-0">
                      <h3 className="text-sm font-semibold leading-6 text-white">
                        Support
                      </h3>
                      <ul className="mt-6 space-y-4" role="list">
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Documentation
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            API Reference
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            System Status
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Contact Sales
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                      <h3 className="text-sm font-semibold leading-6 text-white">
                        Company
                      </h3>
                      <ul className="mt-6 space-y-4" role="list">
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            About
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Blog
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Careers
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Press
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-10 md:mt-0">
                      <h3 className="text-sm font-semibold leading-6 text-white">
                        Legal
                      </h3>
                      <ul className="mt-6 space-y-4" role="list">
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Privacy
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            Terms
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-sm leading-6 text-text-muted hover:text-white"
                            href="#"
                          >
                            BAA Agreement
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 border-t border-border-dark py-8 sm:mt-20 lg:mt-24">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 lg:flex-row lg:px-8">
                  <p className="text-xs leading-5 text-gray-500">
                    © 2024 Translatio Inc. All rights reserved.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-500">
                      All Systems Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
