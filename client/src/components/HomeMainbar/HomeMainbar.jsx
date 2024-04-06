import React from 'react'
import {Link,useLocation, useNavigate} from 'react-router-dom'
import './HomeMainbar.css';
import Questions from '../../Pages/Questions/Questions';
import QuestionList from './QuestionList';

const HomeMainbar = () => {
  const user = 1;
  const navigate = useNavigate();
  const checkAuth=()=>{
    if(user === null){
      alert('Sign in first to ask Questions')
      navigate('/Auth')
    }else{
      navigate('/AskQuestion')
    }
  }
  const questionsList = [
    {
      id: 1,
      upVotes:2,
      downVotes:3,
      noOfAnswers: 2,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["java", "node js", "react js", "mongo"],
      userPosted: "user1",
      userId:1,
      askedOn: "jan 1",
      answer:[{
        answerBody:"Answer",
        userAnswered:'Kumar',
        userId:2,
      }]
    },
    {
      id: 2,
      upVotes:2,
      downVotes:3,
      noOfAnswers: 4,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      userId:1,
      askedOn: "jan 1",
      answer:[{
        answerBody:"Answer",
        userAnswered:'Kumar',
        userId:2,
      }]
    },
    {
      id: 3,
      upVotes:2,
      downVotes:3,
      noOfAnswers: 2,
      questionTitle: "what is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "python"],
      userPosted: "no",
      userId:1,
      askedOn: "jan 1",
      answer:[{
        answerBody:"Answer",
        userAnswered:'Kumar',
        userId:2,
      }]
    }
  ];
  const location = useLocation()
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname ==='/'?<h1>Top Questions</h1>:<h1>All Question</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
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
