import { useState } from "react";
import Header from '../layout/Header'
import SelectLevel from '../components/SelectLevel'
import CardContainer from '../components/CardContainer'
import { LEVEL } from "../constants/Level";


export default function MainPage(){
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(LEVEL.EASY);

    const updateScore = (newScore) => {
        setScore(newScore);
    };

    return(
        <>
        <Header score={score}/>
        <SelectLevel />
        <CardContainer updateScore={updateScore} level={level} />
        </>
    )
}