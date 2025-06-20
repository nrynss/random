// Performance optimizations for Bootstrap 5
// Using modern JavaScript features and best practices

// Intersection Observer for lazy loading
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            lazyLoadObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.img-lazy').forEach(img => {
        lazyLoadObserver.observe(img);
    });
});

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize search performance
const searchInput = document.querySelector('.td-search input');
if (searchInput) {
    searchInput.addEventListener('input', debounce((event) => {
        // Your search logic here
    }, 300));
}

// Optimize scroll performance
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });
});

// Optimize Bootstrap components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize dropdowns
    const dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    dropdownTriggerList.map(function (dropdownTriggerEl) {
        return new bootstrap.Dropdown(dropdownTriggerEl);
    });
});

// Optimize table performance
const tables = document.querySelectorAll('table');
tables.forEach(table => {
    if (table.offsetWidth > table.parentElement.offsetWidth) {
        table.parentElement.classList.add('table-responsive');
    }
});

// Optimize image loading
function loadImage(img) {
    if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    }
}

// Optimize code block performance
const codeBlocks = document.querySelectorAll('pre code');
codeBlocks.forEach(block => {
    block.style.contain = 'content';
    block.style.willChange = 'transform';
    block.style.transform = 'translateZ(0)';
});

// Optimize navigation performance
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.style.contain = 'layout style';
    navbar.style.willChange = 'transform';
    navbar.style.backfaceVisibility = 'hidden';
}

// Optimize sidebar performance
const sidebar = document.querySelector('.td-sidebar');
if (sidebar) {
    sidebar.style.contain = 'layout style';
    sidebar.style.willChange = 'transform';
    sidebar.style.backfaceVisibility = 'hidden';
}

// Optimize search results performance
const searchResults = document.querySelector('.td-offline-search-results');
if (searchResults) {
    searchResults.style.contain = 'content';
    searchResults.style.willChange = 'transform';
    searchResults.style.transform = 'translateZ(0)';
}

// Optimize form performance
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.style.contain = 'content';
    form.style.willChange = 'transform';
    form.style.transform = 'translateZ(0)';
});

// Optimize button performance
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.style.contain = 'content';
    button.style.willChange = 'transform';
    button.style.transform = 'translateZ(0)';
});

// Optimize card performance
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.style.contain = 'content';
    card.style.willChange = 'transform';
    card.style.transform = 'translateZ(0)';
});

// Optimize list performance
const lists = document.querySelectorAll('.list-group');
lists.forEach(list => {
    list.style.contain = 'content';
    list.style.willChange = 'transform';
    list.style.transform = 'translateZ(0)';
});

// Optimize modal performance
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    modal.style.contain = 'strict';
    modal.style.willChange = 'transform';
    modal.style.backfaceVisibility = 'hidden';
});

// Optimize dropdown performance
const dropdowns = document.querySelectorAll('.dropdown-menu');
dropdowns.forEach(dropdown => {
    dropdown.style.contain = 'content';
    dropdown.style.willChange = 'transform';
    dropdown.style.transform = 'translateZ(0)';
});

// Optimize tooltip performance
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tooltip => {
    tooltip.style.contain = 'strict';
    tooltip.style.willChange = 'transform';
    tooltip.style.backfaceVisibility = 'hidden';
});

// Optimize popover performance
const popovers = document.querySelectorAll('.popover');
popovers.forEach(popover => {
    popover.style.contain = 'strict';
    popover.style.willChange = 'transform';
    popover.style.backfaceVisibility = 'hidden';
});

// Optimize alert performance
const alerts = document.querySelectorAll('.alert');
alerts.forEach(alert => {
    alert.style.contain = 'content';
    alert.style.willChange = 'transform';
    alert.style.transform = 'translateZ(0)';
});

// Optimize badge performance
const badges = document.querySelectorAll('.badge');
badges.forEach(badge => {
    badge.style.contain = 'content';
    badge.style.willChange = 'transform';
    badge.style.transform = 'translateZ(0)';
});

