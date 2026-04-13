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

const baseUrl = 'http://localhost:8888/backend/api.php';

function App() {
    const [data, setData] = useState<Data[]>([]);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const [nev, setNev] = useState('');
    const [nem, setNem] = useState('');
    const [szuldat, setSzuldat] = useState('');
    const [nemzet, setNemzet] = useState('');

    const fetchData = async () => {
        const response = await axios.get(baseUrl);

        setData(response.data.readData);
    }

    const hozzaadas = async() => {
        const response = await axios.post(baseUrl, {
            nev, nem, szuldat, nemzet
        });

        console.log(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
          <form className={'container'}>
            <div>
                <label htmlFor={'nev'}>Név</label><br/>
                <input type={'text'} id={'nev'} name={'nev'} value={nev} onChange={(e) => setNev(e.target.value)} required />
            </div>
            <div>
                <label htmlFor={'nem'}>Nem</label><br/>
                <select id={'nem'} name={'nem'} value={nem} onChange={(e) => setNem(e.target.value)} required>
                    <option value={''} disabled>Válassz...</option>
                    <option value={'F'}>Férfi</option>
                    <option value={'N'}>Nő</option>
                </select>
            </div>
            <div>
                <label htmlFor={'szuldat'}>Szül. dátum</label>
                <input type={'date'} id={'szuldat'} name={'szuldat'} value={szuldat} onChange={(e) => setSzuldat(e.target.value)} required />
            </div>
            <div>
                <label htmlFor={'nemzet'}>Nemzet</label>
                <input type={'text'} id={'nemzet'} name={'nemzet'} value={nemzet} onChange={(e) => setNemzet(e.target.value)} required />
            </div>
            { editIdx === null ?
                <button type={'button'} onClick={hozzaadas}>Hozzáadás</button>
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
