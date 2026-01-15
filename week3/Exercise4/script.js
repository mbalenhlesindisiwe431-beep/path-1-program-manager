const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Remove active from all tabs
        tabs.forEach(btn => btn.classList.remove("active"));

        // Add active to clicked tab
        tab.classList.add("active");

        // Hide all content
        contents.forEach(content => content.classList.remove("active"));

        // Show correct content
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");
    });
});