// Optimize progress bar performance
const progressBars = document.querySelectorAll('.progress');
progressBars.forEach(progressBar => {
    progressBar.style.contain = 'content';
    progressBar.style.willChange = 'transform';
    progressBar.style.transform = 'translateZ(0)';
});

// Optimize spinner performance
const spinners = document.querySelectorAll('.spinner-border, .spinner-grow');
spinners.forEach(spinner => {
    spinner.style.contain = 'content';
    spinner.style.willChange = 'transform';
    spinner.style.transform = 'translateZ(0)';
});

// Optimize toast performance
const toasts = document.querySelectorAll('.toast');
toasts.forEach(toast => {
    toast.style.contain = 'strict';
    toast.style.willChange = 'transform';
    toast.style.backfaceVisibility = 'hidden';
});

// Optimize carousel performance
const carousels = document.querySelectorAll('.carousel');
carousels.forEach(carousel => {
    carousel.style.contain = 'strict';
    carousel.style.willChange = 'transform';
    carousel.style.backfaceVisibility = 'hidden';
});

// Optimize collapse performance
const collapses = document.querySelectorAll('.collapse');
collapses.forEach(collapse => {
    collapse.style.contain = 'content';
    collapse.style.willChange = 'transform';
    collapse.style.transform = 'translateZ(0)';
});

// Optimize accordion performance
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    accordion.style.contain = 'content';
    accordion.style.willChange = 'transform';
    accordion.style.transform = 'translateZ(0)';
});

// Optimize tab performance
const tabs = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.style.contain = 'content';
    tab.style.willChange = 'transform';
    tab.style.transform = 'translateZ(0)';
});

// Optimize pagination performance
const paginations = document.querySelectorAll('.pagination');
paginations.forEach(pagination => {
    pagination.style.contain = 'content';
    pagination.style.willChange = 'transform';
    pagination.style.transform = 'translateZ(0)';
});

// Optimize breadcrumb performance
const breadcrumbs = document.querySelectorAll('.breadcrumb');
breadcrumbs.forEach(breadcrumb => {
    breadcrumb.style.contain = 'content';
    breadcrumb.style.willChange = 'transform';
    breadcrumb.style.transform = 'translateZ(0)';
});

// Optimize list group performance
const listGroups = document.querySelectorAll('.list-group');
listGroups.forEach(listGroup => {
    listGroup.style.contain = 'content';
    listGroup.style.willChange = 'transform';
    listGroup.style.transform = 'translateZ(0)';
});

// Optimize card deck performance
const cardDecks = document.querySelectorAll('.card-deck');
cardDecks.forEach(cardDeck => {
    cardDeck.style.contain = 'content';
    cardDeck.style.willChange = 'transform';
    cardDeck.style.transform = 'translateZ(0)';
});

// Optimize card group performance
const cardGroups = document.querySelectorAll('.card-group');
cardGroups.forEach(cardGroup => {
    cardGroup.style.contain = 'content';
    cardGroup.style.willChange = 'transform';
    cardGroup.style.transform = 'translateZ(0)';
});

// Optimize card columns performance
const cardColumns = document.querySelectorAll('.card-columns');
cardColumns.forEach(cardColumn => {
    cardColumn.style.contain = 'content';
    cardColumn.style.willChange = 'transform';
    cardColumn.style.transform = 'translateZ(0)';
});

// Optimize jumbotron performance
const jumbotrons = document.querySelectorAll('.jumbotron');
jumbotrons.forEach(jumbotron => {
    jumbotron.style.contain = 'content';
    jumbotron.style.willChange = 'transform';
    jumbotron.style.transform = 'translateZ(0)';
});

// Optimize media object performance
const mediaObjects = document.querySelectorAll('.media');
mediaObjects.forEach(mediaObject => {
    mediaObject.style.contain = 'content';
    mediaObject.style.willChange = 'transform';
    mediaObject.style.transform = 'translateZ(0)';
});

