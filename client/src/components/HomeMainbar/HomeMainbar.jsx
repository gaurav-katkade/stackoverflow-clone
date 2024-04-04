import React from 'react'
import {Link,useLocation} from 'react-router-dom'
import './HomeMainbar.css';
import Questions from '../../Pages/Questions/Questions';
import QuestionList from './QuestionList';

const HomeMainbar = () => {
  const questionsList = [
    {
      id: 1,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["java", "node js", "react js", "mongo"],
      userPosted: "user1",
      askedOn: "jan 1"
    },
    {
      id: 2,
      votes: 5,
      noOfAnswers: 4,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1"
    },
    {
      id: 3,
      votes: 1,
      noOfAnswers: 2,
      questionTitle: "what is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "python"],
      userPosted: "no",
      askedOn: "jan 1"
    }
  ];
  const location = useLocation()
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname ==='/'?<h1>Top Questions</h1>:<h1>All Question</h1>
        }
        <Link  className='ask-btn' to='/AskQuestions'>Ask Question</Link>
      </div>
      <div className=''>
        {
          questionsList == null?
          <h1>Loding...</h1>:
          <>
            <p>{questionsList.length} Questions</p>
            <QuestionList questionsList={questionsList}/>
          </>
        }
      </div>
    </div>
  );
};

export default HomeMainbar
