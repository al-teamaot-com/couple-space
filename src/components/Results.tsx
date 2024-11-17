import { useParams } from 'react-router-dom'

const Results = () => {
  const { id } = useParams()
  
  return (
    <div>
      <h1>Results Page</h1>
      <p>Results for quiz ID: {id}</p>
    </div>
  )
}

export default Results