console.log("Bienvenue sur Kayy Reviser 🚀");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    }

});

if (backToTop) {
    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}
// ===== MOTEUR DE QUIZ =====

// ===== MOTEUR DE QUIZ =====

const quizData = {

    math: [

        {
            question: "La dérivée de x² est :",
            answers: ["x", "2x", "x²", "2"],
            correct: 1
        },

        {
            question: "La limite de 1/x lorsque x → +∞ est :",
            answers: ["1", "0", "+∞", "-∞"],
            correct: 1
        }

    ],

    pc: [

        {
            question: "L'unité de la force est :",
            answers: ["Joule", "Pascal", "Newton", "Volt"],
            correct: 2
        }

    ]

};

// =======================

const cards = document.querySelectorAll("[data-subject]");

const quizContainer = document.getElementById("quiz-container");

const question = document.getElementById("question");

const answers = document.getElementById("answers");

const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");

const nextBtn = document.getElementById("next-btn");

const restartBtn = document.getElementById("restart-btn");

let currentQuiz = [];

let currentQuestion = 0;

let score = 0;

// =======================

cards.forEach(card => {

    card.addEventListener("click", (e) => {

        e.preventDefault();

        const subject = card.dataset.subject;

        if (!quizData[subject]) {

            alert("Ce quiz sera bientôt disponible.");

            return;

        }

        currentQuiz = quizData[subject];

        currentQuestion = 0;

        score = 0;

        document.querySelector(".chapters").style.display = "none";

        quizContainer.style.display = "block";

        nextBtn.style.display = "none";

        restartBtn.style.display = "none";

        showQuestion();

    });

});

// =======================

function showQuestion() {

    progress.textContent =
        `Question ${currentQuestion + 1} / ${currentQuiz.length}`;
        const percent =
((currentQuestion + 1) / currentQuiz.length) * 100;

progressFill.style.width = percent + "%";

    const q = currentQuiz[currentQuestion];

    question.textContent = q.question;

    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "btn-secondary";

        button.style.margin = "10px";

        button.textContent = answer;

        button.onclick = () => checkAnswer(index);

        answers.appendChild(button);

    });

}

// =======================

function checkAnswer(index) {

    const buttons = answers.querySelectorAll("button");

    buttons.forEach((button, i) => {

        button.disabled = true;

        if (i === currentQuiz[currentQuestion].correct) {

            button.style.background = "#22C55E";
            button.style.color = "white";

        } else if (i === index) {

            button.style.background = "#EF4444";
            button.style.color = "white";

        }

    });

    if (index === currentQuiz[currentQuestion].correct) {

        score++;

    }

    nextBtn.style.display = "inline-block";

}

// =======================

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    nextBtn.style.display = "none";

    if (currentQuestion < currentQuiz.length) {

        showQuestion();

    } else {

        progress.textContent = "";

        let message = "";

        if (score === currentQuiz.length) {

            message = "🏆 Excellent !";

        } else if (score >= currentQuiz.length / 2) {

            message = "👏 Bon travail !";

        } else {

            message = "📚 Continue tes révisions.";

        }

        question.textContent =
            `${message} Score : ${score}/${currentQuiz.length}`;

        answers.innerHTML = "";
        progressFill.style.width = "100%";

        restartBtn.style.display = "inline-block";

    }

});

// =======================

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    restartBtn.style.display = "none";

    nextBtn.style.display = "none";

    showQuestion();

});