/* ================================================================
   ASK JACEY — IB MASTERCLASS · SHARED JS  v3
   ================================================================ */

/* ── LOGO ── */
const LOGO_SM = `<svg width="110" height="28" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Keyhole-in-circle mark -->
  <circle cx="14" cy="14" r="12" stroke="#C9A84C" stroke-width="1.4" fill="none"/>
  <circle cx="14" cy="11" r="3.5" fill="#C9A84C" opacity="0.9"/>
  <path d="M11.5 13.5 L11.5 18 L16.5 18 L16.5 13.5 Z" fill="#C9A84C" opacity="0.9"/>
  <path d="M12.5 16 L12.5 18 L15.5 18 L15.5 16 Z" fill="#0a0a0a"/>
  <!-- Key below circle -->
  <circle cx="14" cy="22.5" r="2.2" stroke="#C9A84C" stroke-width="1" fill="none"/>
  <!-- Wordmark -->
  <text x="32" y="11" font-family="'Libre Baskerville',Georgia,serif" font-size="9.5" fill="#C9A84C" letter-spacing="0.16em" font-weight="700">ASK</text>
  <line x1="31" y1="14" x2="108" y2="14" stroke="#C9A84C" stroke-width="0.4" opacity="0.35"/>
  <text x="32" y="23" font-family="'Libre Baskerville',Georgia,serif" font-size="9.5" fill="#F5F4F0" letter-spacing="0.12em" font-weight="700">JACEY</text>
</svg>`;

/* ── SHARED HEADER HTML ── */
function buildEcoHeader() {
  return `<div id="eco-header">
    <span class="eco-label">Jacey Ecosystem</span>
    <div class="eco-brands">
      <span class="eco-brand"><strong>JaceyTrayd</strong> · Private Credit · Debt Strategies · Capital Management</span>
      <span class="eco-brand"><strong>Ask Jacey</strong> · Personal Finance Q&A · Investment Banking Training</span>
      <span class="eco-brand"><strong>JaceyLang</strong> · Thinking · Communication · Learning Systems</span>
    </div>
  </div>`;
}

function buildHeader() {
  return `<header id="main-header">
    <a href="index.html" class="logo-area">
      ${LOGO_SM}
      <div class="brand-title">
        <span class="brand-main">Investment Banking Masterclass</span>
        <span class="brand-sub">by Ask Jacey</span>
      </div>
    </a>
    <div class="header-right">
      <button id="menu-toggle" onclick="toggleSidebar()">☰</button>
    </div>
  </header>`;
}

/* ── SIDEBAR ── */
const LEVELS = [
  { id:0,  label:'Orientation',          file:'level-0.html',  live:true  },
  { id:1,  label:'Foundations',          file:'level-1.html',  live:true  },
  { id:2,  label:'Accounting',           file:'level-2.html',  live:true  },
  { id:3,  label:'Valuation',            file:'level-3.html',  live:true  },
  { id:4,  label:'Modelling',            file:'level-4.html',  live:true  },
  { id:5,  label:'M&A',                  file:'level-5.html',  live:true  },
  { id:6,  label:'Capital Markets',      file:'level-6.html',  live:true  },
  { id:7,  label:'Derivatives',          file:'level-7.html',  live:true  },
  { id:8,  label:'Private Markets',      file:'level-8.html',  live:true  },
  { id:9,  label:'Deal Execution',       file:'level-9.html',  live:true  },
  { id:10, label:'Careers',             file:'level-10.html', live:true  },
  { id:11, label:'Advanced',            file:'level-11.html', live:true  },
];

function buildSidebar(activeLevelId) {
  const links = LEVELS.map(l => `
    <a href="${l.file}" class="${l.id === activeLevelId ? 'active' : ''}">
      <span class="sb-num">${String(l.id).padStart(2,'0')}</span>
      ${l.label}
      ${!l.live ? '<span class="sb-badge">Soon</span>' : ''}
    </a>`).join('');
  return `<nav id="sidebar">
    <div class="sb-section">
      <div class="sb-section-label">Platform</div>
      <a href="index.html" ${activeLevelId === -1 ? 'class="active"' : ''}>
        <span class="sb-num">—</span> Home
      </a>
    </div>
    <div class="sb-divider"></div>
    <div class="sb-section">
      <div class="sb-section-label">Levels</div>
      ${links}
    </div>
  </nav>
  <div id="sidebar-overlay" onclick="toggleSidebar()"></div>`;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}

/* ================================================================
   QUIZ ENGINE
   ================================================================ */
