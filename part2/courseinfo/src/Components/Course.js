const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = (prop) => {
    return (
      <h3>{prop.course}</h3>
    )
  }
  
  const Content = ({parts}) => {
    
    return (
      <div>
        {parts.map(part => 
          <Part part={part} key={part.id}></Part>
        )}
      </div>
    )
  }
  
  
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    return <p>total number of exercises {parts.reduce((s, p) => s + p.exercises, 0)}</p>
  }

  export default Course