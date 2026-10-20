/**
 * ResumeHero Component
 * Displays candidate identity, verified contact info, professional summary,
 * and core competencies strictly derived from the master resume PDF.
 */
export class ResumeHero {
  constructor(options = {}) {
    this.container = options.container || null;
    this.candidate = {
      name: 'GuruCharan Tanneeru, PMP®',
      title: 'AI Implementation | Technical Program Management | API Integrations',
      location: 'Vijayawada, Andhra Pradesh, India',
      phone: '+91 7995162550',
      email: 'guru.charan.tanneeru@gmail.com',
      website: 'gurucharan.dev',
      websiteUrl: 'https://gurucharan.dev',
      linkedin: 'linkedin.com/in/gurucharan-dev',
      linkedinUrl: 'https://linkedin.com/in/gurucharan-dev',
      summary: `PMP®-certified technology professional specializing in B2B client implementation, technical program management, and AI/API workflow solutions. Proven track record of translating complex client requirements into scalable digital architectures, governing end-to-end delivery lifecycles, and driving user adoption across enterprise and SaaS environments.`,
      summaryBullets: [
        {
          label: 'Client Implementation & Onboarding',
          text: 'Lead client discovery, workflow mapping, and post-sales delivery across enterprise business units and external client organizations; establish structured delivery governance, UAT milestones, and go-live readiness.'
        },
        {
          label: 'API & Systems Integration',
          text: 'Architect and deploy robust REST API integrations, webhooks, automated payment reconciliation (Razorpay), and enterprise collaboration workflows across Smartsheet, JIRA, and Confluence.'
        },
        {
          label: 'AI Solutions & Workflow Automation',
          text: 'Hands-on implementation of enterprise document intelligence (OCR/classification), Gemini API integrations, and accelerated prototyping using Google Antigravity and Claude Code.'
        },
        {
          label: 'Executive Communication & Alignment',
          text: 'Bridge technical and non-technical stakeholders by translating complex architectural decisions, API constraints, and data flows into clear business outcomes and actionable executive visibility.'
        }
      ],
      capabilities: [
        'Client Implementation & Delivery (Requirements Discovery, UAT Governance)',
        'Program Management & Governance (PMP® Methodologies, Milestone Tracking)',
        'API & Systems Integration (REST APIs, JSON, Webhooks, Razorpay, Automated Reconciliation)',
        'AI Implementation & Automation (Gemini API, Document Intelligence OCR, Claude Code, MCP)',
        'SaaS & Collaboration (Smartsheet Control Center, JIRA, Confluence, GitHub)',
        'Data & Analytics (SQL, MySQL, MongoDB, pandas, Alteryx Designer, Excel Modeling)',
        'Application Development (JavaScript, React, Node.js, Python, Java, PM2)',
        'Diagnostics & Client Enablement (Functional UAT, API Diagnostics, Health Endpoints)'
      ]
    };
  }

  render() {
    const section = document.createElement('section');
    section.className = 'hero-section';
    section.id = 'overview';
    section.setAttribute('aria-label', 'Candidate Overview and Executive Summary');

    section.innerHTML = `
      <div class="hero-container">
        <header class="hero-header">
          <div class="hero-pill-badge">
            <span class="indicator-dot"></span>
            <span>Available for AI Implementation & Technical Program Management</span>
          </div>
          
          <h1 class="hero-name">${this.candidate.name}</h1>
          <p class="hero-title">${this.candidate.title}</p>
          
          <div class="hero-contacts" aria-label="Verified Contact Information">
            <div class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${this.candidate.location}</span>
            </div>

            <div class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href="tel:${this.candidate.phone.replace(/\s+/g, '')}">${this.candidate.phone}</a>
            </div>

            <div class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:${this.candidate.email}">${this.candidate.email}</a>
            </div>

            <div class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <a href="${this.candidate.websiteUrl}" target="_blank" rel="noopener noreferrer">${this.candidate.website}</a>
            </div>

            <div class="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <a href="${this.candidate.linkedinUrl}" target="_blank" rel="noopener noreferrer">${this.candidate.linkedin}</a>
            </div>
          </div>
        </header>

        <!-- Dynamic Action Bar Placeholder -->
        <div id="heroActionBarContainer"></div>

        <div class="hero-overview">
          <div class="summary-card">
            <h2>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Professional Summary
            </h2>
            <p>${this.candidate.summary}</p>

            <div style="margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
              ${this.candidate.summaryBullets.map(b => `
                <div style="font-size: 0.885rem; color: var(--slate-700); line-height: 1.55;">
                  <strong style="color: var(--navy-900);">${b.label}:</strong> ${b.text}
                </div>
              `).join('')}
            </div>

            <div class="core-tags" aria-label="Core Competencies">
              ${this.candidate.capabilities.map(cap => `<span class="core-tag">${cap}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    return section;
  }
}
