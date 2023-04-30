import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

let STORAGE_KEY = 'feedback-form-state';

let formData = {};

const refs = {
   form: document.querySelector('.feedback-form'),
   email: document.querySelector('.feedback-form input'),
   message: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onInput, 500));
refs.message.addEventListener('input', throttle(onInput, 500));

// зробити щоб зберігалось message і  email як об'єкт
// отримуємо значення поля
// зберігаємо його у сховище, об'єкт приволимо до строки
// додати throttle

function onInput(evn) {
    // console.log(evn.target.name);
    // console.log(evn.target.value);
    formData[evn.target.name] = evn.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
};

populateForm();

// зупиняємо поведінку за замовчуванням
// прибираемо повідомлення із сховища
// очищуємо форму

function onFormSubmit (evn) {
    evn.preventDefault();
    console.log("Вiдправляємо форму");
    evn.currentTarget.reset();
    formData = {};
    localStorage.removeItem(STORAGE_KEY);
}

// отримуємо значення із сховища, розпарсимо
// якщо там щось було, оновлюємо DOM
// застосовуємо try...catch

function populateForm() {
    try {
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        const parsedSettings = JSON.parse(savedSettings);

        if(parsedSettings) {
            formData = parsedSettings;
            for(const field of refs.form) {
                if(formData[field.name]) {
                    field.value = formData[field.name];
                }
            }
        }
    } catch (error) {
        console.error("Get state error: ", error.message);
    }   
}
// function populateForm() {
//     const savedSettings = localStorage.getItem(STORAGE_KEY);
//     const parsedSettings = JSON.parse(savedSettings);

//     if(parsedSettings) {
//         formData = parsedSettings;
//         refs.email.value = formData["email"] || "";
//         refs.message.value = formData["message"] || "";
//     }

//     for(const input of refs.form) {
//         console.log(input.name + ': ' + input.value)
//     }
// }


