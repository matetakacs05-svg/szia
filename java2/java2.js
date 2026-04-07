const adatok = document.getElementById('adatok');
const gombok = document.getElementById('gombok');
let tmb = [];

const fetchData = async () => {
    const response = await fetch('gp.txt');
    const data = (await response.text()).split('\n').slice(1);

    tmb = data;

    buildTable();
}

const buildTable = () => {
    adatok.innerHTML = '';

    tmb.map((sor, idx) => {
        const tr = document.createElement('tr');
        const cells = sor.split('\t');
        for (const cell of cells) {
            const td = document.createElement('td');
            td.innerText = cell;
            tr.appendChild(td);
        }
        const td = document.createElement('td');
        td.innerHTML = `<button onclick="modositas(${idx})">Módosítás</button><button onclick="torles(${idx})">Törlés</button>`
        tr.appendChild(td);
        adatok.appendChild(tr);
    })
}

const hozzaadas = () => {
    const datum = document.getElementById('datum').value;
    const nev = document.getElementById('nev').value;
    const helyszin = document.getElementById('helyszin').value;

    tmb.push(`${datum}\t${nev}\t${helyszin}`);
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

const torles = (idx) => {
    tmb.splice(idx, 1);
    buildTable();
}

fetchData();