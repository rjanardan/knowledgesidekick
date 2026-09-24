/* ============================================================
   knowledgesidekick.com — shared nav builder (v2)
   Single source of truth for the grouped dropdown nav.
   Matching filenames to what is actually on disk.
   ============================================================ */

(() => {
  'use strict';

  const NAV = {
    logoHref: '/',
    logoText: { name: 'Knowledge Sidekick', tag: 'knowledge for agentic AI' },
    groups: [
      {
        label: 'Agents',
        open: false,
        items: [
          { label: 'Agents',           href: '/agents.html',              local: true },
          { label: 'LLMs',             href: '/llms.html',                local: true },
          { label: 'MCP',              href: '/mcp.html',                 local: true },
          { label: 'Tool use',         href: '/tool-use.html',            local: true },
          { label: 'Computer use',     href: '/computer-use.html',        local: true }
        ]
      },
      {
        label: 'Enterprise',
        open: false,
        items: [
          { label: 'Agentic AI',         href: '/enterprise-agentic-ai.html',  local: true },
          { label: 'A2A Communication',  href: '/a2a-communication.html',      local: true },
          { label: 'Context Engineering', href: '/context-engineering.html',     local: true },
          { label: 'Token Savings',       href: '/token-savings.html',          local: true },
          { label: 'Grounding',           href: '/grounding.html',              local: true },
          { label: 'Knowledge Lifecycle', href: '/knowledge-lifecycle.html',     local: true }
        ]
      },
      {
        label: 'Personal Assistants',
        open: false,
        items: [
          { label: 'Overview',                     href: '/personal-assistant.html',         local: true },
          { label: 'Memory',                       href: '/pa-memory.html',                  local: true },
          {
            label: 'Privacy, Control & Compliance',
            href: '/pa-privacy-compliance.html',
            local: true
          }
        ]
      },
      {
        label: 'Offering',
        open: false,
        items: [
          { label: 'Overview',                        href: '/offering-overview.html',   local: true },
          { label: 'Training',                        href: '/offering-training.html',   local: true },
          {
            label: 'Knowledge Maturity Evaluation',
            href: '/offering-maturity.html',
            local: true
          },
          { label: 'Knowledge Lifecycle',             href: '/offering-lifecycle.html',  local: true },
          { label: 'Knowledge Formats',               href: '/offering-formats.html',    local: true },
          {
            label: 'Knowledge Audits & Benchmarks',
            href: '/offering-audits.html',
            local: true
          },
          { label: 'Advisory',                        href: '/offering-advisory.html',   local: true },
          { label: 'AEO',                             href: '/offering-aeo.html',         local: true }
        ]
      },
      {
        label: 'Reach',
        open: false,
        items: [
          {
            label: 'Org',
            href: 'https://knowledgesidekick.org',
            local: false,
            target: '_blank'
          },
          {
            label: 'Community',
            href: 'https://meetup.com/darling-meetup',
            local: false,
            target: '_blank'
          },
          { label: 'Contact', href: '/contact.html', local: true }
        ]
      }
    ]
  };

  // ---- helpers ----
  const escAttr = s => {
    if (typeof s !== 'string') return '';
    return s.replace(/[&>"']/g, ch => ({
      '&': '&amp;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  };

  function navToggleHTML(group) {
    const id = 'nav-toggle-' + group.label.replace(/\s+/g, '-');
    const expanded = group.open ? 'true' : 'false';
    return `<button class="nav-toggle" id="${escAttr(id)}"
            aria-expanded="${expanded}" aria-haspopup="true">
            <span>${escAttr(group.label)}</span>
            <span class="arrow" aria-hidden="true">▾</span>
          </button>`;
  }

  function dropdownHTML(group) {
    const id = 'nav-dropdown-' + group.label.replace(/\s+/g, '-');
    let rows = '';
    group.items.forEach((it, i) => {
      const target = it.target || '';
      const ext = it.local === false ? ' nav-ext' : '';
      const tAttr = target ? ` target="${escAttr(target)}" rel="noopener"` : '';
      const mark = it.local === false ? '<span class="ext-mark" aria-hidden="true">↗</span>' : '';
      rows += `<a href="${escAttr(it.href)}"${tAttr} class="${ext.trim()}">${escAttr(it.label)}${mark}</a>`;
    });
    return `<div class="nav-dropdown" id="${escAttr(id)}" role="menu"
            aria-labelledby="${escAttr('nav-toggle-' + group.label.replace(/\s+/g, '-'))}">${rows}</div>`;
  }

  function buildNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    let html = '';
    NAV.groups.forEach(g => {
      html += `<div class="nav-group">${navToggleHTML(g)}${dropdownHTML(g)}</div>`;
    });
    nav.innerHTML = html;

    // ---- mobile open/close ----
    const menuBtn = document.getElementById('menu-toggle');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const open = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('open', !open);
      });
    }
    document.querySelectorAll('.nav-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.nav-group');
        if (!group) return;
        const open = group.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  // ---- current-page highlight (best-effort) ----
  function highlightCurrent() {
    const pathname = window.location.pathname
      .replace(/\/index\.html$/, '/')
      .replace(/\/$/, '') || '/';
    const map = new Map();
    NAV.groups.forEach(g =>
      g.items.forEach(it => {
        if (it.local) map.set(
          it.href.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/',
          it.label
        );
      })
    );
    map.set('/', 'Home');
    document.querySelectorAll('.nav-dropdown a').forEach(a => {
      const href = (a.getAttribute('href') || '')
        .replace(/\/index\.html$/, '/')
        .replace(/\/$/, '') || '/';
      a.classList.toggle('current', href === pathname);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      buildNav();
      highlightCurrent();
    });
  } else {
    buildNav();
    highlightCurrent();
  }
})();
