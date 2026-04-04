import Footer from "@/components/footer";
import Header from "@/components/header";

const SecurityPage = () => {
  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased overflow-x-hidden selection:bg-primary selection:text-background-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-16 pb-20 overflow-hidden bg-background-dark h-[92vh] items-center justify-center flex">
            <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-125 h-125 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="mx-auto max-w-300 px-6 lg:px-8 relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <span className="material-symbols-outlined text-[18px] mr-1.5">
                    verified_user
                  </span>
                  Security &amp; Compliance Center
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-text-main sm:text-6xl font-display mb-6">
                  Hospital-Grade Security for <br />
                  <span className="text-gradient">Critical Care Data</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-text-secondary max-w-2xl mx-auto">
                  Our platform is architected from the ground up to exceed
                  healthcare industry standards. We protect patient data with
                  enterprise-grade encryption, rigorous access controls, and
                  comprehensive compliance certifications.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    className="rounded-lg bg-white px-6 py-3 text-base font-bold text-gray-900 shadow-soft hover:bg-gray-200 transition-all"
                    href="#"
                  >
                    Download Security Whitepaper
                  </a>
                  <a
                    className="group text-sm font-semibold leading-6 text-text-secondary hover:text-primary transition-colors flex items-center gap-1"
                    href="#"
                  >
                    View Status Page{" "}
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Security Features Section */}
          <section className="py-24 bg-background-subtle relative border-t border-border-dark">
            <div className="mx-auto max-w-300 px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Feature 1 */}
                <div className="group relative flex flex-col items-start p-8 bg-background-card rounded-2xl border border-border-dark hover:border-primary/50 hover:shadow-glow transition-all duration-300">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                    <span className="material-symbols-outlined text-3xl">
                      lock
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main font-display mb-3">
                    Data Encryption
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    All voice data and patient records are encrypted at rest
                    using AES-256 and in transit via TLS 1.3. We utilize
                    envelope encryption with regular key rotation managed
                    through AWS KMS.
                  </p>
                  <ul className="mt-auto space-y-2 text-sm text-text-secondary font-medium">
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      AES-256 Encryption at Rest
                    </li>
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      TLS 1.3 for Transit
                    </li>
                  </ul>
                </div>

                {/* Feature 2 */}
                <div className="group relative flex flex-col items-start p-8 bg-background-card rounded-2xl border border-border-dark hover:border-primary/50 hover:shadow-glow transition-all duration-300">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
                    <span className="material-symbols-outlined text-3xl">
                      badge
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main font-display mb-3">
                    Access Control (IAM)
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Granular role-based access control (RBAC) ensures staff only
                    access necessary data. We support enterprise SSO (Okta,
                    Azure AD) and enforce Multi-Factor Authentication (MFA)
                    globally.
                  </p>
                  <ul className="mt-auto space-y-2 text-sm text-text-secondary font-medium">
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      SAML 2.0 / OIDC SSO
                    </li>
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      Enforced MFA
                    </li>
                  </ul>
                </div>

                {/* Feature 3 */}
                <div className="group relative flex flex-col items-start p-8 bg-background-card rounded-2xl border border-border-dark hover:border-primary/50 hover:shadow-glow transition-all duration-300">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                    <span className="material-symbols-outlined text-3xl">
                      health_and_safety
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main font-display mb-3">
                    HIPAA Compliance
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Our infrastructure is designed to meet HIPAA Security and
                    Privacy Rules. We sign Business Associate Agreements (BAAs)
                    with all healthcare providers to guarantee liability and
                    trust.
                  </p>
                  <ul className="mt-auto space-y-2 text-sm text-text-secondary font-medium">
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      Signed BAA Available
                    </li>
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      PHI Automatic Redaction
                    </li>
                  </ul>
                </div>

                {/* Feature 4 */}
                <div className="group relative flex flex-col items-start p-8 bg-background-card rounded-2xl border border-border-dark hover:border-primary/50 hover:shadow-glow transition-all duration-300">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20">
                    <span className="material-symbols-outlined text-3xl">
                      history_edu
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main font-display mb-3">
                    Real-time Audit Logs
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Every action within the platform is logged, immutable, and
                    searchable. Administrators gain full visibility into who
                    accessed what patient data and when, essential for
                    compliance audits.
                  </p>
                  <ul className="mt-auto space-y-2 text-sm text-text-secondary font-medium">
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      Immutable Activity Streams
                    </li>
                    <li className="flex items-center">
                      <span className="material-symbols-outlined text-primary text-[18px] mr-2">
                        check_circle
                      </span>
                      Exportable Reports (CSV/JSON)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className="py-20 bg-background-dark border-t border-border-dark">
            <div className="mx-auto max-w-300 px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl font-display">
                  Compliance Certifications
                </h2>
                <p className="mt-4 text-lg text-text-secondary">
                  We undergo rigorous third-party audits to ensure our security
                  controls meet the highest international standards.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background-card p-8 rounded-xl border border-border-dark shadow-lg hover:border-gray-600 transition-colors flex flex-col items-center text-center">
                  <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 ring-1 ring-gray-700">
                    <span className="material-symbols-outlined text-4xl text-gray-300">
                      security
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">
                    SOC 2 Type II
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Independently audited report demonstrating our commitment to
                    security, availability, and confidentiality controls.
                  </p>
                  <a
                    className="text-primary font-bold text-sm hover:text-primary-light transition-colors hover:underline"
                    href="#"
                  >
                    View Report
                  </a>
                </div>
                <div className="bg-background-card p-8 rounded-xl border border-border-dark shadow-lg hover:border-gray-600 transition-colors flex flex-col items-center text-center">
                  <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 ring-1 ring-gray-700">
                    <span className="material-symbols-outlined text-4xl text-gray-300">
                      local_hospital
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">
                    HIPAA Compliant
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Fully aligned with the Health Insurance Portability and
                    Accountability Act to safeguard Protected Health
                    Information.
                  </p>
                  <a
                    className="text-primary font-bold text-sm hover:text-primary-light transition-colors hover:underline"
                    href="#"
                  >
                    Download Letter
                  </a>
                </div>
                <div className="bg-background-card p-8 rounded-xl border border-border-dark shadow-lg hover:border-gray-600 transition-colors flex flex-col items-center text-center">
                  <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 ring-1 ring-gray-700">
                    <span className="material-symbols-outlined text-4xl text-gray-300">
                      public
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">
                    GDPR Ready
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Compliant with EU data protection requirements including
                    data processing addendums and user privacy rights.
                  </p>
                  <a
                    className="text-primary font-bold text-sm hover:text-primary-light transition-colors hover:underline"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative isolate overflow-hidden py-16 sm:py-24 bg-background-subtle border-t border-border-dark">
            <div className="mx-auto max-w-300 px-6 lg:px-8">
              <div className="rounded-3xl bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden relative isolate px-6 py-24 shadow-2xl ring-1 ring-white/10 sm:px-24 xl:py-32 text-center">
                <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] bg-size-[16px_16px]"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl font-display relative z-10">
                  Secure your patient communication today
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400 relative z-10">
                  Join leading healthcare providers who trust VoiceMed AI with
                  their most sensitive workflows.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 relative z-10">
                  <a
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-glow hover:bg-primary-dark focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                    href="#"
                  >
                    Contact Sales Team
                  </a>
                  <a
                    className="text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-primary transition-colors"
                    href="#"
                  >
                    Read our BAA <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SecurityPage;
