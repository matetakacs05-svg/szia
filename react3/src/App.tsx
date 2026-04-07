import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tmb, setTmb] = useState<string[]>([]);

  return (
    <main>
      <form className="container">
        <div>
          <label htmlFor="datum">Dátum</label><br/>
          <input type="date" id="datum" name="datum"/>
        </div>
        <div>
          <label htmlFor="nev">Név</label><br/>
          <input type="text" id="nev" name="nev"/>
        </div>
        <div>
          <label htmlFor="helyszin">Helyszín</label><br/>
          <input type="text" id="helyszin" name="helyszin"/>
        </div>
        <div id="gombok">
          <button type="button" onClick={hozzaadas}>Új rekord</button>
        </div>
      </form>
      <table>
        <thead>
        <tr>
          <th>Dátum</th>
          <th>Név</th>
          <th>Helyszín</th>
          <th>Akciók</th>
        </tr>
        </thead>
        <tbody id="adatok">
        {
          tmb.map((sor, idx) => {
            const cells = sor.split('\t');

            return <tr key={idx}>
                <td>{cells[0]}</td>
                <td>{cells[1]}</td>
                <td>{cells[2]}</td>
                <td><button onClick={() => torles(idx)}>Törlés</button></td>
              </tr>
        })
        }
        </tbody>
      </table>
    </main>
  )
}

export default App
