import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'
import { Link, useParams,useNavigate,useLocation} from 'react-router-dom';
import copy from 'copy-to-clipboard' 


import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { postAnswer,deleteQuestion,voteQuestion} from '../../actions/question';


const QuestionDetails = () => {
    const {id} =useParams();
    const questionsList = useSelector(state=>state.questionsReducer)
    // console.log("🚀 ~ QuestionDetails ~ questionsList:", questionsList)
    // console.log(questionsList)

    const [Answer,setAnswer] =useState('')
    const Navigate = useNavigate()
    const User = useSelector((state)=>(state.currentUserReducer))
    // console.log("🚀 ~ QuestionDetails ~ User:", User)
    
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'http://localhost:3000'

    const handlePosAns=(e,answerLength)=>{
      e.preventDefault()
      if(User === null){
        alert('Login or SignUp to answer a question')
        Navigate('/Auth')
      }else{
        if(Answer===''){
          alert('Enter Answer Before Submitting')
        }else{
          console.log('handle Pos ans')
          dispatch(postAnswer({id,noOfAnswers:answerLength+1,answerBody:Answer,userAnswered:User.result.name,userId:User.result._id}))
          setAnswer('')
        }
      }
    }

    const handleDelete=()=>{
      dispatch(deleteQuestion(id,Navigate))
    }

    const handleShare=()=>{
        copy(url+location.pathname)
        alert(`copied URL :${url+location.pathname}`)
    }

    const handleUpVote=()=>{
      dispatch(voteQuestion(id,'upVote',User.result._id))
    }

    const handleDownVote=()=>{
      dispatch(voteQuestion(id,'downVote',User.result._id))
    }

    // console.log(id)
    // const questionsList = [
    //     {
    //       id: '1',
    //       upVotes:2,
    //       downVotes:3,
    //       noOfAnswers: 2,
    //       questionTitle: "What is a function?",
    //       questionBody: "It meant to be",
    //       questionTags: ["java", "node js", "react js", "mongo"],
    //       userPosted: "user1",
    //       userId:1,
    //       askedOn: "jan 1",
    //       answer:[{
    //         answerBody:"Answer",
    //         userAnswered:'Kumar',
    //         userId:2,
    //       }]
    //     },
    //     {
    //       id: '2',
    //       upVotes:2,
    //       downVotes:3,
    //       noOfAnswers: 4,
    //       questionTitle: "What is a function?",
    //       questionBody: "It meant to be",
    //       questionTags: ["javascript", "R", "python"],
    //       userPosted: "mano",
    //       userId:1,
    //       askedOn: "jan 1",
    //       answer:[{
    //         answerBody:"Answer",
    //         userAnswered:'Kumar',
    //         userId:2,
    //       }]
    //     },
    //     {
    //       id: '3',
    //       upVotes:2,
    //       downVotes:3,
    //       noOfAnswers: 2,
    //       questionTitle: "what is a function?",
    //       questionBody: "It meant to be",
    //       questionTags: ["javascript", "python"],
    //       userPosted: "no",
    //       userId:1,
    //       askedOn: "jan 1",
    //       answer:[{
    //         answerBody:"Answer",
    //         userAnswered:'Kumar',
    //         userId:2,
    //       }]
    //     }
    //   ];
  return (
    <div className='question-details-page'>
      {
        questionsList.data===null?
        <h1>Loading</h1>:
        <>
            {
                questionsList.data.filter(question =>question._id === id).map((question)=>{
                    return <div key={question.id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className="question-votes">
                                    <img src={upVote} alt="upvote" width='18' onClick={handleUpVote}/>
                                    <p>{question.upVote.length - question.downVote.length}</p>    
                                    <img src={downVote} alt="downvote" width='18' onClick={handleDownVote}/>       
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                              <p className="question-body">{question.questionBody}</p>
                              <p className='question-details-tags'>
                                {
                                  question.questionTags.map((tag)=>{
                                   return <p className='ans-tag' key={tag}>{tag}</p>
                                  })
                                }
                              </p>
                              <div className='question-actions-user'>
                                <div>
                                  <button type='button'onClick={handleShare}>Share</button>
                                  {
                                    User?.result._id === question?.userId && (
                                      <button type='button' onClick={handleDelete}>Delete</button>
                                    )
                                  }
                                  
                                </div>
                                <div>
                                  <p> asked {moment(question.askedOn).fromNow()}</p>
                                  <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="orange" px='8px' py='5px'>
                                      {
                                        question.userPosted.charAt(0).toUpperCase()
                                      }
                                    </Avatar>
                                    <div>
                                      {question.userPosted}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                        </section>
                        {
                          question.noOfAnswers !== 0 && 
                          <section>
                            <h3>{question.noOfAnswers} answers</h3>
                            <DisplayAnswer handleShare={handleShare} key={question.id} question={question}/>
                          </section>
                        }
                        <section className='post-ans-container'>
                          <h3>Your Answer</h3>
                          <form onSubmit={(e)=>{handlePosAns(e,question.answer.length)}} >
                            <textarea  onChange={(e)=>setAnswer(e.target.value)}  id="" cols="30" rows="10"></textarea><br/>
                            <input type="submit" className="post-ans-btn"value="Post your answer" />
                          </form>
                          <p>
                            Browse other Question tagged
                            {
                              
                              question.questionTags.map((tag)=>{
                                return<Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                              })
                            } or 
                            <Link to='/AskQuestion' style={{textDecoration:"none",color:"#009dff"}}>Ask your own question</Link>
                          </p>
                        </section>
                    </div>
                })
            }
        </>
      }
    </div>
  )
}

export default QuestionDetails
