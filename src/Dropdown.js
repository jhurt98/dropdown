import { useState, useRef } from "react";
import useDetectOutsideDiv from "./useDetectOutsideDiv.js";

function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selections, setSelections] = useState([]);

    const customStyle = props.customStyle ? props.customStyle : {};

    function handleOpenDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    function handleSetSelections(value) {
        let newSelections = [...selections];
        let newSelectedValue = "";
        if (props.multi) {
            let index = newSelections.indexOf(value);
            if (index > -1) {
                newSelections.splice(index, 1);
            } else {
                newSelections.push(value);
            }
            newSelectedValue = newSelections.join(", ");
        } else {
            newSelections[0] = value;
            newSelectedValue = newSelections[0];
            setIsOpen(!isOpen);
        }
        setSelections(newSelections);
        props.handleSelect(newSelectedValue);

        if (props.handleSetAllSelections) {
            props.handleSetAllSelections(newSelections);
        }
    }

    function handleSelectAll() {
        let newSelections = [...props.options];
        let newSelectedValue = newSelections.join(", ");
        setSelections(newSelections);
        props.handleSelect(newSelectedValue);
        if (props.handleSetAllSelections) {
            props.handleSetAllSelections(newSelections);
        }
    }

    function handleDeselectAll() {
        let newSelections = [];
        let newSelectedValue = "";
        setSelections(newSelections);
        props.handleSelect(newSelectedValue);
        if (props.handleSetAllSelections) {
            props.handleSetAllSelections(newSelections);
        }
        setIsOpen(!isOpen);
    }

    function buildOptions() {
        const selectAll = props.multi ? (
            <Option
                handleSelect={handleSelectAll}
                key={"all"}
                value={"Select all"}
                selected={selections.length === props.options.length}
                customStyle={customStyle}
            />
        ) : null;

        const deselectAllText = props.multi ? "Deselect All" : "Deselect";
        const deselectAll = (
            <Option
                handleSelect={handleDeselectAll}
                key={"deselect"}
                value={deselectAllText}
                selected={false}
                customStyle={customStyle}
            />
        );

        let optionComponents = props.options.map((value) => (
            <Option
                handleSelect={() => handleSetSelections(value)}
                key={value}
                value={value}
                selected={selections.includes(value)}
                customStyle={customStyle}
            />
        ));
        let result = [];

        if (props.multi) {
            result.push(selectAll);
        }
        result.push(deselectAll);
        result = result.concat(optionComponents);

        let optionsContainerStyle =
            customStyle && customStyle.optionsContainer
                ? customStyle.optionsContainer
                : {};

        return (
            <div className="optionsContainer" style={optionsContainerStyle}>
                {result}
            </div>
        );
    }

    function getSelectText() {
        if (props.selectedValue) {
            return props.selectedValue;
        }
        if (props.defaultValue) {
            return props.defaultValue;
        }
        return props.options[0];
    }

    const selectText = getSelectText();
    const ref = useRef(null);
    useDetectOutsideDiv(ref, closeDropdown);

    return (
        <div
            ref={ref}
            className="dropdownContainer"
            style={customStyle.dropdownContainer}
        >
            <Select
                handleClick={handleOpenDropdown}
                selectText={selectText}
                isOpen={isOpen}
                customStyle={customStyle}
            ></Select>
            {isOpen && buildOptions()}
        </div>
    );
}

function Select({ selectText, handleClick, isOpen, customStyle }) {
    const arrow = isOpen ? "\u2191" : "\u2193";
    const style =
        customStyle && customStyle.selectContainer
            ? customStyle.selectContainer
            : {};
    return (
        <div className="selectContainer" onClick={handleClick} style={style}>
            <div className="selectContent">
                <span>{selectText}</span>
                <span className="arrow">{arrow}</span>
            </div>
        </div>
    );
}

function Option({ value, handleSelect, selected, customStyle }) {
    const [hover, setHover] = useState(false);
    function toggleHover(hovering) {
        setHover(hovering);
    }
    function getHoverColor() {
        if (customStyle && customStyle.hoverColor) {
            return customStyle.hoverColor;
        }
        return "rgb(150, 200, 255)";
    }
    const hoverColor = getHoverColor();
    const backgroundColor = hover | selected ? hoverColor : "white";
    const style = { backgroundColor: backgroundColor };

    return (
        <div
            className="option"
            style={{ ...style, ...customStyle?.option }}
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
            onClick={handleSelect}
        >
            <span>{value}</span>
        </div>
    );
}

export default Dropdown;
