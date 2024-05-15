import { useState } from "react";
import "./App.css";
import Dropdown from "./Dropdown.js";
function DefaultExamples() {
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const [selectedPokemon2, setSelectedPokemon2] = useState(null);
    const [allSelections, setAllSelections] = useState([]);

    let option = "option";
    const sampleOptions = Array.from(Array(1000), (val, i) => option + i);
    const pokemon = ["torchic", "treeko", "mudkip"];

    function handleSelect(value) {
        setSelectedValue(value);
    }

    function handlePokemonSelect(value) {
        setSelectedPokemon(value);
    }

    function handlePokemonSelect2(value) {
        setSelectedPokemon2(value);
    }

    function handleSetAllSelections(selections) {
        setAllSelections(selections);
    }

    return (
        <>
            <h2>Default Dropdowns</h2>
            <p>
                The following are two default examples of using the dropdown
                component.
            </p>
            <p>
                The caller will pass in their custom array of options as a prop
                to the dropdown component.
            </p>
            <p>
                The first uses an optional 'multi' prop to enable multiselect
                and an optional default value for the selection label.
            </p>
            <p>
                The second is a default single select dropdown with no default
                select label. It shows the first option.
            </p>
            <p>
                The third example demonstrates the parent's ability to read all
                selected values with state and a callback passed to the dropdown
                component.
            </p>
            <div className="example">
                <Dropdown
                    options={sampleOptions}
                    defaultValue={"Select Multiple"}
                    selectedValue={selectedValue}
                    handleSelect={handleSelect}
                    multi={true}
                />
                <Dropdown
                    options={pokemon}
                    selectedValue={selectedPokemon}
                    handleSelect={handlePokemonSelect}
                />
                <Dropdown
                    options={pokemon}
                    defaultValue={"Pick Pokemon"}
                    selectedValue={selectedPokemon2}
                    handleSelect={handlePokemonSelect2}
                    handleSetAllSelections={handleSetAllSelections}
                    multi={true}
                />
                <div style={{ width: "50px" }}>
                    Selections
                    <ul>
                        {allSelections.map((v) => {
                            return <li>{v}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default DefaultExamples;
