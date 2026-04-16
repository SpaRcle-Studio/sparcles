const tham = document.querySelector(".tham");
const button = document.querySelector<HTMLButtonElement>(".burger-button");
const navBar = document.querySelector<HTMLElement>(".nav__container");

const setExpanded = (expanded: boolean) => {
    button?.setAttribute("aria-expanded", expanded ? "true" : "false");
    button?.setAttribute("aria-controls", "primary-nav");
};

setExpanded(false);

const toggle = () => {
    if (!navBar) return;

    const nowHidden = navBar.classList.toggle("hidden");

    navBar.classList.toggle("flex");
    navBar.classList.toggle("flex-col");
    navBar.classList.toggle("items-center");
    navBar.classList.toggle("absolute");
    navBar.classList.toggle("top-20");
    navBar.classList.toggle("left-0");
    navBar.classList.toggle("w-full");

    // visual treatment for mobile flyout
    navBar.classList.toggle("glass");
    navBar.classList.toggle("py-4");
    navBar.classList.toggle("gap-2");

    setExpanded(!nowHidden);
    tham?.classList.toggle("tham-active");
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
    toggle();
});
