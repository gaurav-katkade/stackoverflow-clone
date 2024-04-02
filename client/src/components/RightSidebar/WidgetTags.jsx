import React from 'react'

const WidgetTags = () => {
  const Tags =['css','express','firebase','html','java','javascript','mern','mongodb','mysql','next.js','node.js','php','python','reactjs']
  return (
    <div className='widget-tags'>
        <h3>Watched tags</h3>
        <div className='widget-tags-div'>
          {
            Tags.map((tag)=>{
              return <p key={tag}>{tag}</p>
            })
          }
        </div>
    </div>
  )
}

export default WidgetTags
