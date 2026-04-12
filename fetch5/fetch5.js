const adatok = document.getElementById('adatok');
const gombok = document.getElementById('gombok');
let tmb = [];


const fetchData = async () => {
    const response = await fetch('/backend/api.php');
    tmb = (await response.json()).readData;

    buildTable();
}

const buildTable = () => {
    adatok.innerHTML = '';

    tmb.map((data, idx) => {
        const tr = document.createElement('tr');
        const items = Object.values(data);
        for (const item of items) {
            const td = document.createElement('td');
            td.innerText = item;
            tr.appendChild(td);
        }
        const td = document.createElement('td');
        td.innerHTML = `<button onclick="modositas(${data.az})">Módosítás</button><button onclick="torles(${data.az})">Törlés</button>`
        tr.appendChild(td);
        adatok.appendChild(tr);
    })
}

const hozzaadas = async() => {
    const nev = document.getElementById('nev').value;
    const nem = document.getElementById('nem').value;
    const szuldat = document.getElementById('szuldatum').value;
    const nemzet = document.getElementById('nemzet').value;

    const response = await fetch('/backend/api.php', {
        method: 'post',
        body: JSON.stringify({
            nev, nem, szuldat, nemzet
        })
    });
    const data = await response.json();

    tmb.push({
        az: data.newId, nev, nem, szuldat, nemzet
    });
    buildTable();
}

const modositas = (idx) => {
    const data = tmb[idx].split('\t');
    const datum = document.getElementById('datum');
    const nev = document.getElementById('nev');
    const helyszin = document.getElementById('helyszin');

    const gombok = document.getElementById('gombok');
    gombok.innerHTML = `<button type="button" onclick="modositasMegerosites(${idx})">Megerősítés</button><button type="button" onclick="modositasMegse()">Mégse</button>`;

    datum.value = data[0].replaceAll('.', '-');
    nev.value = data[1];
    helyszin.value = data[2];
}

const modositasMegerosites = (idx) => {
    const datum = document.getElementById('datum');
    const nev = document.getElementById('nev');
    const helyszin = document.getElementById('helyszin');

    tmb[idx] = `${datum.value.replaceAll('-', '.')}\t${nev.value}\t${helyszin.value}`;
    buildTable();
}

const modositasMegse = () => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) input.value = '';

    const gombok = document.getElementById('gombok');
    gombok.innerHTML = '<button onclick="hozzaadas()">Új rekord</button>';
}

const torles = async(az) => {
    const response = await fetch(`/backend/api.php?az=${az}`, {
        method: 'delete'
    });

    const data = await response.json();

    console.log(data);

    const idx = tmb.findIndex(d => d.az === az);
    tmb.splice(idx, 1);
    buildTable();
}

fetchData();