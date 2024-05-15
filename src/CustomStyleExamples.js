import { useState } from "react";
import Dropdown from "./Dropdown.js";
function CustomStyleExamples() {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const pokemon = [
        "treeko",
        "mudkip",
        "torchic",
        "pikachu",
        "bulbasaur",
        "charmander",
        "squirtle",
    ];

    let option = "option";
    const sampleOptions = Array.from(Array(1000), (val, i) => option + i);

    function handlePokemonSelect(value) {
        setSelectedPokemon(value);
    }

    function handlePokemonSelect2(value) {
        setSelectedPokemon2(value);
    }
    function handleOptionSelect3(value) {
        setSelectedOption3(value);
    }

    const customStyle1 = {
        selectContainer: {
            height: "50px",
            border: "1px solid black",
            borderRadius: "2px",
        },
        hoverColor: "rgb(148, 148, 148)",
    };

    const customStyle2 = {
        selectContainer: {
            height: "40px",
            border: "1px solid green",
            borderRadius: "2px",
        },
        option: {
            border: "none",
        },
        hoverColor: "pink",
    };

    const customStyle3 = {
        dropdownContainer: {
            width: "150px",
        },
        selectContainer: {
            height: "20px",
            border: "1px solid pink",
            borderRadius: "4px",
        },
        optionsContainer: {
            maxHeight: "450px",
        },
        option: {
            border: "none",
        },
        hoverColor: "pink",
    };
    return (
        <>
            <h2>Custom Styles</h2>
            <p>
                Using a custom object with properties that correspond to
                classname, you can add custom styling to different elements of
                the dropdown UI:{" "}
            </p>
            <div className="example">
                <Dropdown
                    options={pokemon}
                    selectedValue={selectedPokemon}
                    handleSelect={handlePokemonSelect}
                    customStyle={customStyle1}
                />
                <Dropdown
                    options={pokemon}
                    defaultValue={"Pick a pokemon!"}
                    selectedValue={selectedPokemon2}
                    handleSelect={handlePokemonSelect2}
                    customStyle={customStyle2}
                />
                <Dropdown
                    options={sampleOptions}
                    selectedValue={selectedOption3}
                    handleSelect={handleOptionSelect3}
                    customStyle={customStyle3}
                />
            </div>
        </>
    );
}

export default CustomStyleExamples;
