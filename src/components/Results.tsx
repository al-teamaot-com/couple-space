import { useParams } from 'react-router-dom'

const Results = () => {
  const { id } = useParams()
  return <div>Results for quiz {id}</div>
}

export default Results