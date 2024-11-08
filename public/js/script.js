

document.addEventListener('DOMContentLoaded', function () {
  const deleteButtons = document.querySelectorAll('.btn-confirm-delete');
  const confirmDeleteButton = document.getElementById('confirmDeleteButton');

  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const targetUrl = this.getAttribute('href');
      confirmDeleteButton.setAttribute('href', targetUrl);
    });
  });
});
$(document).ready(function () {
  $(".data-table").each(function (_, table) {
    $(table).DataTable();
  });
});

const charts = document.querySelectorAll(".chart-smt");

const semesterValues = [];
const semesterAngka = [];
let a = 1;
for (let i = 1; i <= 8; i++) {
  const sem = document.getElementById(`sem${i}`).value;
  semesterValues.push(sem);
  semesterAngka.push(a);
  a++;
}


charts.forEach(function (chart) {
  var ctx = chart.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: semesterAngka,
      datasets: [
        {
          label: "Semester",
          data: semesterValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(100, 102, 255, 0.2)",
            "rgba(220, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(100, 102, 255, 1)",
            "rgba(220, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});




const chartsProdi = document.querySelectorAll(".chart-prodi");

const prodiValues = [];
const prodiAngka = [];
let b = 1;
for (let i = 1; i <= 8; i++) {
  const sem = document.getElementById(`sem${i}`).vblue;
  prodiValues.push(sem);
  prodiAngka.push(b);
  a++;
}


charts.forEach(function (chart) {
  var ctx = chart.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: prodiAngka,
      datasets: [
        {
          label: "# of Votes",
          data: prodiValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(100, 102, 255, 0.2)",
            "rgba(220, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(100, 102, 255, 1)",
            "rgba(220, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('navbarDropdownMaster');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault();

    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });

  });
  document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('navbarDropdownMaster1');
  const dropdownMenu = document.querySelector('.dropdown-menu1');

  dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault();

    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';

    } else {
      dropdownMenu.style.display = 'block';
    }
  });

  });
  document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('navbarDropdownMaster2');
  const dropdownMenu = document.querySelector('.dropdown-menu2');

  dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault();

    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });

  });
  document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('navbarDropdownMaster3');
  const dropdownMenu = document.querySelector('.dropdown-menu3');

  dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault();

    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });

  });
  alert('p')
