import Footer from "@/components/footer";
import Header from "@/components/header";

const Solutions = () => {
  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased overflow-x-hidden selection:bg-primary selection:text-background-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">
        {/* Hero Section */}
        <section className="relative isolate pt-14 lg:pt-20 pb-20 overflow-hidden h-[92vh]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#10B981] to-[#064e3b] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
          </div>
          <div className="mx-auto max-w-300 px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-3xl py-12 sm:py-16">
              <div className="mb-8 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Trusted by 500+ Healthcare Providers
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                AI Voice & Translation <br className="hidden sm:block" /> Solutions for{" "}
                <span className="bg-clip-text bg-linear-to-r text-emerald-300">
                  Healthcare
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-text-muted max-w-2xl mx-auto">
                Empower your staff and enhance patient care with intelligent voice
                automation. From multilingual translation to instant triage, our solutions
                are built for the modern hospital.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-lg bg-primary px-6 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
                  href="#"
                >
                  Explore Solutions
                </a>
                <a
                  className="group text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-primary transition-colors"
                  href="#"
                >
                  View Compliance Docs{" "}
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-card-dark border-y border-border-dark relative">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#10B981 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          <div className="mx-auto max-w-300 px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="group relative bg-background-dark p-6 rounded-2xl border border-border-dark hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <span className="material-symbols-outlined text-blue-400 text-2xl">
                    support_agent
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Patient Support</h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  24/7 AI agents handling FAQs, medication reminders, and general inquiries
                  with human-like empathy.
                </p>
                <a
                  className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  href="#"
                >
                  Learn more{" "}
                  <span className="material-symbols-outlined text-[16px] ml-1">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-background-dark p-6 rounded-2xl border border-border-dark hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <span className="material-symbols-outlined text-purple-400 text-2xl">
                    calendar_month
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scheduling</h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  Automate bookings, cancellations, and rescheduling directly integrated
                  with your EHR calendar system.
                </p>
                <a
                  className="inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  href="#"
                >
                  Learn more{" "}
                  <span className="material-symbols-outlined text-[16px] ml-1">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-background-dark p-6 rounded-2xl border border-border-dark hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <span className="material-symbols-outlined text-yellow-400 text-2xl">
                    verified_user
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Insurance & Claims</h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  Voice bots that verify eligibility, check claim status, and collect payer
                  details before arrival.
                </p>
                <a
                  className="inline-flex items-center text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                  href="#"
                >
                  Learn more{" "}
                  <span className="material-symbols-outlined text-[16px] ml-1">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* Feature 4 */}
              <div className="group relative bg-background-dark p-6 rounded-2xl border border-border-dark hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    translate
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Translation</h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  Real-time voice translation in 40+ languages to bridge communication gaps
                  instantly.
                </p>
                <a
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                  href="#"
                >
                  Learn more{" "}
                  <span className="material-symbols-outlined text-[16px] ml-1">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Workflow Builder */}
        <section className="py-24 bg-background-dark overflow-hidden">
          <div className="mx-auto max-w-300 px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Visual Workflow Builder
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Design complex patient interactions with our drag-and-drop editor.
              </p>
            </div>
            <div className="relative w-full max-w-5xl mx-auto h-150 rounded-xl border border-border-dark bg-[#111813] shadow-2xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(#374151 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="absolute bottom-4 left-4 flex flex-col gap-2 bg-card-dark border border-border-dark rounded-lg p-1 z-20">
                <button className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
                <button className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded">
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full transform scale-[0.85] md:scale-100 origin-center p-12">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ overflow: "visible" }}
                  >
                    <path
                      d="M500 80 L500 150"
                      fill="none"
                      stroke="#4b5563"
                      strokeWidth="2"
                    ></path>
                    <path
                      className="opacity-50"
                      d="M500 230 L500 280 L300 280 L300 320"
                      fill="none"
                      stroke="#4b5563"
                      strokeWidth="2"
                    ></path>
                    <path
                      className="opacity-50"
                      d="M500 230 L500 280 L700 280 L700 320"
                      fill="none"
                      stroke="#4b5563"
                      strokeWidth="2"
                    ></path>
                    <path
                      className="opacity-50"
                      d="M300 400 L300 450"
                      fill="none"
                      stroke="#4b5563"
                      strokeWidth="2"
                    ></path>
                    <path
                      className="opacity-50"
                      d="M700 400 L700 450"
                      fill="none"
                      stroke="#4b5563"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  {/* Node 1 */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-48 bg-[#111813] border-2 border-primary rounded-lg shadow-lg z-10 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-sm">
                        call
                      </span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Inbound Call
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Trigger: Patient calls main line
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-[#111813]"></div>
                  </div>
                  {/* Node 2 */}
                  <div className="absolute top-37.5 left-1/2 -translate-x-1/2 w-64 bg-[#111813] border border-border-dark rounded-lg shadow-lg z-10 p-4">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-500 rounded-full border-2 border-[#111813]"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-white">
                        Symptom Analysis
                      </span>
                      <span className="material-symbols-outlined text-purple-400 text-sm">
                        neurology
                      </span>
                    </div>
                    <div className="bg-black/30 p-2 rounded text-xs text-slate-300 font-mono mb-2">
                      "Are you experiencing chest pain or shortness of breath?"
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">
                      Waiting for intent...
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-[#111813]"></div>
                  </div>
                  {/* Node 3 (Emergency) */}
                  <div className="absolute top-80 left-[calc(50%-200px)] -translate-x-1/2 w-56 bg-[#111813] border border-border-dark rounded-lg shadow-lg z-10 p-4">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-500 rounded-full border-2 border-[#111813]"></div>
                    <div className="flex items-center gap-2 mb-2 border-b border-gray-700 pb-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm font-bold text-white">Emergency Route</span>
                    </div>
                    <div className="text-xs text-slate-300 mb-2">
                      Intent detected: <span className="text-red-400">Critical</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-500/10 p-2 rounded border border-red-500/20">
                      <span className="material-symbols-outlined text-red-400 text-sm">
                        phone_forwarded
                      </span>
                      <span className="text-xs text-red-200">Connect to ER Nurse</span>
                    </div>
                  </div>
                  {/* Node 4 (Routine) */}
                  <div className="absolute top-80 left-[calc(50%+200px)] -translate-x-1/2 w-56 bg-[#111813] border border-border-dark rounded-lg shadow-lg z-10 p-4">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-500 rounded-full border-2 border-[#111813]"></div>
                    <div className="flex items-center gap-2 mb-2 border-b border-gray-700 pb-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-sm font-bold text-white">Routine Route</span>
                    </div>
                    <div className="text-xs text-slate-300 mb-2">
                      Intent detected: <span className="text-primary">Appointment</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 p-2 rounded border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-sm">
                        calendar_month
                      </span>
                      <span className="text-xs text-primary-100">
                        Open Scheduling Slot
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-card-dark/30 border-t border-border-dark">
          <div className="mx-auto max-w-300 px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Deployed Across Departments
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary/30 transition-colors">
                    <div className="mt-1 shrink-0 h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400">
                        cardiology
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        Cardiology Center
                      </h4>
                      <p className="text-sm text-text-muted mt-1">
                        "Reduced patient hold times by 85% during peak morning hours by
                        automating prescription refill requests."
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary/30 transition-colors">
                    <div className="mt-1 shrink-0 h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400">
                        pediatrics
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Pediatrics</h4>
                      <p className="text-sm text-text-muted mt-1">
                        "Our after-hours triage bot successfully routed 300+ urgent cases
                        to on-call physicians last month."
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-background-dark border border-border-dark hover:border-primary/30 transition-colors">
                    <div className="mt-1 shrink-0 h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-400">
                        accessible
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Geriatric Care</h4>
                      <p className="text-sm text-text-muted mt-1">
                        "VoiceMed's slow-speech mode has been incredible for communicating
                        with our elderly patients clearly."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Provider Success Stories
                </h3>
                <div className="relative">
                  <div className="bg-linear-to-br from-[#1c271f] to-background-dark p-8 rounded-2xl border border-border-dark relative">
                    <span className="material-symbols-outlined absolute top-6 right-6 text-6xl text-white/5">
                      format_quote
                    </span>
                    <div className="flex gap-1 text-primary mb-4">
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                    <p className="text-lg text-white mb-6 leading-relaxed italic">
                      "Implementing VoiceMed was the single most impactful operational
                      change we made this year. The translation feature alone has allowed
                      us to serve our diverse community without waiting for third-party
                      interpreters."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-600 overflow-hidden">
                        <img
                          alt="Portrait of Dr. James Wilson"
                          className="h-full w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD83ZkMYbs3EBYRlU8jmKDWsOo0yf2yjefH5GXf0uGKZBQEbyNPQI2IWYFNUlWKj7buZ83MRre56PdMHSgDI6AAtwfrbuC8l42NigXsKvRFrN4jv-FfDRNCZFIk7tMSbNIBjUrOCnJs3_R1lw6W4PeqifingrcaV3Ey5cerJBzZAI1ehByJ3s1UwapdRKiqagXZMQHV1fXW9mwZgTWomHVybFEdpxl-PhlIFEPXx1oJdrOKzu-aT4hpnVWI8mS0jQFUz_4gVbEM9bY"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white">Dr. James Wilson</div>
                        <div className="text-sm text-text-muted">
                          Director of Operations, City Health
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-card-dark/50 rounded-2xl border border-border-dark"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate overflow-hidden py-16 sm:py-24">
          <div className="mx-auto max-w-300 px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Start Building Better Patient Experiences
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto mb-10">
              Join the healthcare AI revolution. Request a demo to see how our voice
              solutions can fit into your existing workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                className="w-full sm:w-auto rounded-lg bg-primary px-8 py-3.5 text-base font-bold text-white shadow-sm hover:bg-primary-hover transition-colors"
                href="#"
              >
                Schedule Demo
              </a>
              <a
                className="w-full sm:w-auto rounded-lg border border-border-dark bg-transparent px-8 py-3.5 text-base font-bold text-white hover:bg-white/5 transition-colors"
                href="#"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  )
}

export default Solutions