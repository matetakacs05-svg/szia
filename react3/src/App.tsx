import { useState, useEffect } from 'react'
import './App.css'

function App() {
  new TextDecoder('iso-8859-2')
  const [tmb, setTmb] = useState<string[]>([]);

  const fetchData = async () => {
    const response = await fetch('gp.txt');
    const data = (await response.text()).split('\n').slice(1);

    setTmb(data);
  }

  const hozzaadas = () => {
    const newTmb = [...tmb];

    const datum = document.getElementById('datum') as HTMLInputElement;
    const nev = document.getElementById('nev') as HTMLInputElement;
    const helyszin = document.getElementById('helyszin') as HTMLInputElement;

    newTmb.push(`${datum.value.replaceAll('-', '.')}\t${nev.value}\t${helyszin.value}`);

    setTmb(newTmb);
  }

  const torles = (idx: number) => {
    const newTmb = [...tmb];

    newTmb.splice(idx, 1);
    setTmb(newTmb);
  }

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const modositas = (idx: number) => {
    const sor = tmb[idx];
    const cells = sor.split('\t');

    const datum = document.getElementById('datum') as HTMLInputElement;
    const nev = document.getElementById('nev') as HTMLInputElement;
    const helyszin = document.getElementById('helyszin') as HTMLInputElement;

    datum.value = cells[0].replaceAll('.', '-');
    nev.value = cells[1];
    helyszin.value = cells[2];
  setEditIndex(idx);
  } 

  const modositasMentese = () => {
  if (editIndex === null) return; 

  const newTmb = [...tmb];

  const datum = document.getElementById('datum') as HTMLInputElement;
  const nev = document.getElementById('nev') as HTMLInputElement;
  const helyszin = document.getElementById('helyszin') as HTMLInputElement;

  const updatedSor = `${datum.value.replaceAll('-', '.')}\t${nev.value}\t${helyszin.value}`;

  newTmb[editIndex] = updatedSor;

  setTmb(newTmb);
  setEditIndex(null);

  datum.value = '';
  nev.value = '';
  helyszin.value = '';
  }
  const megse = () => {
  setEditIndex(null);

  const datum = document.getElementById('datum') as HTMLInputElement;
  const nev = document.getElementById('nev') as HTMLInputElement;
  const helyszin = document.getElementById('helyszin') as HTMLInputElement;

  datum.value = '';
  nev.value = '';
  helyszin.value = '';
}
  

  useEffect(() => {
    fetchData();
  }, []);

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
          {editIndex === null ? (
            <button type="button" onClick={hozzaadas}> Új rekord </button>
          ) : (
            <>
              <button type="button" onClick={modositasMentese}> Módosítás</button>
              <button type="button" onClick={megse}> Mégse </button>
            </>
          )}
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
                <td><button onClick={() => modositas(idx)}>Módosítás</button></td>
              </tr>
        })
        }
        </tbody>
      </table>
    </main>
  )
}

export default App