// Optimize figure performance
const figures = document.querySelectorAll('.figure');
figures.forEach(figure => {
    figure.style.contain = 'content';
    figure.style.willChange = 'transform';
    figure.style.transform = 'translateZ(0)';
});

// Optimize embed performance
const embeds = document.querySelectorAll('.embed-responsive');
embeds.forEach(embed => {
    embed.style.contain = 'content';
    embed.style.willChange = 'transform';
    embed.style.transform = 'translateZ(0)';
});

// Optimize close button performance
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(closeButton => {
    closeButton.style.contain = 'content';
    closeButton.style.willChange = 'transform';
    closeButton.style.transform = 'translateZ(0)';
});

// Optimize code performance
const codeElements = document.querySelectorAll('code');
codeElements.forEach(codeElement => {
    codeElement.style.contain = 'content';
    codeElement.style.willChange = 'transform';
    codeElement.style.transform = 'translateZ(0)';
});

// Optimize kbd performance
const kbdElements = document.querySelectorAll('kbd');
kbdElements.forEach(kbdElement => {
    kbdElement.style.contain = 'content';
    kbdElement.style.willChange = 'transform';
    kbdElement.style.transform = 'translateZ(0)';
});

// Optimize pre performance
const preElements = document.querySelectorAll('pre');
preElements.forEach(preElement => {
    preElement.style.contain = 'content';
    preElement.style.willChange = 'transform';
    preElement.style.transform = 'translateZ(0)';
});

// Optimize samp performance
const sampElements = document.querySelectorAll('samp');
sampElements.forEach(sampElement => {
    sampElement.style.contain = 'content';
    sampElement.style.willChange = 'transform';
    sampElement.style.transform = 'translateZ(0)';
});

// Optimize var performance
const varElements = document.querySelectorAll('var');
varElements.forEach(varElement => {
    varElement.style.contain = 'content';
    varElement.style.willChange = 'transform';
    varElement.style.transform = 'translateZ(0)';
});

// Optimize mark performance
const markElements = document.querySelectorAll('mark');
markElements.forEach(markElement => {
    markElement.style.contain = 'content';
    markElement.style.willChange = 'transform';
    markElement.style.transform = 'translateZ(0)';
});

// Optimize small performance
const smallElements = document.querySelectorAll('small');
smallElements.forEach(smallElement => {
    smallElement.style.contain = 'content';
    smallElement.style.willChange = 'transform';
    smallElement.style.transform = 'translateZ(0)';
});

// Optimize strong performance
const strongElements = document.querySelectorAll('strong');
strongElements.forEach(strongElement => {
    strongElement.style.contain = 'content';
    strongElement.style.willChange = 'transform';
    strongElement.style.transform = 'translateZ(0)';
});

// Optimize em performance
const emElements = document.querySelectorAll('em');
emElements.forEach(emElement => {
    emElement.style.contain = 'content';
    emElement.style.willChange = 'transform';
    emElement.style.transform = 'translateZ(0)';
});

// Optimize abbr performance
const abbrElements = document.querySelectorAll('abbr');
abbrElements.forEach(abbrElement => {
    abbrElement.style.contain = 'content';
    abbrElement.style.willChange = 'transform';
    abbrElement.style.transform = 'translateZ(0)';
});

// Optimize dfn performance
const dfnElements = document.querySelectorAll('dfn');
dfnElements.forEach(dfnElement => {
    dfnElement.style.contain = 'content';
    dfnElement.style.willChange = 'transform';
    dfnElement.style.transform = 'translateZ(0)';
});

// Optimize cite performance
const citeElements = document.querySelectorAll('cite');
citeElements.forEach(citeElement => {
    citeElement.style.contain = 'content';
    citeElement.style.willChange = 'transform';
    citeElement.style.transform = 'translateZ(0)';
});

// Optimize q performance
const qElements = document.querySelectorAll('q');
qElements.forEach(qElement => {
    qElement.style.contain = 'content';
    qElement.style.willChange = 'transform';
    qElement.style.transform = 'translateZ(0)';
});

