const abcdForm = document.getElementById("abcd");
const freeForm = document.getElementById("free");
const boolForm = document.getElementById("bool");

const hints = [];
let answer_type = "abcd";
let question = "";
let latex = "";
let img = "";
let cetba = "";
let subject = "Český Jazyk";
const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
const answers = [];
let tags = [];

const changeVisibility = (value) => {
  switch (value) {
    case "ABCD":
      abcdForm.style.display = "block";
      freeForm.style.display = "none";
      boolForm.style.display = "none";
      answer_type = "abcd";
      break;
    case "FREE":
      abcdForm.style.display = "none";
      freeForm.style.display = "block";
      boolForm.style.display = "none";
      answer_type = "free_input";
      break;
    case "BOOL":
      abcdForm.style.display = "none";
      freeForm.style.display = "none";
      boolForm.style.display = "block";
      answer_type = "boolean";
      break;
  }
};

const addHint = () => {
  const hintInput = document.getElementById("napoveda");
  const hintValue = hintInput.value.trim();
  hints.push(hintValue);
  hintInput.value = "";
  const hintList = document.getElementById("napovedy-ul");
  const hintItem = document.createElement("li");
  hintItem.textContent = hintValue;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginLeft = "10px";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.padding = "5px";
  deleteButton.addEventListener("click", () => {
    const index = hints.indexOf(hintValue);
    if (index > -1) {
      hints.splice(index, 1);
    }

    hintList.removeChild(hintItem);
  });
  hintItem.appendChild(deleteButton);
  hintList.appendChild(hintItem);
};

const addABCDanswer = () => {
  const answerInput = document.getElementById("ABCD-input");
  const answerValue = answerInput.value;
  const answerCheckbox = document.getElementById("ABCD-checkbox");
  const answerIsCorrect = answerCheckbox.checked;
  answers.push({
    letter: alphabet[answers.length],
    answer: answerValue,
    status: answerIsCorrect ? "correct" : "wrong",
  });
  answerInput.value = "";
  const answerList = document.getElementById("ABCD-ul");
  const answerItem = document.createElement("li");
  answerItem.textContent = `${alphabet[answers.length - 1]}: ${answerValue} (${
    answerIsCorrect ? "correct" : "wrong"
  })`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginLeft = "10px";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.padding = "5px";
  deleteButton.addEventListener("click", () => {
    answers.splice(answers.length - 1, 1);
    answerList.removeChild(answerItem);
  });
  answerItem.appendChild(deleteButton);
  answerList.appendChild(answerItem);
};

const addFreeAnswer = () => {
  const freeAnswerInput = document.getElementById("free_input");
  const freeAnswerValue = freeAnswerInput.value;
  answers.push(freeAnswerValue);
  freeAnswerInput.value = "";
  const freeAnswerList = document.getElementById("free-ul");
  const freeAnswerItem = document.createElement("li");
  freeAnswerItem.textContent = freeAnswerValue;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginLeft = "10px";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.padding = "5px";
  deleteButton.addEventListener("click", () => {
    answers.splice(answers.length - 1, 1);
    freeAnswerList.removeChild(freeAnswerItem);
  });
  freeAnswerItem.appendChild(deleteButton);
  freeAnswerList.appendChild(freeAnswerItem);
};

const changeSubject = (value) => {
  switch (value) {
    case "Matematika":
      subject = "Matematika";
      break;
    case "Český Jazyk":
      subject = "Český Jazyk";
      break;
  }
};

const changeQuestion = (value) => {
  question = value;
};
const changeLatex = (value) => {
  latex = value;
};
const changeImg = (value) => {
  img = value;
};
const changeCetba = (value) => {
  cetba = value;
};

const addBooleanAnswer = () => {
  const booleanAnswerInput = document.getElementById("bool_checkbox");
  const booleanAnswerValue = booleanAnswerInput.checked;
  answers.push(
    { answer: "Ano", status: booleanAnswerValue ? "correct" : "wrong" },
    { answer: "Ne", status: booleanAnswerValue ? "wrong" : "correct" }
  );
};

const addTag = () => {
    const tagInput = document.getElementById("tag_input");
    const tagValue = tagInput.value
    tags.push(tagValue);
    const tagList = document.getElementById("tagy-ul");
    const tagItem = document.createElement("li");
    tagItem.textContent = tagValue;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.padding = "5px";
    deleteButton.addEventListener("click", () => {
      tagList.removeChild(tagItem);
    });
    tagItem.appendChild(deleteButton);
    tagList.appendChild(tagItem);
    tagInput.value = "";
}


const exportToJSON = () => {
    if (!question.trim()) {
      alert("Please enter a question before exporting.");
      return;
    }
  
    const _id = Math.floor(Math.random() * 10000);
  
    const data = [
      {
        "_id": _id,
        "subject": subject,
        "question": question,
        "latex": latex,
        "img": img,
        "cetba": cetba,
        "answer_type": answer_type,
        "answers": answers,
        "hints": hints,
        "tags": tags,
      }
    ];
  
    const jsonString = JSON.stringify(data, null, 2);
    const outputElement = document.getElementById("json-output");
    outputElement.textContent = jsonString;
  };