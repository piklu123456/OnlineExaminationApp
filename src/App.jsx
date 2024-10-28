import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { createContext, useContext } from 'react';
import GetExam from './Exam/GetExam';


const examinationContext = createContext();

//const baseURL = "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple"
function App() {

  /* states declaration */
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);  // number of questions
  const [category, setCategory] = useState(9);                     // category or subject of examination
  const [difficulty, setDifficulty] = useState("easy");            // difficulty level of examination
  const [type, setType] = useState("multiple");                    // mode of examination questions
  const [questionData, setQuestionData] = useState([]);            // state containing all questions of the examination
  const [startExam, setStartExam] = useState(false);               // boolean state indicating wheather examination
  // should start or not
  /* end of states declaration */

  /* useEffect hook where examination questions are fetched after proper filtration and saved in questionData
  state*/
  useEffect(() => {
    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    axios.get(url)
      .then((response) => {
        console.log(response.data.results);
        setQuestionData(response.data.results);
      }).catch((error) => {
        console.log(error)
      })

  }, [numberOfQuestions, category, difficulty, type])
  /* end of useEffect hook */


  const myStyle = { padding: '10px', textAlign: 'center' };   // custom css style

  return (
    <div style={{ display: 'flex', flexDirection: "column", backgroundColor: "skyblue", color: "black", textAlign: 'center' }}>

      <h1>Online Examination Center</h1>

      Enter number of questions : <input style={myStyle} type='number' max="50" min="1" name='numberOfQuestions' value={numberOfQuestions}
        onChange={(e) => { setNumberOfQuestions(e.target.value) }} /> <br />

      Select a Category for Exam :   <br />
      <select name="category" style={myStyle} onChange={(e) => { setCategory(parseInt(e.target.value)) }}>
        <option value="9">GK</option>
        <option value="17">Science & Nature</option>
        <option value="18">Computer</option>
        <option value="19">Mathematics</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="21">Sports</option>
      </select>

      <br />

      Select difficulty level : <br />
      <select name="difficulty" style={myStyle} onChange={(e) => { setDifficulty(e.target.value) }}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <br />

      Select Question Type :
      <select name="type" style={myStyle} onChange={(e) => { setType(e.target.value) }}>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True/False</option>
      </select>
      <br /><br />

      <input type='button' style={{ ...myStyle, backgroundColor: 'red', color: 'white', border: '1px solid black', borderRadius: '30px', fontSize: '21px' }} onClick={() => { setStartExam(!startExam) }} value={startExam ? "Stop Exam" : "Start Exam"} />

      {
        (questionData.length > 0 && startExam == true) ? (
          <examinationContext.Provider value={questionData}>
            <GetExam />
          </examinationContext.Provider>
        ) : null
      }

    </div>
  )
}

export { examinationContext }
export default App
