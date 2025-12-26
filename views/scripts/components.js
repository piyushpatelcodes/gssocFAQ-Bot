// ========================================
// SKELETON LOADER UTILITIES
// ========================================

/**
 * Shows skeleton loader and hides content
 * @param {string} skeletonId - ID of the skeleton loader element
 * @param {string} contentId - ID of the content element
 */
function showSkeleton(skeletonId, contentId) {
  const skeleton = document.getElementById(skeletonId);
  const content = document.getElementById(contentId);
  
  if (skeleton) {
    skeleton.style.display = 'flex';
  }
  if (content) {
    content.classList.add('skeleton-hidden');
  }
}

/**
 * Hides skeleton loader and shows content with fade-in animation
 * @param {string} skeletonId - ID of the skeleton loader element
 * @param {string} contentId - ID of the content element
 */
function hideSkeleton(skeletonId, contentId) {
  const skeleton = document.getElementById(skeletonId);
  const content = document.getElementById(contentId);
  
  if (skeleton) {
    skeleton.style.display = 'none';
  }
  if (content) {
    content.classList.remove('skeleton-hidden');
    content.classList.add('content-loaded');
  }
}

/**
 * Simulates a delay (useful for demonstrating skeleton loaders)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize skeleton loaders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Show skeletons initially
  showSkeleton('faq-skeleton', 'faq-content');
  showSkeleton('features-skeleton', 'features-content');
  
  // Hide feature skeletons after a short delay (simulating page load)
  // Features are static content, so they load quickly
  setTimeout(() => {
    hideSkeleton('features-skeleton', 'features-content');
  }, 800);
});

class Dropdown {
    constructor(selector, onChange) {
        this.dropdown = document.querySelector(selector)
        this.toggleButton = this.dropdown.querySelector('.dropdown-toggle')
        this.onChange = onChange

        this.defaultText = this.toggleButton.querySelector("span").innerText

        this.menu = this.dropdown.querySelector('.dropdown-menu')
        
        this.selectItem = this.selectItem.bind(this)
        this.toggleButton.addEventListener('click', this.toggleDropdown.bind(this))
        document.addEventListener('click', this.closeDropdown.bind(this))

        this.lists = this.dropdown.querySelectorAll('li')
        this.lists.forEach(e => {
            e.addEventListener("click", () => this.selectItem(e))}
        )

        this.value = ""

        this.dropDownInput = this.dropdown.querySelector(".dropdown-input")

    }
  
    toggleDropdown() {
        this.menu.style.display = (this.menu.style.display === 'block') ? 'none' : 'block'
    }

    selectItem(ele){

        const selectedInput = this.toggleButton.querySelector(".dropdown-select-text")
        const selectIcon =  this.toggleButton.querySelector(".dropdown-select-icon")

        this.value = ele.querySelector(".dropdown-text").innerText.trim()

        if (selectIcon && ele.querySelector(".dropdown-menu-icon")){
            selectIcon.style.visibility = ""
            selectIcon.setAttribute("src", ele.querySelector(".dropdown-menu-icon").src)
            selectIcon.setAttribute("alt", ele.innerText)
        }else{
            selectIcon.style.visibility = "hidden"
        }

        selectedInput.innerText = ele.querySelector(".dropdown-text").innerText.trim()
        
        if(this.dropDownInput)
            this.dropDownInput.value = this.value

        if (this.onChange){
            this.onChange(this.value)
        }

        this.closeDropdown()

    }

    closeDropdown(event) {
        if (event === undefined || !this.dropdown.contains(event.target)) {
            this.menu.style.display = 'none'
        }
        document.removeEventListener('click', this.closeDropdown.bind(this))
    }
}


class Prompt{

    constructor(target){
        this.playground = document.querySelector(target)

        this.promptWindow = this.playground.querySelector(".prompt-container")
        
        this.chatModel = "gpt 4o"

        this.promptList = []

        this.answer = this.answer.bind(this)
        this.addPrompt = this.addPrompt.bind(this)
        this.setAIModel = this.setAIModel.bind(this)

    }

    setAIModel(model){
        // console.log("model: ", model)
        this.chatModel = model.toLowerCase()
    }

    addPrompt(msg){

        if (this.promptList.length === 0)
            this.promptWindow.innerHTML = ""

        this.promptList.push(msg)

        const text = document.createElement("div")

        text.classList.add("tw-w-fit", "tw-ml-auto", "tw-p-2", "tw-rounded-xl", 
                            "tw-bg-gray-100", "dark:tw-bg-[#171717]")
        text.innerText = msg

        const promptELement = `
            <div class="tw-w-full tw-flex tw-p-2">
                ${text.outerHTML.toString()}
            </div>
        `

        this.promptWindow.innerHTML += promptELement

        setTimeout(() => {
            this.promptWindow.scrollTop = this.promptWindow.scrollHeight
        }, 150)

        setTimeout(this.answer, 100)
    }

    answer(){

        let msg = {
            "gpt 4o": "Hello from GSSOC FAQ Bot, add bot to server to use it.",
            "gemini": "Hello from GSSOC FAQ Bot, add bot to server to use it.",
            "llama 3": "Hello from GSSOC FAQ Bot, add bot to server to use it.",
            "claude": "Hello from GSSOC FAQ Bot, add bot to server to use it.",
        }[this.chatModel]

        const text = document.createElement("div")
        text.classList.add("tw-w-fit", "tw-mr-auto", "tw-p-2")
        text.innerText = msg

        const promptELement = `
            <div class="tw-w-full tw-flex tw-p-2">
                ${text.outerHTML.toString()}
            </div>
        `
        this.promptWindow.innerHTML += promptELement

    }

}
// Load FAQs dynamically from faqs.json and show on homepage

// Load FAQs dynamically from faqs.json and show on homepage
// Load FAQs dynamically from faqs.json and show on homepage
// Load FAQs dynamically from faqs.json and render with search & toggle
// Dynamically load FAQs and implement search + toggle
// Load FAQs dynamically from faqs.json and render them
// Insert BEFORE fetch('/faqs.json')...
fetch('/faqs.json')
  .then(res => res.json())
  .then(faqs => {
    const container = document.getElementById('faq-section');
    if (!container) return;

    // Determine system theme
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply dynamic styles using CSS variables
    const cssVars = `
      :root {
        --faq-bg: ${isDark ? '#121212' : '#f9f9f9'};
        --faq-border: ${isDark ? '#333' : '#ddd'};
        --faq-heading: ${isDark ? '#ffffff' : '#111'};
        --faq-text: ${isDark ? '#ccc' : '#333'};
        --faq-box: ${isDark ? '#1e1e1e' : '#ffffff'};
        --faq-input-bg: ${isDark ? '#2a2a2a' : '#ffffff'};
        --faq-input-color: ${isDark ? '#f0f0f0' : '#222'};
      }
    `;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = cssVars;
    document.head.appendChild(styleTag);

    // FAQ HTML Structure
    container.innerHTML = `
      <section style="background: var(--faq-bg); padding: 2rem; border-radius: 12px;">
        <h2 style="
          font-size: 2rem;
          text-align: center;
          color: var(--faq-heading);
          margin-bottom: 1.5rem;
          font-weight: 700;
        ">
          📋 Frequently Asked Questions
        </h2>
        <input
          type="text"
          id="faq-search"
          placeholder="🔍 Search FAQs..."
          style="
            width: 100%;
            padding: 12px 16px;
            font-size: 1rem;
            margin-bottom: 1.5rem;
            border: 1px solid var(--faq-border);
            border-radius: 8px;
            background-color: var(--faq-input-bg);
            color: var(--faq-input-color);
            outline: none;
            transition: 0.2s ease;
          "
        />
        <div id="faq-list" style="color: var(--faq-text);"></div>
      </section>
    `;

    const faqList = document.getElementById('faq-list');
    const searchInput = document.getElementById('faq-search');

    function renderFAQs(data) {
      if (data.length === 0) {
        faqList.innerHTML = `<p style="text-align:center; opacity: 0.6;">No FAQs found.</p>`;
        return;
      }

      faqList.innerHTML = data.map(faq => `
        <div style="
          background: var(--faq-box);
          border: 1px solid var(--faq-border);
          border-radius: 10px;
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
        ">
          <h4 style="margin-bottom: 0.5rem;">❓ ${faq.question}</h4>
          <details>
            <summary style="
              cursor: pointer;
              font-weight: 500;
              color: var(--faq-heading);
              margin-bottom: 0.5rem;
            ">
              Show Answer
            </summary>
            <div style="padding-top: 0.5rem; color: var(--faq-text);">
              ${faq.answer}
            </div>
          </details>
        </div>
      `).join('');
    }

    renderFAQs(faqs.slice(0, 5)); // Load initial FAQs
    
    // Hide skeleton loader after FAQ data is loaded
    setTimeout(() => {
      hideSkeleton('faq-skeleton', 'faq-content');
    }, 600); // Small delay for smooth transition

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      const filtered = faqs.filter(f =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
      );
      renderFAQs(filtered);
    });
  })
  .catch(err => {
    console.error('FAQ loading failed:', err);
    
    // Hide skeleton and show error
    hideSkeleton('faq-skeleton', 'faq-content');
    
    const container = document.getElementById('faq-section');
    if (container) {
      container.innerHTML = `<p style="color:red; text-align:center;">Error loading FAQs. Please try again later.</p>`;
    }
  });

// FAQ suggestions for chat input
;(function(){
  let faqsCache = [];
  fetch('/faqs.json').then(r=>r.json()).then(data=>{ faqsCache = data; console.debug('faqsCache loaded', faqsCache.length) }).catch((e)=>{ console.debug('faqs load failed', e) })

  const promptForm = document.querySelector('#prompt-form');
  if (!promptForm) return;
  const input = promptForm.querySelector('input[name="prompt"]');
  const suggestionsBox = document.getElementById('faq-suggestions');
  if (!input || !suggestionsBox) return;

  // Move suggestions box to document.body to avoid overflow/z-index clipping
  try {
    if (suggestionsBox.parentElement !== document.body) {
      document.body.appendChild(suggestionsBox);
    }
  } catch (e) {
    console.debug('Could not move suggestionsBox to body', e);
  }

    // Ensure visible styling (inline styles to match previous behavior)
    suggestionsBox.style.position = 'absolute';
    suggestionsBox.style.background = getComputedStyle(document.body).color ? '#fff' : '#0b0b0b';
    suggestionsBox.style.color = '#111';
    suggestionsBox.style.boxShadow = '0 8px 24px rgba(15,23,42,0.12)';
    suggestionsBox.style.border = '1px solid rgba(0,0,0,0.08)';
    suggestionsBox.style.borderRadius = '8px';
    suggestionsBox.style.padding = '4px 4px';
    suggestionsBox.style.zIndex = '99999';

  function positionSuggestions(){
    const rect = input.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    suggestionsBox.style.left = `${rect.left + scrollLeft}px`;
    suggestionsBox.style.top = `${rect.bottom + scrollTop + 6}px`;
    suggestionsBox.style.width = `${rect.width}px`;
    // ensure max height fits viewport
    const maxH = Math.min(window.innerHeight - rect.bottom - 24, 320);
    suggestionsBox.style.maxHeight = `${maxH}px`;
  }

  // initial position and on resize/scroll
  positionSuggestions();
  window.addEventListener('resize', positionSuggestions);
  window.addEventListener('scroll', positionSuggestions, true);
  const promptContainer = document.getElementById('prompt-container');

  let activeIndex = -1;
  let currentMatches = [];

  function hideSuggestions(){ suggestionsBox.style.display='none'; activeIndex=-1 }
  function showSuggestions(){ suggestionsBox.style.display='block' }

  function renderSuggestions(list){
    console.debug('renderSuggestions', list.length)
    if(!list || list.length===0){ suggestionsBox.innerHTML = '<div style="padding:8px;color:#666">No suggestions</div>'; showSuggestions(); return }
  suggestionsBox.innerHTML = list.map((f,i)=>`<div class="faq-suggestion-item" data-idx="${i}" style="padding:8px;cursor:pointer;border-bottom:1px solid rgba(0,0,0,0.05);white-space:normal">${escapeHtml(f.question)}</div>`).join('')
    showSuggestions();
    // attach click handlers
    suggestionsBox.querySelectorAll('.faq-suggestion-item').forEach(el=>{
      el.addEventListener('click', ()=>{
        const idx = Number(el.getAttribute('data-idx'))
        selectSuggestion(idx)
      })
    })
  }

  function escapeHtml(s){ return String(s||'').replace(/[&<>\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])) }

  function selectSuggestion(i){
    const faq = currentMatches[i];
    if(!faq) return;
    // insert user message bubble
    const userDiv = document.createElement('div');
    userDiv.className = 'tw-w-full tw-flex tw-p-2';
    userDiv.innerHTML = `<div class="tw-w-fit tw-ml-auto tw-p-2 tw-rounded-xl tw-bg-gray-100 dark:tw-bg-[#171717]">${escapeHtml(faq.question)}</div>`;
    promptContainer.appendChild(userDiv);
    // insert answer bubble
    const botDiv = document.createElement('div');
    botDiv.className = 'tw-w-full tw-flex tw-p-2';
    botDiv.innerHTML = `<div class="tw-w-fit tw-mr-auto tw-p-2">${faq.answer}</div>`;
    promptContainer.appendChild(botDiv);
    promptContainer.scrollTop = promptContainer.scrollHeight;
    // clear input and hide suggestions
    input.value = '';
    hideSuggestions();
  }

  input.addEventListener('input', (e)=>{
    const q = input.value.trim().toLowerCase();
    if (!q){ hideSuggestions(); return }
    currentMatches = faqsCache.filter(f=> f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)).slice(0,8)
    renderSuggestions(currentMatches)
  })

  // Remove debug overlay and focus-fallback for production use

  input.addEventListener('keydown', (e)=>{
    const items = suggestionsBox.querySelectorAll('.faq-suggestion-item');
    if(e.key === 'ArrowDown'){
      e.preventDefault(); activeIndex = Math.min(activeIndex+1, items.length-1); highlight(items, activeIndex)
    }else if(e.key === 'ArrowUp'){
      e.preventDefault(); activeIndex = Math.max(activeIndex-1, 0); highlight(items, activeIndex)
    }else if(e.key === 'Enter'){
      if(activeIndex >=0 && activeIndex < currentMatches.length){ e.preventDefault(); selectSuggestion(activeIndex) }
    }else if(e.key === 'Escape'){
      hideSuggestions()
    }
  })

  function highlight(items, idx){ items.forEach((it,i)=>{ it.style.background = (i===idx)?'#eef2ff':'transparent' }) }

  // click outside to hide
  document.addEventListener('click', (ev)=>{ if (!promptForm.contains(ev.target)) hideSuggestions() })

  // also if the form is submitted manually, try to match exact question and show answer
  promptForm.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const q = input.value.trim();
    if(!q) return;
    const exact = faqsCache.find(f=> f.question.toLowerCase() === q.toLowerCase());
    if(exact){
      // simulate selection
      currentMatches = [exact];
      selectSuggestion(0);
      return;
    }
    // fallback: add user message and generic reply
    const userDiv = document.createElement('div');
    userDiv.className = 'tw-w-full tw-flex tw-p-2';
    userDiv.innerHTML = `<div class="tw-w-fit tw-ml-auto tw-p-2 tw-rounded-xl tw-bg-gray-100 dark:tw-bg-[#171717]">${escapeHtml(q)}</div>`;
    promptContainer.appendChild(userDiv);
    const botDiv = document.createElement('div');
    botDiv.className = 'tw-w-full tw-flex tw-p-2';
    botDiv.innerHTML = `<div class="tw-w-fit tw-mr-auto tw-p-2">No matching FAQ found. Try selecting one from suggestions.</div>`;
    promptContainer.appendChild(botDiv);
    promptContainer.scrollTop = promptContainer.scrollHeight;
    input.value = '';
  })

})();
