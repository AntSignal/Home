(function () {
  "use strict";

  const tabGroups = document.querySelectorAll("[data-tabs]");

  tabGroups.forEach((group) => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const panels = Array.from(group.querySelectorAll('[role="tabpanel"]'));

    function activateTab(tab, moveFocus) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });

      if (moveFocus) tab.focus();
    }

    const selectedTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    activateTab(selectedTab, false);

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab, false));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateTab(tab, true);
          return;
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });
  });
})();