// Optimize blockquote performance
const blockquoteElements = document.querySelectorAll('blockquote');
blockquoteElements.forEach(blockquoteElement => {
    blockquoteElement.style.contain = 'content';
    blockquoteElement.style.willChange = 'transform';
    blockquoteElement.style.transform = 'translateZ(0)';
});

// Optimize dl performance
const dlElements = document.querySelectorAll('dl');
dlElements.forEach(dlElement => {
    dlElement.style.contain = 'content';
    dlElement.style.willChange = 'transform';
    dlElement.style.transform = 'translateZ(0)';
});

// Optimize dt performance
const dtElements = document.querySelectorAll('dt');
dtElements.forEach(dtElement => {
    dtElement.style.contain = 'content';
    dtElement.style.willChange = 'transform';
    dtElement.style.transform = 'translateZ(0)';
});

// Optimize dd performance
const ddElements = document.querySelectorAll('dd');
ddElements.forEach(ddElement => {
    ddElement.style.contain = 'content';
    ddElement.style.willChange = 'transform';
    ddElement.style.transform = 'translateZ(0)';
});

// Optimize address performance
const addressElements = document.querySelectorAll('address');
addressElements.forEach(addressElement => {
    addressElement.style.contain = 'content';
    addressElement.style.willChange = 'transform';
    addressElement.style.transform = 'translateZ(0)';
});

// Optimize hr performance
const hrElements = document.querySelectorAll('hr');
hrElements.forEach(hrElement => {
    hrElement.style.contain = 'content';
    hrElement.style.willChange = 'transform';
    hrElement.style.transform = 'translateZ(0)';
});

// Optimize table performance
const tableElements = document.querySelectorAll('table');
tableElements.forEach(tableElement => {
    tableElement.style.contain = 'content';
    tableElement.style.willChange = 'transform';
    tableElement.style.transform = 'translateZ(0)';
});

// Optimize thead performance
const theadElements = document.querySelectorAll('thead');
theadElements.forEach(theadElement => {
    theadElement.style.contain = 'content';
    theadElement.style.willChange = 'transform';
    theadElement.style.transform = 'translateZ(0)';
});

// Optimize tbody performance
const tbodyElements = document.querySelectorAll('tbody');
tbodyElements.forEach(tbodyElement => {
    tbodyElement.style.contain = 'content';
    tbodyElement.style.willChange = 'transform';
    tbodyElement.style.transform = 'translateZ(0)';
});

// Optimize tfoot performance
const tfootElements = document.querySelectorAll('tfoot');
tfootElements.forEach(tfootElement => {
    tfootElement.style.contain = 'content';
    tfootElement.style.willChange = 'transform';
    tfootElement.style.transform = 'translateZ(0)';
});

// Optimize tr performance
const trElements = document.querySelectorAll('tr');
trElements.forEach(trElement => {
    trElement.style.contain = 'content';
    trElement.style.willChange = 'transform';
    trElement.style.transform = 'translateZ(0)';
});

// Optimize th performance
const thElements = document.querySelectorAll('th');
thElements.forEach(thElement => {
    thElement.style.contain = 'content';
    thElement.style.willChange = 'transform';
    thElement.style.transform = 'translateZ(0)';
});

// Optimize td performance
const tdElements = document.querySelectorAll('td');
tdElements.forEach(tdElement => {
    tdElement.style.contain = 'content';
    tdElement.style.willChange = 'transform';
    tdElement.style.transform = 'translateZ(0)';
});

// Optimize caption performance
const captionElements = document.querySelectorAll('caption');
captionElements.forEach(captionElement => {
    captionElement.style.contain = 'content';
    captionElement.style.willChange = 'transform';
    captionElement.style.transform = 'translateZ(0)';
});

// Optimize colgroup performance
const colgroupElements = document.querySelectorAll('colgroup');
colgroupElements.forEach(colgroupElement => {
    colgroupElement.style.contain = 'content';
    colgroupElement.style.willChange = 'transform';
    colgroupElement.style.transform = 'translateZ(0)';
});

