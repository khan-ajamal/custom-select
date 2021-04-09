class CustomSelect {
    constructor(selector) {
        const elements = document.querySelectorAll(selector);
        [...elements].forEach(this.render);
    }

    createItems = (option) => {
        if (!option.value) return;

        const item = document.createElement("li");
        item.dataset.value = option.value;

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("value", option.value);

        input.checked = option.selected;

        item.append(input);

        const span = document.createElement("span");
        span.innerText = option.text;

        item.append(span);

        return item;
    };

    onClickItem = (e, item, isMultiple) => {
        e.stopPropagation();

        const inputs = item.parentNode.querySelectorAll("input");
        const itemInput = item.querySelector("input");

        if (isMultiple) {
            if (e.target.nodeName == "INPUT") {
                return;
            }
            itemInput.checked = !itemInput.checked;
        } else {
            inputs.forEach((i) => {
                if (itemInput !== i) {
                    i.checked = false;
                }
            });
            if (e.target.nodeName == "INPUT") {
                return;
            }
            itemInput.checked = !itemInput.checked;
        }
    };

    populateValues = (elem) => {
        const selectedOptions = elem.parentNode.querySelectorAll(
            "input:checked"
        );
        const selectedValues = [];
        for (let o of selectedOptions.values()) {
            selectedValues.push(o.value);
        }

        [...elem.options].forEach((option) => {
            if (selectedValues.includes(option.value)) {
                option.selected = true;
            } else {
                option.selected = false;
            }
        });
    };

    render = (elem) => {
        // TODO: check if elem is select, if not throw exception
        elem.style.display = "none";

        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";

        wrapper.classList.add(...elem.classList);

        const dropdown = document.createElement("div");
        dropdown.textContent = elem.getAttribute("placeholder");

        wrapper.append(dropdown);

        // TODO: elem.children.length > 0 else throw exception

        const items = [];
        [...elem.options].forEach((option) => {
            const item = this.createItems(option);
            if (!item) return;
            item.addEventListener("click", (e) => {
                this.onClickItem(e, item, elem.multiple);
                this.populateValues(elem);
            });

            return items.push(item);
        });

        const dropdownMenu = document.createElement("ul");
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.display = "none";

        dropdown.addEventListener("click", () => {
            if (dropdownMenu.style.display === "none") {
                dropdownMenu.style.display = "block";
            } else {
                dropdownMenu.style.display = "none";
            }
        });

        dropdownMenu.append(...items);

        elem.parentNode.insertBefore(wrapper, elem);
        wrapper.append(elem);

        wrapper.append(dropdownMenu);

        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target) && e.target !== wrapper) {
                dropdownMenu.style.display = "none";
            }
        });
    };
}

export default CustomSelect;
