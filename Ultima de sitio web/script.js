/* ==========================================================
   ECOSV — APPLICATION
   Vanilla JavaScript ES6+
========================================================== */


/* ==========================================================
   APP STATE
========================================================== */

const AppState = {

    currentSection: "inicio",

    challengeStarted: false,

    challengeProgress: 0,

    charts: {},

    currentPeriod: "2024"

};


/* ==========================================================
   DOM
========================================================== */

const DOM = {

    sections:
        document.querySelectorAll(".page-section"),

    navItems:
        document.querySelectorAll(".nav-item"),

    navTriggers:
        document.querySelectorAll(".nav-trigger"),

    sidebar:
        document.getElementById("sidebar"),

    sidebarOverlay:
        document.getElementById("sidebarOverlay"),

    sidebarClose:
        document.getElementById("sidebarClose"),

    mobileMenu:
        document.getElementById("mobileMenu"),

    breadcrumb:
        document.getElementById("breadcrumbCurrent"),

    themeToggle:
        document.getElementById("themeToggle"),

    periodFilter:
        document.getElementById("periodFilter"),

    challengeButton:
        document.getElementById("challengeButton"),

    challengePercent:
        document.getElementById("challengePercent"),

    challengeProgress:
        document.getElementById("challengeProgress"),

    modal:
        document.getElementById("researchModal"),

    modalOverlay:
        document.getElementById("modalOverlay"),

    modalClose:
        document.getElementById("modalClose"),

    modalCloseAction:
        document.querySelector(".modal-close-action"),

    modalTitle:
        document.getElementById("modalTitle"),

    modalDescription:
        document.getElementById("modalDescription"),

    loader:
        document.getElementById("loader")

};


/* ==========================================================
   DATA
========================================================== */

/*
 * DATOS DEMOSTRATIVOS
 *
 * Estos valores sirven exclusivamente para visualizar
 * el funcionamiento del Dashboard.
 *
 * Sustituir por datos oficiales antes de una publicación
 * académica definitiva.
 */

const dashboardData = {

    2024: {

        kpis: {
            water: 72,
            waste: 64,
            forest: 48,
            air: 57
        },

        trend: [
            54,
            58,
            56,
            63,
            61,
            68,
            72,
            70,
            74,
            69,
            73,
            72
        ],

        pollution: [
            34,
            26,
            18,
            22
        ],

        impact: [
            72,
            57,
            48,
            64
        ]

    },


    2023: {

        kpis: {
            water: 68,
            waste: 60,
            forest: 51,
            air: 54
        },

        trend: [
            50,
            53,
            55,
            59,
            57,
            63,
            66,
            64,
            69,
            66,
            68,
            68
        ],

        pollution: [
            31,
            27,
            20,
            22
        ],

        impact: [
            68,
            54,
            51,
            60
        ]

    },


    2022: {

        kpis: {
            water: 64,
            waste: 56,
            forest: 55,
            air: 51
        },

        trend: [
            47,
            49,
            52,
            55,
            53,
            58,
            62,
            60,
            64,
            61,
            63,
            64
        ],

        pollution: [
            29,
            28,
            21,
            22
        ],

        impact: [
            64,
            51,
            55,
            56
        ]

    }

};


/* ==========================================================
   SECTION NAMES
========================================================== */

const sectionNames = {

    "inicio":
        "Inicio",

    "marco-teorico":
        "Marco teórico",

    "nosotros":
        "Sobre nosotros",

    "dashboard":
        "Dashboard",

    "investigaciones":
        "Investigaciones",

    "resultados":
        "Resultados",

    "propuestas":
        "Propuestas",

    "delimitaciones":
        "Delimitaciones",

    "referencias":
        "Referencias"

};


/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

    }
);


function initializeApp() {

    setupNavigation();

    setupMobileMenu();

    setupTheme();

    setupDashboard();

    setupChallenge();

    setupResearchModal();

    setupKeyboardNavigation();

    setupRevealObserver();

    setTimeout(
        hideLoader,
        700
    );

}


/* ==========================================================
   LOADER
========================================================== */

function hideLoader() {

    if (!DOM.loader) return;

    DOM.loader.classList.add("hidden");

}


/* ==========================================================
   NAVIGATION
========================================================== */

function setupNavigation() {

    DOM.navItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const section =
                        item.dataset.section;

                    navigateTo(section);

                }
            );

        }
    );


    DOM.navTriggers.forEach(
        trigger => {

            trigger.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const section =
                        trigger.dataset.section;

                    if (section) {

                        navigateTo(section);

                    }

                }
            );

        }
    );

}


