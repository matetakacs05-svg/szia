import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Data {
    az: number;
    nev: string;
    nem: string;
    szuldat: string;
    nemzet: string;
}

function App() {
    const [data, setData] = useState<Data[]>([]);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const fetchData = async () => {
        const response = await axios.get('/backend/api.php');

        setData(response.data.readData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
          <form className={'container'}>
            <div>
                <label htmlFor={'nev'}>Név</label><br/>
                <input type={'text'} id={'nev'} name={'nev'} required />
            </div>
            <div>
                <label htmlFor={'nem'}>Nem</label><br/>
                <select id={'nem'} name={'nem'}>
                    <option value={''} disabled selected>Válassz...</option>
                    <option value={'F'}>Férfi</option>
                    <option value={'N'}>Nő</option>
                </select>
            </div>
            <div>
                <label htmlFor={'szuldat'}>Szül. dátum</label>
                <input type={'date'} id={'szuldat'} name={'szuldat'} required />
            </div>
            <div>
                <label htmlFor={'nemzet'}>Nemzet</label>
                <input type={'text'} id={'nemzet'} name={'nemzet'} required />
            </div>
            { editIdx === null ?
                <button type={'button'}>Hozzáadás</button>
                :
                <>
                    <button type={'button'}>Módosítás</button>
                    <button type={'button'}>Mégse</button>
                </>
            }
          </form>
          <table>
              <thead>
                <tr>
                    <th>Az</th><th>Név</th><th>Nem</th><th>Szül. dátum</th><th>Nemzet</th>
                </tr>
              </thead>
              <tbody>
                { data.map((d, idx) => (
                    <tr key={idx}>
                        <td>{d.az}</td><td>{d.nev}</td><td>{d.nem}</td><td>{d.szuldat}</td><td>{d.nemzet}</td>
                    </tr>
                )) }
              </tbody>
          </table>
      </div>
  )
}

export default App
