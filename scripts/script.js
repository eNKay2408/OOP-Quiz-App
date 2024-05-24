const btnName = document.getElementById("btn-name");
const inputName = document.getElementById("name-input");
const form = document.getElementById("questions");
const btnSubmit = document.getElementById("submit");

document.addEventListener("DOMContentLoaded", () => {
	fetch("./data/data.json")
		.then((response) => response.json())
		.then((data) => addQuestions(data))
		.catch((error) => console.log(error));
});

let countCheck = 0;
let totalCheck = 2;

const addQuestions = (data) => {
	data.forEach((d) => {
		totalCheck++;
		const fieldset = document.createElement("fieldset");
		fieldset.id = `question-${d.id}`;

		const legend = document.createElement("legend");
		legend.innerHTML = `<i class="fa-solid fa-circle-question"></i> ${d.id}) ${d.question}`;
		fieldset.appendChild(legend);

		d.answers.forEach((a) => {
			const label = document.createElement("label");
			label.innerHTML = `
            <input type="radio" name="answer-${d.id}" id="answer-${d.id}${a.id}" class="form-check-input"/>
            ${a.answer}`;
			fieldset.appendChild(label);
		});

		const button = document.createElement("button");
		button.type = "button";
		button.className = "btn btn-primary";
		button.id = `check-${d.id}`;
		button.innerHTML = `
        <i class="fa-regular fa-paper-plane"></i>
        Kiểm tra`;
		button.addEventListener("click", () => {
			const checked = document.querySelector(
				`input[name="answer-${d.id}"]:checked`
			);
			if (checked === null) {
				alert("Vui lòng chọn đáp án cho câu hỏi " + d.id);
			} else {
				if (checked.id === `answer-${d.id}${d.correctAnswer}`) {
					checked.parentElement.style.color = "green";
					button.style.backgroundColor = "green";
					button.disabled = true;
					explanation.style.display = "block";
					countCheck++;
				} else {
					button.style.backgroundColor = "red";
					checked.parentElement.style.color = "red";
				}
			}
		});
		fieldset.appendChild(button);

		const explanation = document.createElement("div");
		explanation.className = "explanation";
		explanation.id = `explanation-${d.id}`;
		explanation.innerHTML = `<p><i class="fa-solid fa-circle-info"></i> Giải thích: ${d.explanation}</p>`;
		explanation.style.display = "none";
		fieldset.appendChild(explanation);

		form.appendChild(fieldset);
	});
};

btnName.addEventListener("click", () => {
	if (inputName.value === "") {
		alert("Vui lòng nhập tên của bạn");
	} else {
		btnName.textContent = `Xin chào ${inputName.value}, cảm ơn bạn đã tham gia nha`;
		btnName.style.backgroundColor = "green";
		btnName.style.color = "white";
		inputName.value = "";
		btnName.disabled = true;
		countCheck++;
	}
});

let haveFile = false;
const memoryInput = document.getElementById("memory-input");
memoryInput.addEventListener("change", () => {
	if (!haveFile) {
		countCheck++;
		haveFile = true;
	}
});

const main = document.getElementsByTagName("main")[0];

btnSubmit.addEventListener("click", () => {
	main.style.opacity = "0.2";
	if (countCheck >= totalCheck) {
		const result = document.getElementById("result-successful");
		result.style.visibility = "visible";
	} else {
		const result = document.getElementById("result-failed");
		result.style.visibility = "visible";
	}
});

const resultBtn = document.querySelectorAll(".result-btn");
resultBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		main.style.opacity = "1";
		const result = document.getElementById("result-successful");
		result.style.visibility = "hidden";
		const resultFailed = document.getElementById("result-failed");
		resultFailed.style.visibility = "hidden";
	});
});
