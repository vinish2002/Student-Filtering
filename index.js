
document.addEventListener('DOMContentLoaded', () => {
    const subSel = document.getElementById('subject');
    const filtRad = document.querySelectorAll('input[name="filter"]');

    const inputVal1 = document.getElementById('val1');
    const inputVal2 = document.getElementById('val2');

    const filterBtn = document.getElementById('filterBtn');
    const clearBtn = document.getElementById('clearBtn');

    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closePopup = document.getElementById('closePopup');

    let students = [
        { sno: 1, name: 'Janu', english: 50, maths: 86, science: 77, social: 89 },
        { sno: 2, name: 'Tara', english: 75, maths: 96, science: 91, social: 90 },
        { sno: 3, name: 'Glen', english: 35, maths: 68, science: 77, social: 100 },
        { sno: 4, name: 'Zara', english: 80, maths: 85, science: 67, social: 96 }
    ];

    filtRad.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'between') {
                inputVal2.style.display = 'inline-block';
            } else {
                inputVal2.style.display = 'none';
            }
        });
    });

    filterBtn.addEventListener('click', () => {
        const subject = subSel.value.toLowerCase();
        const filterType = document.querySelector('input[name="filter"]:checked').value;
        const value1 = parseFloat(inputVal1.value);
        const value2 = parseFloat(inputVal2.value);
        let filteredStudents = [];

        if (filterType === 'above') {
            filteredStudents = students.filter(student => student[subject] > value1);
        } else if (filterType === 'below') {
            filteredStudents = students.filter(student => student[subject] < value1);
        } else if (filterType === 'between') {
            filteredStudents = students.filter(student => student[subject] >= value1 && student[subject] <= value2);
        }

        if (filteredStudents.length === 0) {
            showPopup();
        } else {
            renderTable(filteredStudents);
        }
    });

    clearBtn.addEventListener('click', () => {
        renderTable(students);
    });

    function renderTable(data) {
        studentTable.innerHTML = '';
        data.forEach(student => {
            const row = studentTable.insertRow();
            row.insertCell(0).innerText = student.sno;
            row.insertCell(1).innerText = student.name;
            row.insertCell(2).innerText = student.english;
            row.insertCell(3).innerText = student.maths;
            row.insertCell(4).innerText = student.science;
            row.insertCell(5).innerText = student.social;
        });
    }

    function showPopup() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    document.querySelectorAll('th').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const order = header.getAttribute('data-order') === 'asc' ? 'desc' : 'asc';
            header.setAttribute('data-order', order);
            students.sort((a, b) => {
                if (order === 'asc') {
                    return a[column] > b[column] ? 1 : -1;
                } else {
                    return a[column] < b[column] ? 1 : -1;
                }
            });
            renderTable(students);
        });
    });

    renderTable(students);
});