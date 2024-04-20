import './AskQuestion.css'
import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { askQuestion } from '../../actions/question'


const AskQuestion = () => {
  const [questionTitle,setQustionTitle] = useState('');
  const [questionBody,setQustionBody] = useState('');
  const [questionTags,setQustionTags] = useState('');


  const dispatch = useDispatch();
  const User = useSelector((state)=>state.currentUserReducer)
  const navigate = useNavigate()


const handleSubmit =(e)=>{
  e.preventDefault();
  // console.log({questionBody,questionTitle,questionTags})
  dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User?.result?._id},navigate))
}
const handleEnter = (e)=>{
  if(e.key ==='Enter'){
    setQustionBody(questionBody+"\n")
  }
}





  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
      <h1>Ask a public Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="ask-form-container">
            <label htmlFor='ask-ques-title'>
                <h4>Title</h4>
                <p>Be specific and imagine you're asking question to another pereson</p>
                <input type="text" onChange={(e)=>setQustionTitle(e.target.value)} placeholder='e.g. ls there an R function for finding the index of an element in the vector' id="ask-ques-title" />
            </label>
            <label htmlFor='ask-ques-body'>
                <h4>Body</h4>
                <p>Include all the information someone would need to answer your question</p>
                <textarea  onChange={(e)=>setQustionBody(e.target.value)}  onKeyPress={handleEnter} id="ask-ques-body" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor='ask-ques-tags'>
                <h4>Body</h4>
                <p>Add up to 5 tags gto describe what your question is about</p>
                <input type="text"  onChange={(e)=>setQustionTags(e.target.value.split(' '))}  placeholder='e.g.(xml typescript wordpresss)' id="ask-ques-tags" />
            </label>
        </div>
        <input className='review-btn' type="submit" value="Review your question" />
      </form>
      </div>
    </div>
  )
}

export default AskQuestion
