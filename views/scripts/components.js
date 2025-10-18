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


//Scroll Button Functionality
// Get reference to the button
const scrollBtn = document.getElementById('scrollTopBtn');

// Show or hide button based on scroll position
  window.addEventListener('scroll', () => {
    // Show button if user has scrolled down more than 300px
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollBtn.classList.add('opacity-100');
    } else {
      scrollBtn.classList.remove('opacity-100');
      scrollBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  });
// Scroll smoothly to top when button is clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

