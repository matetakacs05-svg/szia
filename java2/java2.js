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
const torles = (idx) => {
    tmb.splice(idx, 1);
    buildTable();
}

fetchData();