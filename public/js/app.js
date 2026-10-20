import { ResumePreview } from './components/ResumePreview.js';
import { ResumeViewer } from './components/ResumeViewer.js';
import { PrintResumeButton } from './components/PrintResumeButton.js';
import { DownloadResumeButton } from './components/DownloadResumeButton.js';

/**
 * Main Portfolio Application Orchestrator
 */
class PortfolioApp {
  constructor() {
    this.pdfUrl = './assets/GuruCharan_Resume.pdf';
    this.pdfFileName = 'GuruCharan_Resume.pdf';
    this.pageImages = [
      './assets/page-1.png',
      './assets/page-2.png',
      './assets/page-3.png'
    ];

    this.viewer = null;
    this.preview = null;
    this.printer = null;
    this.isInlinePreviewMounted = false;
  }

  init() {
    console.info('Initializing GuruCharan Tanneeru Portfolio Application...');

    // 1. Initialize Reusable Master PDF Components
    this.printer = new PrintResumeButton({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName
    });

    this.viewer = new ResumeViewer({
      pdfUrl: this.pdfUrl,
      pdfFileName: this.pdfFileName
    });
    document.body.appendChild(this.viewer.render());

    // 2. Wire Header & Mobile Actions
    this.initHeaderAndNav();

    // 3. Wire Resume Section Actions & In-Page Preview Toggle
    this.initResumeSection();

    // 4. Wire Contact Section Copy Handlers
    this.initContactActions();

    // 5. Active Scroll Spy & Header Blur Effect
    this.initScrollSpy();

    // 6. Dynamic Year & Global Keyboard Shortcuts
    this.initGlobalFeatures();

    console.info('Portfolio Application initialized successfully.');
  }

  initHeaderAndNav() {
    // Header Print Trigger
    const headerPrintBtn = document.getElementById('headerPrintResumeBtn');
    if (headerPrintBtn) {
      headerPrintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.printer.triggerPrint();
      });
    }

    // Mobile Print Trigger
    const mobilePrintBtn = document.getElementById('mobilePrintBtn');
    if (mobilePrintBtn) {
      mobilePrintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMobileMenu();
        this.printer.triggerPrint();
      });
    }

    // Footer Print Trigger
    const footerPrintBtn = document.getElementById('footerPrintResumeBtn');
    if (footerPrintBtn) {
      footerPrintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.printer.triggerPrint();
      });
    }

    // Mobile Hamburger Menu Toggle
    const menuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');

    if (menuToggleBtn && mobileDrawer) {
      menuToggleBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });

      // Close mobile drawer when any link is clicked
      mobileDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
    }
  }

  openMobileMenu() {
    const menuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  closeMobileMenu() {
    const menuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  initResumeSection() {
    // Section View Resume (opens full dedicated modal)
    const viewBtn = document.getElementById('sectionViewResumeBtn');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.viewer.open();
      });
    }

    // Section Print Resume
    const printBtn = document.getElementById('sectionPrintResumeBtn');
    if (printBtn) {
      printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.printer.triggerPrint();
      });
    }

    // Expandable In-Page Preview Toggle
    const toggleBtn = document.getElementById('toggleInlinePreviewBtn');
    const toggleText = document.getElementById('toggleInlinePreviewText');
    const previewContainer = document.getElementById('inlinePreviewContainer');
    const mountPoint = document.getElementById('previewMountPoint');

    if (toggleBtn && previewContainer && mountPoint) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = previewContainer.style.display === 'none';

        if (isHidden) {
          // Mount ResumePreview if not already mounted
          if (!this.isInlinePreviewMounted) {
            this.preview = new ResumePreview({
              pdfUrl: this.pdfUrl,
              pdfFileName: this.pdfFileName,
              pageImages: this.pageImages,
              onExpandClick: () => this.viewer.open()
            });
            mountPoint.appendChild(this.preview.render());
            this.isInlinePreviewMounted = true;
          }

          previewContainer.style.display = 'block';
          toggleText.textContent = 'Hide Embedded PDF Preview';
          previewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          previewContainer.style.display = 'none';
          toggleText.textContent = 'Show Embedded PDF Preview';
        }
      });
    }
  }

  initContactActions() {
    // One-Click Copy Buttons for Email and Phone
    document.querySelectorAll('.copy-btn[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // Fallback for non-HTTPS or older browsers
            const input = document.createElement('input');
            input.value = textToCopy;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
          }

          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.color = '#10b981';
          btn.style.borderColor = '#10b981';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        } catch (err) {
          console.warn('Clipboard write failed:', err);
        }
      });
    });
  }

  initScrollSpy() {
    const siteHeader = document.getElementById('siteHeader');
    const navLinks = document.querySelectorAll('.nav-desktop .nav-link');
    const sections = [
      document.getElementById('home'),
      document.getElementById('about'),
      document.getElementById('expertise'),
      document.getElementById('experience'),
      document.getElementById('projects'),
      document.getElementById('certifications'),
      document.getElementById('contact')
    ].filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Header elevation shadow
      if (siteHeader) {
        if (scrollY > 20) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }

      // Active section highlight
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }

  initGlobalFeatures() {
    // Dynamic Footer Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      // Ctrl+P / Cmd+P: Intercept to print the authoritative master PDF directly!
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        this.printer.triggerPrint();
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === 'v' || e.key === 'V') {
          this.viewer.open();
        } else if (e.key === 'Escape') {
          this.viewer.close();
          this.closeMobileMenu();
        }
      }
    });
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
