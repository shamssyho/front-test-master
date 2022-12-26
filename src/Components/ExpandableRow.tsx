import { Button,useToast, Card, CardBody, Text, Heading,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExpandableRowProps } from "../Types/ExpandableRowProps";
import { Axios } from "axios";
import { GenderApiResponse } from "../Types/GenderApiResponse";

export default function ExpandableRow(props: ExpandableRowProps) {
    const [gender, setGender] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const toast = useToast();

    const axios = new Axios({});

    // onChange gender ==> Change name
    useEffect(() => {
        document.title = props.person.name.split(" ")[0].toLowerCase();
    }, [gender]);

    function handleGender(e: any) {
        // Le prenom est la premiere chaine de caractère (séparation par espace "  " le prenom et nom)
        const prenom = e.target.id.split(" ")[0].toLowerCase();
        //type de get :  gender => string
        axios
            .get(`https://api.genderize.io?name=${prenom}`)
            .then((apiResponse) => {
                // Si le genre de cette personne n'est pas trouvé => on aura un message d'erreur
                const dataAsJSON:GenderApiResponse = JSON.parse(apiResponse.data);
                if (
                    !dataAsJSON.gender ||
                    dataAsJSON.gender === null
                ) {
                    toast({
                        title: "Pas de données",
                        status: "error",
                    });
                    setIsHidden(false);
                    // Sinon la donction nous affiche le genre de la personne
                } else {

                    setGender(dataAsJSON.gender);
                    setIsHidden(!isHidden);
                }
            });
    }
    // Une fonctionne qui change la couleur de fond en fonctionne de l'age
    function getColor(age: any) {
        // Calculer une valeur de teinte en fonction de l'âge
        const ageColor = Math.round(age * 3.2);
        return `hsl(${ageColor}, 50%, 75%)`;
    }

    return (
        <>
            {/* Affichage 1 en tableau */}
            {/* <Tr bgColor={getColor(props.person.age)}>
                <Td>{props.person.name}</Td>
                <Td>{props.person.age}</Td>
                <Td>{props.person.description}</Td>
                <Td>
                    <Button id={props.person.name} onClick={handleGender}>
                        Infos
                    </Button>
                </Td>
            </Tr>
            <Tr hidden={isHidden}>
                <Td>{gender}</Td>
            </Tr> */}

            {/* Affichage  en section : */}
            <Card size={"lg"} justify={"center"} bgColor={getColor(props.person.age)}>
                <CardBody>
                    <Heading as='h1' size='xl' noOfLines={1}>{props.person.name}</Heading>
                    {/* <Text align={"center"} >{props.person.name}</Text> */}
                    <Text align={"center"} fontSize='2xl'>Age : {props.person.age} </Text>
                    <Text>{props.person.description}</Text>
                </CardBody>
                <Text align={"center"} hidden={isHidden} >
                    {gender}
                </Text>
                    <br />
                <Button size="md" className="btn-info" id={props.person.name} onClick={handleGender}>
                    Voir
                </Button>
            </Card>
            <br />
        </>
    );
}