class QuizEngine {
  constructor(questions, containerId) {
    this.questions = questions;
    this.container = document.getElementById(containerId);
    this.current = 0;
    this.score = 0;
    this.answered = new Array(questions.length).fill(false);
    this.render();
  }

  render() {
    if (!this.container) return;
    const q = this.questions[this.current];
    const pct = (this.current / this.questions.length * 100).toFixed(0);
    this.container.innerHTML = `
      <div class="quiz-wrapper">
        <div class="quiz-progress">
          <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${pct}%"></div></div>
          <span class="quiz-counter">Q${this.current+1} of ${this.questions.length}</span>
          <span class="quiz-score-badge">Score: ${this.score}/${this.questions.length}</span>
        </div>
        <div class="quiz-card">
          <div class="quiz-q-num">Question ${this.current + 1}</div>
          <div class="quiz-question">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-opt" data-idx="${i}" onclick="window._quiz.answer(${i})">
                <span class="opt-letter">${String.fromCharCode(65+i)}</span>
                <span>${opt}</span>
              </button>`).join('')}
          </div>
          <div class="quiz-feedback" id="qfb">
            <div class="fb-label">Explanation</div>
            <p>${q.explanation}</p>
          </div>
        </div>
        <div class="quiz-nav">
          <button class="btn btn-ghost" onclick="window._quiz.prev()" ${this.current===0?'disabled':''}>← Back</button>
          <button class="btn btn-outline" id="qnext" onclick="window._quiz.next()" style="display:none">
            ${this.current===this.questions.length-1 ? 'See Results →' : 'Next Question →'}
          </button>
        </div>
      </div>`;
    window._quiz = this;
  }

  answer(idx) {
    if (this.answered[this.current]) return;
    this.answered[this.current] = true;
    const q = this.questions[this.current];
    const opts = document.querySelectorAll('.quiz-opt');
    opts.forEach(o => o.classList.add('disabled'));
    opts[idx].classList.add(idx === q.correct ? 'correct' : 'wrong');
    if (idx !== q.correct) opts[q.correct].classList.add('correct');
    if (idx === q.correct) this.score++;
    document.getElementById('qfb').classList.add('show');
    document.getElementById('qnext').style.display = 'inline-flex';
    document.querySelector('.quiz-score-badge').textContent = `Score: ${this.score}/${this.questions.length}`;
  }

  next() {
    if (this.current === this.questions.length - 1) { this.showResult(); }
    else { this.current++; this.render(); }
  }
  prev() { if (this.current > 0) { this.current--; this.render(); } }

  showResult() {
    const pct = Math.round(this.score / this.questions.length * 100);
    const msg = pct>=80 ? 'Excellent — solid grasp of this material. Proceed to the next level.'
              : pct>=60 ? 'Good foundation. Review explanations for any missed questions.'
                        : 'Keep building. Re-read the lesson content, then retry.';
    this.container.innerHTML = `
      <div class="quiz-wrapper">
        <div class="quiz-result show">
          <div class="score-num">${pct}%</div>
          <div class="score-label">${this.score} of ${this.questions.length} correct</div>
          <p class="score-msg">${msg}</p>
          <div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap">
            <button class="btn btn-outline" onclick="window._quiz.restart()">Restart Quiz</button>
          </div>
        </div>
      </div>`;
  }

  restart() {
    this.current = 0; this.score = 0;
    this.answered = new Array(this.questions.length).fill(false);
    this.render();
  }
}

/* ================================================================
   SOLVER ENGINE  — fully rewritten, step-by-step reveal
   ================================================================ */
class SolverEngine {
  constructor(problem, steps, answer, containerId) {
    this.problem   = problem;
    this.steps     = steps;
    this.answer    = answer;
    this.cid       = containerId;
    this.revealed  = 0;          // how many steps currently shown
    this._render();
  }

  _render() {
    const el = document.getElementById(this.cid);
    if (!el) return;

    /* Build step HTML — all hidden by default via inline style */
    const stepsHtml = this.steps.map((s, i) => `
      <div class="step-item" id="si-${i}" style="display:none;opacity:0;transform:translateY(10px);transition:opacity 0.3s ease,transform 0.3s ease;">
        <div class="step-dot">${i+1}</div>
        <div class="step-body">
          <div class="step-label">Step ${i+1} of ${this.steps.length}</div>
          <h4>${s.title}</h4>
          <p>${s.body}</p>
          ${s.formula ? `<div class="step-formula">${s.formula.replace(/\n/g,'<br/>')}</div>` : ''}
        </div>
      </div>`).join('');

    el.innerHTML = `
      <div class="solver-wrapper">
        <div class="solver-problem">
          <div class="sp-label">Problem</div>
          <h3>${this.problem.title}</h3>
          <div class="sp-given">${this.problem.given.replace(/\n/g,'<br/>')}</div>
        </div>

        <div class="solver-hint-bar" id="hint-bar" style="margin:1rem 0 0.5rem;">
          <span style="font-family:var(--mono);font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ash);">
            ${this.steps.length} steps hidden — click <strong style="color:var(--gold-light)">Reveal Next Step</strong> to work through the solution
          </span>
        </div>

        <div class="steps-track" id="steps-track" style="margin-top:0.5rem;">
          ${stepsHtml}
        </div>

        <div class="final-answer" id="fa-box" style="display:none;opacity:0;transition:opacity 0.35s ease;">
          <div class="fa-label">✓ Final Answer</div>
          <div class="fa-value">${this.answer.value}</div>
          <p class="fa-note">${this.answer.note}</p>
        </div>

        <div class="solver-controls" style="margin-top:1.2rem;">
          <button class="btn btn-gold" id="rev-btn" onclick="window['_sv_${this.cid}'].revealNext()">
            Reveal Step 1 of ${this.steps.length} →
          </button>
          <button class="btn btn-ghost" onclick="window['_sv_${this.cid}'].reset()" style="margin-left:0.5rem">↺ Reset</button>
          <button class="btn btn-ghost" onclick="window['_sv_${this.cid}'].revealAll()" style="margin-left:0.5rem">Show All</button>
        </div>
      </div>`;

    window[`_sv_${this.cid}`] = this;

    /* Re-show any already-revealed steps immediately (no animation) */
    for (let i = 0; i < this.revealed; i++) this._show(i, false);
    if (this.revealed >= this.steps.length) this._finalize();
  }

  _show(idx, animate = true) {
    const el = document.getElementById(`si-${idx}`);
    if (!el) return;
    el.style.display = 'flex';
    if (animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity  = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    } else {
      el.style.opacity  = '1';
      el.style.transform = 'translateY(0)';
    }
  }

  _finalize() {
    const fa = document.getElementById('fa-box');
    if (fa) { fa.style.display = 'block'; requestAnimationFrame(() => { fa.style.opacity = '1'; }); }
    const btn = document.getElementById('rev-btn');
    if (btn) { btn.textContent = '✓ All Steps Revealed'; btn.disabled = true; btn.className = 'btn btn-ghost'; }
    const hb = document.getElementById('hint-bar');
    if (hb) hb.style.display = 'none';
  }

  revealNext() {
    if (this.revealed >= this.steps.length) return;
    this._show(this.revealed, true);
    this.revealed++;
    const btn = document.getElementById('rev-btn');
    if (this.revealed >= this.steps.length) {
      /* small delay so the last step animates before the answer appears */
      setTimeout(() => this._finalize(), 350);
    } else {
      if (btn) btn.textContent = `Reveal Step ${this.revealed + 1} of ${this.steps.length} →`;
      /* scroll the new step into view */
      setTimeout(() => {
        const el = document.getElementById(`si-${this.revealed - 1}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  revealAll() {
    for (let i = this.revealed; i < this.steps.length; i++) this._show(i, false);
    this.revealed = this.steps.length;
    this._finalize();
  }

  reset() {
    this.revealed = 0;
    this._render();
  }
}

/* ================================================================
   INTERVIEW ACCORDION
   ================================================================ */
function buildInterviewItem(item, idx) {
  const typeLabel = { tech:'Technical', beh:'Behavioral', deal:'Deal Context' };
  return `
    <div class="iq-item" id="iq-${idx}" data-type="${item.type}">
      <div class="iq-header" onclick="toggleIQ(${idx})">
        <span class="iq-q">${item.question}</span>
        <span class="iq-type ${item.type}">${typeLabel[item.type] || item.type}</span>
        <span class="iq-arrow">▾</span>
      </div>
      <div class="iq-body">
        <div class="iq-answer">${item.answer}</div>
        ${item.tip ? `<div class="iq-tip"><strong>Banker's tip:</strong> ${item.tip}</div>` : ''}
      </div>
    </div>`;
}

function toggleIQ(idx) {
  document.getElementById(`iq-${idx}`).classList.toggle('open');
}

function filterIQ(type) {
  document.querySelectorAll('.iq-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.iq-item').forEach(item => {
    item.style.display = (type === 'all' || item.dataset.type === type) ? 'block' : 'none';
  });
}