function navigateTo(sectionId) {

    const target =
        document.getElementById(sectionId);

    if (!target) return;


    AppState.currentSection =
        sectionId;


    DOM.sections.forEach(
        section => {

            section.classList.remove("active");

        }
    );


    target.classList.add("active");


    DOM.navItems.forEach(
        item => {

            item.classList.toggle(
                "active",
                item.dataset.section === sectionId
            );

        }
    );


    DOM.breadcrumb.textContent =
        sectionNames[sectionId] || "EcoSV";


    closeMobileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "dashboard") {

        setTimeout(
            () => {

                resizeCharts();

            },
            100
        );

    }

}


/* ==========================================================
   MOBILE MENU
========================================================== */

function setupMobileMenu() {

    DOM.mobileMenu?.addEventListener(
        "click",
        openMobileMenu
    );

    DOM.sidebarClose?.addEventListener(
        "click",
        closeMobileMenu
    );

    DOM.sidebarOverlay?.addEventListener(
        "click",
        closeMobileMenu
    );

}


function openMobileMenu() {

    DOM.sidebar.classList.add("open");

    DOM.sidebarOverlay.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function closeMobileMenu() {

    DOM.sidebar.classList.remove("open");

    DOM.sidebarOverlay.classList.remove("open");

    document.body.style.overflow =
        "";

}


/* ==========================================================
   THEME
========================================================== */

function setupTheme() {

    const savedTheme =
        localStorage.getItem("ecosv-theme");


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        updateThemeIcon();

    }


    DOM.themeToggle?.addEventListener(
        "click",
        toggleTheme
    );

}


function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );


    const isLight =
        document.body.classList.contains(
            "light-mode"
        );


    localStorage.setItem(
        "ecosv-theme",
        isLight
            ? "light"
            : "dark"
    );


    updateThemeIcon();

}


function updateThemeIcon() {

    if (!DOM.themeToggle) return;


    const icon =
        DOM.themeToggle.querySelector("i");


    const isLight =
        document.body.classList.contains(
            "light-mode"
        );


    icon.className =
        isLight
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

}


/* ==========================================================
   DASHBOARD
========================================================== */

function setupDashboard() {

    if (!DOM.periodFilter) return;


    DOM.periodFilter.addEventListener(
        "change",
        event => {

            AppState.currentPeriod =
                event.target.value;

            updateDashboard(
                AppState.currentPeriod
            );

        }
    );


    initializeCharts();

}


function initializeCharts() {

    if (
        typeof Chart === "undefined"
    ) {

        console.warn(
            "Chart.js no está disponible."
        );

        return;

    }


    createEnvironmentChart();

    createPollutionChart();

    createImpactChart();


    updateDashboard(
        AppState.currentPeriod
    );

}


/* ==========================================================
   CHART — ENVIRONMENT
========================================================== */

function createEnvironmentChart() {

    const canvas =
        document.getElementById(
            "environmentChart"
        );


    if (!canvas) return;


    const context =
        canvas.getContext("2d");


    const gradient =
        context.createLinearGradient(
            0,
            0,
            0,
            280
        );


    gradient.addColorStop(
        0,
        "rgba(53,211,154,.30)"
    );


    gradient.addColorStop(
        1,
        "rgba(53,211,154,0)"
    );


    AppState.charts.environment =
        new Chart(
            context,
            {

                type: "line",

                data: {

                    labels: [
                        "Ene",
                        "Feb",
                        "Mar",
                        "Abr",
                        "May",
                        "Jun",
                        "Jul",
                        "Ago",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dic"
                    ],

                    datasets: [
                        {

                            label:
                                "Presión ambiental",

                            data:
                                dashboardData["2024"].trend,

                            borderColor:
                                "#35d39a",

                            backgroundColor:
                                gradient,

                            borderWidth: 2,

                            fill: true,

                            tension: .42,

                            pointRadius: 2,

                            pointHoverRadius: 5,

                            pointBackgroundColor:
                                "#35d39a",

                            pointBorderWidth: 0

                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        intersect: false,

                        mode: "index"

                    },

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            backgroundColor:
                                "#0b211a",

                            titleColor:
                                "#f4faf7",

                            bodyColor:
                                "#8fa9a0",

                            borderColor:
                                "rgba(53,211,154,.2)",

                            borderWidth: 1,

                            padding: 10,

                            displayColors: false

                        }

                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {

                                color:
                                    "#69887e",

                                font: {
                                    size: 8
                                }

                            }

                        },

                        y: {

                            beginAtZero: true,

                            max: 100,

                            grid: {

                                color:
                                    "rgba(255,255,255,.05)"

                            },

                            ticks: {

                                color:
                                    "#69887e",

                                font: {
                                    size: 8
                                }

                            }

                        }

                    }

                }

            }
        );

}


/* ==========================================================
   CHART — POLLUTION
========================================================== */

