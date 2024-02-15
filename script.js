let currentQuestionIndex = 0;
const questionContainer = document.querySelector('#questionContainer');
let config;

// Функция для загрузки конфигурации из файла JSON
async function loadConfig() {
  const response = await fetch('./config.json');
  config = await response.json();  
  initQuestionnaire(); 
}

// Функция для отображения вопроса и вариантов ответов
const questionBox=(question)=> {
  questionContainer.innerHTML = `<b>${question.question}</b>`;

  if (question.answers) {
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.value;
      button.onclick = () => handleAnswer(answer);
      questionContainer.append(button);
    });
  } else {
    questionContainer.innerHTML += '<p>No more questions.</p>';
  }
}

// Функция инициализации анкеты (показ первого вопроса)
const initQuestionnaire=()=> {
  //currentQuestionIndex = 0;
  questionBox(config.questions[currentQuestionIndex]);
}

// Функция для поиска вопроса по его идентификатору
const findQuestionId=(questionId)=> {
  return config.questions.find(question => question.questionId === questionId);
}

// Функция обработки ответа
const handleAnswer=(answer)=> {

 const nextQuestion = answer.nextQuestionId ? findQuestionId(answer.nextQuestionId) : null; 
  if (nextQuestion) {
    questionBox(nextQuestion);
  } else if (config.questions[currentQuestionIndex + 1]) {
    questionBox(config.questions[++currentQuestionIndex]);
  } else {
    alert('End of the questionnaire!');
  }
}

// Функция для перехода к следующему вопросу (вызывается при нажатии на кнопку "Next")
const getNextQuestion=()=> {
  if (currentQuestionIndex < config.questions.length - 1) {
    currentQuestionIndex++;
    const currentQuestion = config.questions[currentQuestionIndex];
    if (currentQuestion.answers) {
      questionBox(currentQuestion);
    } else {
      console.log("No more questions");
      questionContainer.innerHTML = '<p>No more questions.</p>';
    }
  } else {
    alert('End of the questionnaire!');
  }
}

loadConfig();
