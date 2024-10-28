import { useEffect, useState } from 'react'
import axios from 'axios'
import { createContext, useContext } from 'react';
import { examinationContext } from '../App';

const GetBooleanExam = () => {
    const [answereData, setAnswereData] = useState({});
    const data = useContext(examinationContext);
    const [marksObtained, setMarksObtained] = useState(0);
    const totalMarks = data.length;

    console.log(totalMarks)

    const calculateMarks = () => {
        setMarksObtained(0);
        for (let i in answereData) {
            if (answereData[i] === data[i].correct_answer) {
                setMarksObtained((marksObtained) => { return marksObtained + 1 })
            } else {
                continue;
            }
        }
        //setAnswereData({});
    }

    console.log(answereData)
    console.log(data);

    return (
        <div style={{display:'flex',flexDirection:'column'}}>
            <h3>Each question has 1 mark</h3>
            {
                data.map((element, index) => {
                    return (
                        <div key={index} style={{backgroundColor:'tomato',color:'white',border:'1px solid black',margin:'10px',padding:'10px',borderRadius:'30px',fontSize:'20px'}}>
                            Q {index + 1} &nbsp;
                            {element.question} <br />
                            <input type='radio' name={index} value={element.correct_answer}
                                onClick={(e) => { setAnswereData({ ...answereData, [e.target.name]: e.target.value }) }} />{element.correct_answer}

                            <input type='radio' name={index} value={element.incorrect_answers}
                                onClick={(e) => { setAnswereData({ ...answereData, [e.target.name]: e.target.value }) }} />{element.incorrect_answers}
                        </div>
                    )
                })
            }
            <button onClick={calculateMarks} style={{backgroundColor:'black',color:"white",border:'1px solid black',borderRadius:'30px',padding:'30px',fontSize:'20px',cursor:'pointer'}}>Submit</button>
            <h2 style={{color:'green',fontSize:'30px'}}>Your have scored  {marksObtained} out of {totalMarks}</h2>
        </div>
    )
}
export default GetBooleanExam;