function createPollutionChart() {

    const canvas =
        document.getElementById(
            "pollutionChart"
        );


    if (!canvas) return;


    AppState.charts.pollution =
        new Chart(
            canvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "Agua",
                        "Aire",
                        "Suelo",
                        "Residuos"
                    ],

                    datasets: [

                        {

                            data:
                                dashboardData["2024"].pollution,

                            backgroundColor: [
                                "#35d39a",
                                "#61b9ff",
                                "#f4c95d",
                                "#9b8cff"
                            ],

                            borderWidth: 0,

                            hoverOffset: 5

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "70%",

                    plugins: {

                        legend: {

                            position: "bottom",

                            labels: {

                                color:
                                    "#8fa9a0",

                                padding: 15,

                                boxWidth: 8,

                                boxHeight: 8,

                                font: {
                                    size: 8
                                }

                            }

                        },

                        tooltip: {

                            backgroundColor:
                                "#0b211a",

                            padding: 10,

                            displayColors: true

                        }

                    }

                }

            }
        );

}


/* ==========================================================
   CHART — IMPACT
========================================================== */

function createImpactChart() {

    const canvas =
        document.getElementById(
            "impactChart"
        );


    if (!canvas) return;


    AppState.charts.impact =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels: [
                        "Agua",
                        "Aire",
                        "Bosques",
                        "Residuos"
                    ],

                    datasets: [

                        {

                            label:
                                "Índice",

                            data:
                                dashboardData["2024"].impact,

                            backgroundColor:
                                "#35d39a",

                            borderRadius: 5,

                            borderSkipped: false

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            backgroundColor:
                                "#0b211a",

                            padding: 10,

                            displayColors: false

                        }

                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {

                                color:
                                    "#69887e",

                                font: {
                                    size: 8
                                }

                            }

                        },

                        y: {

                            beginAtZero: true,

                            max: 100,

                            grid: {

                                color:
                                    "rgba(255,255,255,.05)"

                            },

                            ticks: {

                                color:
                                    "#69887e",

                                font: {
                                    size: 8
                                }

                            }

                        }

                    }

                }

            }
        );

}


/* ==========================================================
   UPDATE DASHBOARD
========================================================== */

function updateDashboard(period) {

    const data =
        dashboardData[period];


    if (!data) return;


    updateKPI(
        "kpiWater",
        data.kpis.water
    );

    updateKPI(
        "kpiWaste",
        data.kpis.waste
    );

    updateKPI(
        "kpiForest",
        data.kpis.forest
    );

    updateKPI(
        "kpiAir",
        data.kpis.air
    );


    if (AppState.charts.environment) {

        AppState.charts.environment.data
            .datasets[0].data =
            data.trend;

        AppState.charts.environment
            .update();

    }


    if (AppState.charts.pollution) {

        AppState.charts.pollution.data
            .datasets[0].data =
            data.pollution;

        AppState.charts.pollution
            .update();

    }


    if (AppState.charts.impact) {

        AppState.charts.impact.data
            .datasets[0].data =
            data.impact;

        AppState.charts.impact
            .update();

    }

}


function updateKPI(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) return;


    animateNumber(
        element,
        value
    );


    const progress =
        element
            .closest(".kpi-card")
            ?.querySelector(
                ".kpi-progress span"
            );


    if (progress) {

        progress.style.width =
            `${value}%`;

    }

}


/* ==========================================================
   NUMBER ANIMATION
========================================================== */

