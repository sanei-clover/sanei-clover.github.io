(function($) {
    "use strict";

    let subMenu;
    let subMenuArray = [];
    let subMenuTextArray = [];

    function last(array) {
        return array[array.length - 1];
    }

    function last2(array) {
        return array[array.length - 2];
    }

    function toggleMenu() {
        const menu = document.querySelector(".menu-block");
        const overlay = document.querySelector(".menu-overlay");
        if (menu) menu.classList.toggle("active");
        if (overlay) overlay.classList.toggle("active");
    }

    function showSubMenu(hasChildren) {
        const menu = document.querySelector(".menu-block");
        const submenuAll = menu.querySelectorAll(".sub-menu");

        for (let i = 0; i < submenuAll.length; i++) {
            submenuAll[i].classList.remove("active");
        }
        subMenu = hasChildren.querySelector(".sub-menu");
        if (subMenu) {
            subMenuArray.push(subMenu.id);
            subMenu.classList.add("active");
            subMenu.style.animation = "slideLeft 0.5s ease forwards";
            const dropTrigger = hasChildren.querySelector(".drop-trigger");
            const menuTitle = dropTrigger ? dropTrigger.textContent : "";
            subMenuTextArray.push(menuTitle);

            const currentMenuTitle = menu.querySelector(".current-menu-title");
            if (currentMenuTitle) currentMenuTitle.innerHTML = menuTitle;
            
            const mobileMenuHead = menu.querySelector(".mobile-menu-head");
            if (mobileMenuHead) mobileMenuHead.classList.add("active");
        }
    }

    // Event Delegation
    $(document).on("click", ".site-menu-main", function(e) {
        const menu = document.querySelector(".menu-block");
        if (!menu || !menu.classList.contains("active")) {
            return;
        }
        if (e.target.closest(".nav-item-has-children")) {
            const hasChildren = e.target.closest(".nav-item-has-children");
            showSubMenu(hasChildren);
        }
    });

    $(document).on("click", ".go-back", function() {
        const menu = document.querySelector(".menu-block");
        const lastItem = last(subMenuArray);
        const lastItemText = last2(subMenuTextArray);
        subMenuArray.pop();
        subMenuTextArray.pop();
        if (subMenuArray.length >= 0) {
            const lastItemEl = document.getElementById(lastItem);
            if (lastItemEl) {
                lastItemEl.style.animation = "slideRight 0.5s ease forwards";
                setTimeout(() => {
                    lastItemEl.classList.remove("active");
                }, 300);
            }
            const currentMenuTitle = menu.querySelector(".current-menu-title");
            if (currentMenuTitle) currentMenuTitle.innerHTML = lastItemText;
        }
        if (subMenuArray.length == 0) {
            const mobileMenuHead = menu.querySelector(".mobile-menu-head");
            if (mobileMenuHead) mobileMenuHead.classList.remove("active");
        }
    });

    $(document).on("click", ".mobile-menu-trigger", function() {
        toggleMenu();
    });

    $(document).on("click", ".mobile-menu-close", function() {
        toggleMenu();
    });

    $(document).on("click", ".menu-overlay", function() {
        toggleMenu();
    });

    window.onresize = function() {
        const menu = document.querySelector(".menu-block");
        if (this.innerWidth > 991) {
            if (menu && menu.classList.contains("active")) {
                toggleMenu();
            }
        }
    }

})(jQuery);

