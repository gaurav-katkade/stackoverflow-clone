import React from 'react'
import { Link, useParams } from 'react-router-dom';
import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
const QuestionDetails = () => {
    const {id} =useParams();
    console.log(id)
    const questionsList = [
        {
          id: '1',
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
          id: '2',
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
          id: '3',
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
  return (
    <div className='question-details-page'>
      {
        questionsList===null?
        <h1>Loading</h1>:
        <>
            {
                questionsList.filter(question =>question.id === id).map((question)=>{
                  console.log(question)
                    return <div key={question.id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className="question-votes">
                                    <img src={upVote} alt="upvote" width='18'/>
                                    <p>{question.upVotes - question.downVotes}</p>    
                                    <img src={downVote} alt="downvote" width='18'/>       
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                              <p className='question-details-tags'>
                                {
                                  question.questionTags.map((tag)=>{
                                   return <p className='ans-tag' key={tag}>{tag}</p>
                                  })
                                }
                              </p>
                              <div className='question-actions-user'>
                                <div>
                                  <button type='button'>Share</button>
                                  <button type='button'>Delete</button>
                                </div>
                                <div>
                                  <p> asked {question.askedOn}</p>
                                  <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
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
                            <DisplayAnswer key={question.id} question={question}/>
                          </section>
                        }
                        <section className='post-ans-container'>
                          <h3>Your Answer</h3>
                          <form >
                            <textarea name="" id="" cols="30" rows="10"></textarea><br/>
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
