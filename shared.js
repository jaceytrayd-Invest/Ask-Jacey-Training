/* ================================================================
   ASK JACEY — IB MASTERCLASS · SHARED JS
   ================================================================ */

/* ── LOGO SVG ── */
const LOGO_SM = `<svg width="88" height="26" viewBox="0 0 88 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="13" width="14" height="10" rx="2" fill="none" stroke="#C9A84C" stroke-width="1.2"/>
  <path d="M3 13 L3 8 Q3 4 8 4 Q13 4 13 8" stroke="#C9A84C" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <circle cx="8" cy="18.5" r="2" stroke="#C9A84C" stroke-width="1" fill="none"/>
  <line x1="8" y1="20.5" x2="8" y2="22.5" stroke="#C9A84C" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M19 7 Q19 4 22 4 Q25 4 25 7 Q25 9.5 22 10.5 L22 12" stroke="#C9A84C" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <circle cx="22" cy="14" r="0.8" fill="#C9A84C"/>
  <circle cx="30" cy="19" r="3.5" fill="none" stroke="#C9A84C" stroke-width="1.1"/>
  <line x1="33.5" y1="19" x2="41" y2="19" stroke="#C9A84C" stroke-width="1.1" stroke-linecap="round"/>
  <line x1="39" y1="19" x2="39" y2="21" stroke="#C9A84C" stroke-width="1" stroke-linecap="round"/>
  <line x1="37" y1="19" x2="37" y2="20.5" stroke="#C9A84C" stroke-width="1" stroke-linecap="round"/>
  <text x="48" y="11" font-family="'Cormorant Garamond',serif" font-size="10" fill="#C9A84C" letter-spacing="0.1em" font-weight="500">ASK</text>
  <text x="48" y="22" font-family="'Cormorant Garamond',serif" font-size="10" fill="#F5F4F0" letter-spacing="0.06em" font-weight="300">JACEY</text>
  <line x1="47" y1="14.5" x2="87" y2="14.5" stroke="#C9A84C" stroke-width="0.5" opacity="0.4"/>
</svg>`;

/* ── SHARED HEADER + SIDEBAR HTML ── */
function buildEcoHeader() {
  return `
  <div id="eco-header">
    <span class="eco-label">Jacey Ecosystem</span>
    <div class="eco-brands">
      <span class="eco-brand"><strong>JaceyTrayd</strong> · Private Credit · Debt Strategies · Capital Management</span>
      <span class="eco-brand"><strong>Ask Jacey</strong> · Personal Finance Q&A · Investment Banking Training</span>
      <span class="eco-brand"><strong>JaceyLang</strong> · Thinking · Communication · Learning Systems</span>
    </div>
  </div>`;
}

function buildHeader() {
  return `
  <header id="main-header">
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

const LEVELS = [
  { id: 0, label: 'Orientation', file: 'level-0.html' },
  { id: 1, label: 'Foundations', file: 'level-1.html' },
  { id: 2, label: 'Accounting', file: 'level-2.html' },
  { id: 3, label: 'Valuation', file: 'level-3.html' },
  { id: 4, label: 'Modelling', file: 'level-4.html' },
  { id: 5, label: 'M&A', file: 'level-5.html' },
  { id: 6, label: 'Capital Markets', file: 'level-6.html' },
  { id: 7, label: 'Derivatives', file: 'level-7.html' },
  { id: 8, label: 'Private Markets', file: 'level-8.html' },
  { id: 9, label: 'Deal Execution', file: 'level-9.html' },
  { id: 10, label: 'Careers', file: 'level-10.html' },
  { id: 11, label: 'Advanced', file: 'level-11.html' },
];

function buildSidebar(activeLevelId) {
  const links = LEVELS.map(l => `
    <a href="${l.file}" class="${l.id === activeLevelId ? 'active' : ''}">
      <span class="sb-num">${String(l.id).padStart(2,'0')}</span>
      ${l.label}
      ${l.id <= 1 ? '' : '<span class="sb-badge">Soon</span>'}
    </a>`).join('');
  return `
  <nav id="sidebar">
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

/* ── QUIZ ENGINE ── */
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
    const pct = ((this.current) / this.questions.length * 100).toFixed(0);

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
          <button class="btn btn-ghost" onclick="window._quiz.prev()" ${this.current === 0 ? 'disabled' : ''}>← Back</button>
          <button class="btn btn-outline" id="qnext" onclick="window._quiz.next()" style="display:none">
            ${this.current === this.questions.length - 1 ? 'See Results →' : 'Next Question →'}
          </button>
        </div>
        <div class="quiz-result" id="qresult"></div>
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
    if (this.current === this.questions.length - 1) {
      this.showResult();
    } else {
      this.current++;
      this.render();
    }
  }

  prev() {
    if (this.current > 0) { this.current--; this.render(); }
  }

  showResult() {
    const pct = Math.round(this.score / this.questions.length * 100);
    let msg = pct >= 80
      ? 'Excellent — you have a solid grasp of this material. Proceed to the next level.'
      : pct >= 60
        ? 'Good foundation. Review the explanations for any questions you missed.'
        : 'Keep building. Re-read the lesson content, then retry the quiz.';
    this.container.innerHTML = `
      <div class="quiz-wrapper">
        <div class="quiz-progress">
          <div class="quiz-bar"><div class="quiz-bar-fill" style="width:100%"></div></div>
          <span class="quiz-counter">Complete</span>
          <span class="quiz-score-badge">Final: ${this.score}/${this.questions.length}</span>
        </div>
        <div class="quiz-result show">
          <div class="score-num">${pct}%</div>
          <div class="score-label">${this.score} of ${this.questions.length} correct</div>
          <p class="score-msg">${msg}</p>
          <div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap">
            <button class="btn btn-outline" onclick="window._quiz.restart()">Restart Quiz</button>
            <a href="#" class="btn btn-gold" id="next-level-btn">Next Level →</a>
          </div>
        </div>
      </div>`;
  }

  restart() {
    this.current = 0;
    this.score = 0;
    this.answered = new Array(this.questions.length).fill(false);
    this.render();
  }
}

