import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { saveAs } from 'file-saver'


function App() {
  const [state, setState] = useState({
    name: '',
    receiptID: 0,
    price1: 0,
    price2: 0,

  })

  const handleChange = ({ target: { value, name } }) => setState({ ...state, [name]: value })

  const createPDF = () => {
    console.log(state)
    axios.post('http://localhost:5000/createPDF', state)
      .then(() => axios.get('http://localhost:5000/fetchPDF', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }




  return (
    <div className="App">
      <input type='text' placeholder='Name' name='name' onChange={(e) => handleChange(e)}></input>
      <input type='number' placeholder='Receip ID' name='receiptId' onChange={(e) => handleChange(e)}></input>
      <input type='number' placeholder='Price1' name='price1' onChange={(e) => handleChange(e)}></input>
      <input type='number' placeholder='Price2' name='price2' onChange={(e) => handleChange(e)}></input>

      <button onClick={() => createPDF()}>CREATE PDF</button>

    </div>
  )
}

export default App