function animateNumber(
    element,
    target
) {

    const start =
        Number(
            element.textContent
        ) || 0;


    const duration = 500;

    const startTime =
        performance.now();


    function update(
        currentTime
    ) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                start +
                (target - start) *
                eased
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


/* ==========================================================
   RESIZE CHARTS
========================================================== */

function resizeCharts() {

    Object.values(
        AppState.charts
    ).forEach(
        chart => {

            chart?.resize();

        }
    );

}


/* ==========================================================
   CHALLENGE
========================================================== */

function setupChallenge() {

    if (!DOM.challengeButton) return;


    DOM.challengeButton.addEventListener(
        "click",
        startChallenge
    );

}


function startChallenge() {

    if (
        AppState.challengeStarted
    ) {

        advanceChallenge();

        return;

    }


    AppState.challengeStarted =
        true;

    AppState.challengeProgress =
        14;


    updateChallengeUI();


    DOM.challengeButton.innerHTML =
        `
            <i class="fa-solid fa-check"></i>
            Completar día
        `;

}


function advanceChallenge() {

    AppState.challengeProgress +=
        14;


    if (
        AppState.challengeProgress >= 100
    ) {

        AppState.challengeProgress =
            100;


        DOM.challengeButton.innerHTML =
            `
                <i class="fa-solid fa-circle-check"></i>
                Reto completado
            `;

        DOM.challengeButton.disabled =
            true;

    }


    updateChallengeUI();

}


function updateChallengeUI() {

    const progress =
        AppState.challengeProgress;


    DOM.challengePercent.textContent =
        `${progress}%`;


    DOM.challengeProgress.style.width =
        `${progress}%`;

}


/* ==========================================================
   RESEARCH MODAL
========================================================== */

function setupResearchModal() {

    const researchButtons =
        document.querySelectorAll(
            ".research-card .read-more"
        );


    const researchData = {

        "Urbanización":
            "El crecimiento urbano puede incrementar la demanda de transporte, agua, energía, infraestructura y servicios de gestión de residuos. El análisis debe considerar el contexto específico de cada territorio.",

        "Tratamiento de aguas":
            "El tratamiento adecuado de aguas residuales es un componente importante de la gestión hídrica. La investigación debe identificar las fuentes, condiciones de descarga y sistemas existentes.",

        "Actividad industrial":
            "Las actividades industriales pueden generar diferentes tipos de emisiones y residuos. Los controles ambientales, la tecnología y el cumplimiento de normas son elementos relevantes para el análisis.",

        "Manejo de residuos":
            "La gestión de residuos comprende prevención, reducción, separación, almacenamiento, recolección, tratamiento, valorización y disposición final.",

        "Salud pública":
            "La exposición a determinados contaminantes puede asociarse con riesgos para la salud. El efecto depende de factores como tipo de contaminante, concentración, duración y vía de exposición.",

        "Enfermedades transmitidas por vectores":
            "Las condiciones ambientales pueden influir en el hábitat de determinados vectores. La relación debe analizarse considerando factores climáticos, sociales y sanitarios.",

        "Biodiversidad":
            "La transformación y contaminación de los ecosistemas puede modificar hábitats y afectar las relaciones entre especies. La intensidad del impacto depende del ecosistema y del contaminante.",

        "Impacto social y económico":
            "Los problemas ambientales pueden generar costos relacionados con salud, infraestructura, productividad, restauración y calidad de vida."

    };


    researchButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".research-card"
                        );


                    const title =
                        card.querySelector(
                            "h3"
                        ).textContent.trim();


                    const description =
                        researchData[title] ||
                        "Información de investigación disponible para este módulo.";


                    openModal(
                        title,
                        description
                    );

                }
            );

        }
    );


    DOM.modalClose?.addEventListener(
        "click",
        closeModal
    );


    DOM.modalOverlay?.addEventListener(
        "click",
        closeModal
    );


    DOM.modalCloseAction?.addEventListener(
        "click",
        closeModal
    );

}


function openModal(
    title,
    description
) {

    DOM.modalTitle.textContent =
        title;

    DOM.modalDescription.textContent =
        description;


    DOM.modal.classList.add(
        "open"
    );


    DOM.modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    DOM.modal.classList.remove(
        "open"
    );


    DOM.modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* ==========================================================
   KEYBOARD
========================================================== */

function setupKeyboardNavigation() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

                closeMobileMenu();

            }

        }
    );

}


/* ==========================================================
   REVEAL OBSERVER
========================================================== */

function setupRevealObserver() {

    /*
     * Observer preparado para añadir
     * animaciones de entrada a componentes
     * dinámicos en futuras versiones.
     */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    document
        .querySelectorAll(
            ".impact-card, .theory-card, .research-card, .finding-card"
        )
        .forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

}


/* ==========================================================
   WINDOW RESIZE
========================================================== */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                resizeCharts,
                150
            );

    }
);


/* ==========================================================
   BROWSER HISTORY
========================================================== */

window.addEventListener(
    "popstate",
    () => {

        const section =
            window.location.hash
                .replace("#", "");


        if (
            section &&
            sectionNames[section]
        ) {

            navigateTo(
                section
            );

        }

    }
);


/* ==========================================================
   INITIAL HASH
========================================================== */

function loadInitialSection() {

    const hash =
        window.location.hash
            .replace("#", "");


    if (
        hash &&
        sectionNames[hash]
    ) {

        navigateTo(hash);

    }

}


loadInitialSection();


/* ==========================================================
   OPTIONAL HASH UPDATE
========================================================== */

document.addEventListener(
    "click",
    event => {

        const trigger =
            event.target.closest(
                ".nav-item, .nav-trigger"
            );


        if (!trigger) return;


        const section =
            trigger.dataset.section;


        if (
            section &&
            sectionNames[section]
        ) {

            history.replaceState(
                null,
                "",
                `#${section}`
            );

        }

    }
);


/* ==========================================================
   END ECOSV
========================================================== */