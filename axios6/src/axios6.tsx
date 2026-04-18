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

const baseUrl = '/backend/api.php';

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
        const details = {
            nev, nem, szuldat, nemzet
        };

        const response = await axios.post(baseUrl, details);

        const newData = [...data, {
            az: response.data.newId as number, ...details
        }];

        setData(newData);
    }

    const modositas = (idx: number) => {
        setEditIdx(idx);

        const details = data[idx];
        setNev(details.nev);
        setNem(details.nem);
        setSzuldat(details.szuldat);
        setNemzet(details.nemzet);
    }

    const modositasMegerosites = async() => {
        const details = {
            az: data[editIdx!].az, data: { nev, nem, szuldat, nemzet }
        }

        await axios.put(baseUrl, details);

        const newData = [...data];
        newData[editIdx!] = { ...details.data, az: details.az };
        setData(newData);
        setEditIdx(null);
    }

    const modositasMegse = () => {
        setEditIdx(null);
        setNev('');
        setNem('');
        setSzuldat('');
        setNemzet('');
    }

    const torles = async(az: number, idx: number) => {
        await axios.delete(`${baseUrl}?az=${az}`);

        const newData = [...data];
        newData.splice(idx, 1);
        setData(newData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
        <div className="nav">
        <nav>
            <a className="nav-item" href="/index.html">Főoldal</a>
            <a className="nav-item" href="/java2/java2.html">Java 2</a>
            <a className="nav-item" href="/react3/dist/index.html">React 3</a>
            <a className="nav-item" href="/spa4/dist/index.html">SPA 4</a>
            <a className="nav-item" href="/fetch5/fetch5.html">Fetch 5</a>
            <a className="nav-item" href="/axios6/dist/index.html">Axios 6</a>
            <a className="nav-item" href="/oojs7/oojs7.html">OOJS 7</a>
        </nav>
    </div>
        <video autoPlay loop muted playsInline className="bg-video">
            <source src="bgv.mp4" type="video/mp4" />
        </video>
        <div id="content">
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
                    <button type={'button'} onClick={modositasMegerosites}>Módosítás</button>
                    <button type={'button'} onClick={modositasMegse}>Mégse</button>
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
                        <td>
                            <button type={'button'} onClick={() => modositas(idx)}>Módosítás</button>
                            <button type={'button'} onClick={() => torles(d.az, idx)}>Törlés</button>
                        </td>
                    </tr>
                )) }
              </tbody>
          </table>
      </div>
      </div>
  )
}

export default App