/* ── SOLVER ENGINE ── */
class SolverEngine {
  constructor(problem, steps, answer, containerId) {
    this.problem = problem;
    this.steps = steps;
    this.answer = answer;
    this.container = document.getElementById(containerId);
    this.revealed = 0;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="solver-wrapper">
        <div class="solver-problem">
          <div class="sp-label">Problem</div>
          <h3>${this.problem.title}</h3>
          <div class="sp-given">${this.problem.given}</div>
        </div>
        <div class="steps-track" id="steps-track">
          ${this.steps.map((s, i) => `
            <div class="step-item" id="step-${i}">
              <div class="step-dot">${i+1}</div>
              <div class="step-body">
                <div class="step-label">Step ${i+1}</div>
                <h4>${s.title}</h4>
                <p>${s.body}</p>
                ${s.formula ? `<div class="step-formula">${s.formula}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
        <div class="final-answer" id="final-answer">
          <div class="fa-label">Final Answer</div>
          <div class="fa-value">${this.answer.value}</div>
          <p class="fa-note">${this.answer.note}</p>
        </div>
        <div class="solver-controls">
          <button class="btn btn-outline" id="reveal-btn" onclick="window._solver.revealNext()">
            Reveal Step ${this.revealed + 1} →
          </button>
          <button class="btn btn-ghost" onclick="window._solver.reset()">Reset</button>
        </div>
      </div>`;
    window._solver = this;
    // show already-revealed steps
    for (let i = 0; i < this.revealed; i++) {
      const el = document.getElementById(`step-${i}`);
      if (el) el.classList.add('revealed');
    }
    if (this.revealed >= this.steps.length) {
      document.getElementById('final-answer').classList.add('show');
      document.getElementById('reveal-btn').textContent = 'All Steps Revealed ✓';
      document.getElementById('reveal-btn').disabled = true;
    }
  }

  revealNext() {
    if (this.revealed < this.steps.length) {
      const el = document.getElementById(`step-${this.revealed}`);
      if (el) el.classList.add('revealed');
      this.revealed++;
    }
    if (this.revealed >= this.steps.length) {
      document.getElementById('final-answer').classList.add('show');
      document.getElementById('reveal-btn').textContent = 'All Steps Revealed ✓';
      document.getElementById('reveal-btn').disabled = true;
    } else {
      document.getElementById('reveal-btn').textContent = `Reveal Step ${this.revealed + 1} →`;
    }
  }

  reset() {
    this.revealed = 0;
    this.render();
  }
}

/* ── INTERVIEW ACCORDION ── */
function buildInterviewItem(item, idx) {
  return `
    <div class="iq-item" id="iq-${idx}" data-type="${item.type}">
      <div class="iq-header" onclick="toggleIQ(${idx})">
        <span class="iq-q">${item.question}</span>
        <span class="iq-type ${item.type}">${item.type === 'tech' ? 'Technical' : item.type === 'beh' ? 'Behavioral' : 'Deal'}</span>
        <span class="iq-arrow">▾</span>
      </div>
      <div class="iq-body">
        <div class="iq-answer">${item.answer}</div>
        ${item.tip ? `<div class="iq-tip"><strong>Banker's tip:</strong> ${item.tip}</div>` : ''}
      </div>
    </div>`;
}

function toggleIQ(idx) {
  const item = document.getElementById(`iq-${idx}`);
  item.classList.toggle('open');
}

function filterIQ(type) {
  document.querySelectorAll('.iq-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.iq-item').forEach(item => {
    item.style.display = (type === 'all' || item.dataset.type === type) ? 'block' : 'none';
  });
}
