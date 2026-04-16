const tham = document.querySelector(".tham");
const button = document.querySelector<HTMLButtonElement>(".burger-button");
const navBar = document.querySelector<HTMLElement>(".nav__container");

const setExpanded = (expanded: boolean) => {
    button?.setAttribute("aria-expanded", expanded ? "true" : "false");
    button?.setAttribute("aria-controls", "primary-nav");
};

setExpanded(false);

const mobileOpenClasses = [
    "flex",
    "flex-col",
    "items-center",
    "absolute",
    "top-20",
    "left-0",
    "w-full",
    "py-4",
    "gap-2",
    "z-50",
    "mobile-nav",
];

const isOpen = () => !!navBar && !navBar.classList.contains("hidden");

const openMenu = () => {
    if (!navBar) return;
    navBar.classList.remove("hidden");
    navBar.classList.add(...mobileOpenClasses);
    setExpanded(true);
    tham?.classList.add("tham-active");
};

const closeMenu = () => {
    if (!navBar) return;
    navBar.classList.add("hidden");
    navBar.classList.remove(...mobileOpenClasses);
    setExpanded(false);
    tham?.classList.remove("tham-active");
};

const toggle = () => {
    if (!navBar) return;
    if (isOpen()) closeMenu();
    else openMenu();
};

button?.addEventListener("click", toggle);

navBar?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest("a");
    if (!link) return;
    if (!navBar || navBar.classList.contains("hidden")) return;
    toggle();
});

document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!navBar || navBar.classList.contains("hidden")) return;
    closeMenu();
});

window.addEventListener("resize", () => {
    const desktop = window.matchMedia("(min-width: 640px)").matches;
    if (desktop) closeMenu();
});
