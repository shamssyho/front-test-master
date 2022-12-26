import { useContext, useState } from "react";
import "./App.css";
import { Box, Button, useToast, Text} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import dataJson from "./data";
import ExpandableRow from "./Components/ExpandableRow";
import { Person } from "./Types/Person";
import { Context } from "./Context/Theme";

function App() {
    const toast = useToast();
    // true croissant, false décroissant
    const [sortSense, setSortSense] = useState(true);
    const [gens, setGens] = useState<Person[]>(dataJson);

    // context
    const context = useContext(Context);

    // Comprarateur pour le tri 
    function comparor(a: Person, b: Person) {
        const v1 = parseInt(a.age);
        const v2 = parseInt(b.age);
        if (sortSense === true) {
            return v2 - v1;
        } else {
            return v1 - v2;
        }
    }
    // Fonction de tri
    function sort() {
        setSortSense(!sortSense);
        const dataCopy = gens.slice();
        dataCopy.sort(comparor);
        setGens(dataCopy);
    }

    // Calcul moyennec : reduce fait la somme de tous ces precedents, à chaque fois qu'on est a next, reduce stock la somme des valeurs percedentes
    const sommeAge = gens.reduce(
        (preveious, next) => preveious + parseInt(next.age),
        0
    );
    const moyenneAge = (sommeAge / gens.length).toFixed(2);

    return (
        <>
            <Box padding={5} style={{ backgroundColor: context.color }}>
            <Text align={"center"} fontSize='2xl'>Moyenne d'âge : {moyenneAge} </Text>

                {/* Affichage 1 en tableau : */}

                {/* <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th onClick={sort}>Age<UpDownIcon />
                            </Th>
                            <Th>Description</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {gens.map((person, index) => (
                            <ExpandableRow
                                // childs
                                person={person}
                                key={index}
                            />
                        ))}
                     </Tbody>
                </Table> */}

                {/* Affichage  en section : */}
                <Button style={{  }} size={"lg"} onClick={sort}>Tier par âge <UpDownIcon /></Button>
                    {gens.map((person, index) => (
                        <ExpandableRow
                            // childs
                            person={person}
                            key={index}
                        />
                    ))}

            </Box>
        </>
    );
}

export default App;
