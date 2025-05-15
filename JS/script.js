console.log("I am the console.");

function quizAlert(){
    alert("This quiz is about to start !");
    quizConfirm();
}

function quizConfirm(){
    var name = document.querySelector('input[name="name"]').value.trim();
    var surname = document.querySelector('input[name="surname"]').value.trim();
    var birthdate = document.querySelector('input[name="birthdate"]').value;
    var email = document.querySelector('input[name="email"]').value.trim();
    var phone = document.querySelector('input[name="phone"]').value.trim();
    var status = document.querySelector('select[name="status"]').value;

    if (!name || !surname || !birthdate || !email || !phone || !status) {
        alert("Please fill in all fields!");
        return;
    }

    var quiz = confirm("Are you sure you want to continue?");
    if (quiz == true) {
        alert("The quiz will start in 5 seconds!");
        var countdown = 5;
        var confirmation = document.createElement("p");
        confirmation.textContent = "The quiz will start in " + countdown + " seconds!";
        confirmation.style.fontWeight = "bold";
        confirmation.style.color = "#193a2b";
        confirmation.style.textAlign = "center";

        var start = document.getElementById("information");
        start.appendChild(confirmation);
        var interval = setInterval(function() {
            countdown--;
            console.log(countdown);
            confirmation.textContent = "The quiz will start in " + countdown + " seconds!";
            if (countdown <= 0) {
                clearInterval(interval);
                confirmation.textContent = "The quiz is starting now!";
                document.getElementById("quiz").style.display = "block";
                document.getElementsByTagName("button")[0].style.display = "block";
            
                document.getElementById("information").disabled = true;
                document.querySelector('input[type="button"]').style.display = "none";

            }
        }, 1000);

    } else {
        alert("You will be redirected to the home page!");
        window.location.href = "home.html";
    }
    
}


let attemptCount = 3;

function submitQuiz() {
    let score = 0;
    const q1 = document.querySelector('input[name="question1"]:checked');
    if (q1 && q1.value === "a") {
        score += 4;
    }

    const q2 = document.querySelectorAll('input[name="question2"]:checked');
    q2.forEach(answer => {
        if (answer.value === "a" || answer.value === "b") {
            score += 3;
        } else if (answer.value === "c") {
            score -= 3;
        }
    });

    const q3 = document.querySelector('input[name="question3"]').value.toLowerCase();
    const keywords = ["reduce", "lighten", "facilitate", "optimize", "exploit"];
    if (keywords.some(word => q3.includes(word))) {
        score += 10;
    }

        attemptCount++;
    const resultTable = document.getElementById("result").getElementsByTagName("tbody")[0];
    const newRow = resultTable.insertRow();

    const cellAttempt = newRow.insertCell(0);
    const cellScore = newRow.insertCell(1);

    cellAttempt.textContent = attemptCount;
    cellScore.textContent = `${score}%`;

    alert("Your score: " + score + "%");
}

