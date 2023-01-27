const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Content = (prop) => {
  console.log(prop)
  return (
    <div>
      <Part part={prop.parts[0]}/>
      <Part part={prop.parts[1]}/>
      <Part part={prop.parts[2]}/>
    </div>
  )
}

const Header = (prop) => {
  return (
    <h1>{prop.course}</h1>
  )
}

const Part = (prop) => {
  //console.log(prop.part.name)
  return (
    <p>{prop.part.name} {prop.part.exercises}</p>
  )
}

const Total = (prop) => {
  let total = prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises
  return <p>Number of exercises {total}</p>
}

export default App;