// Optimize col performance
const colElements = document.querySelectorAll('col');
colElements.forEach(colElement => {
    colElement.style.contain = 'content';
    colElement.style.willChange = 'transform';
    colElement.style.transform = 'translateZ(0)';
});

// Performance optimizations for Endor Labs documentation site

// Enhanced Search Implementation
const searchIndexLoader = {
    init() {
        // Defer search index loading
        const searchScript = document.createElement('script');
        searchScript.src = '/offline-search-index.json';
        searchScript.defer = true;
        searchScript.onload = () => {
            this.initializeSearch();
        };
        document.body.appendChild(searchScript);
    },

    initializeSearch() {
        const searchInput = document.querySelector('.td-search input');
        if (searchInput) {
            // Add loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'search-loading d-none';
            loadingIndicator.innerHTML = '<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>';
            searchInput.parentNode.appendChild(loadingIndicator);

            // Progressive search enhancement
            searchInput.addEventListener('input', this.debounce((event) => {
                const query = event.target.value.trim();
                if (query.length >= 3) { // Match offlineSearchIndexMinLength
                    this.performSearch(query, loadingIndicator);
                }
            }, 300));
        }
    },

    performSearch(query, loadingIndicator) {
        loadingIndicator.classList.remove('d-none');

        // Use Web Worker for search if available
        if (window.Worker) {
            const searchWorker = new Worker('/assets/js/search-worker.js');
            searchWorker.postMessage({ query, index: window.searchIndex });
            searchWorker.onmessage = (e) => {
                this.displayResults(e.data, loadingIndicator);
                searchWorker.terminate();
            };
        } else {
            // Fallback to main thread search
            const results = this.searchInIndex(query);
            this.displayResults(results, loadingIndicator);
        }
    },

    searchInIndex(query) {
        // Implement search logic here
        return window.searchIndex.filter(item => {
            const searchableText = `${item.title} ${item.content}`.toLowerCase();
            return searchableText.includes(query.toLowerCase());
        }).slice(0, 50); // Match offlineSearchMaxResults
    },

    displayResults(results, loadingIndicator) {
        const resultsContainer = document.querySelector('.td-offline-search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.summary}</p>
                    ${result.parentSection ? `<small>Section: ${result.parentSection}</small>` : ''}
                </div>
            `).join('');
        }
        loadingIndicator.classList.add('d-none');
    }
};

// Resource Loading Optimization
const resourceLoader = {
    init() {
        this.loadNonCriticalCSS();
        this.optimizeImages();
    },

    loadNonCriticalCSS() {
        const nonCriticalCSS = [
            '/assets/css/non-critical.css',
            '/assets/css/prism.css'
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => {
                link.media = 'all';
            };
            document.head.appendChild(link);
        });
    },

    optimizeImages() {
        const images = document.querySelectorAll('img:not(.img-lazy)');
        images.forEach(img => {
            if (img.dataset.src) {
                img.classList.add('img-lazy');
                lazyLoadObserver.observe(img);
            }
        });
    }
};

// Performance Monitoring
const performanceMonitor = {
    init() {
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();
    },

    monitorLCP() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('LCP:', entry.startTime);
                // Report to analytics if needed
            });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    },

    monitorFID() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                // Report to analytics if needed
            });
        }).observe({ entryTypes: ['first-input'] });
    },

    monitorCLS() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('CLS:', entry.value);
                // Report to analytics if needed
            });
        }).observe({ entryTypes: ['layout-shift'] });
    }
};

// Prism Syntax Highlighting Fix
const prismFix = {
    init() {
        window.addEventListener('beforeunload', () => {
            if (window.Prism) {
                window.Prism.manual = true;
                window.Prism.highlightAll = () => { };
            }
        });
    }
};

// Initialize all optimizations
document.addEventListener('DOMContentLoaded', () => {
    searchIndexLoader.init();
    resourceLoader.init();
    performanceMonitor.init();
    prismFix.init();
});