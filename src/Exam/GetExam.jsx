import { useEffect, useState } from 'react'
import axios from 'axios'
import { createContext, useContext } from 'react';
import { examinationContext } from '../App';
import GetMcqExam from './GetMcqExam';
import GetBooleanExam from './GetBooleanExam';

const GetExam = () => {
    const data = useContext(examinationContext);
    return (
        <div>
            <h1 style={{backgroundColor:'green',color:'white'}}>{data[0].category} Examination</h1>
            {
                data[0].type == 'multiple' ? <GetMcqExam /> : <GetBooleanExam />
            }
        </div>
    )
}
export default GetExam;