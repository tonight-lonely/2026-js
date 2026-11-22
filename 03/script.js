// let btns = document.querySelectorAll(".btn-delete")
// const inputs = document.querySelectorAll('.password-input')
// const btnsToggle = document.querySelectorAll('.btn-toggle')


// btns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     btn.parentElement.parentElement.remove();
//   });
// });

// inputs.forEach(input => {
//     input.addEventListener('change', (e) => {
//             const form = e.currentTarget.closest(".password-form");
//             const placeholder = form.querySelector(".placeholder");
//             placeholder.innerHTML = e.currentTarget.value
//     })
// })


// btnsToggle.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//         const form = e.currentTarget.closest(".password-form");
//         const passwordInput = form.querySelector(".password-input")
//         if (passwordInput.type == 'password'){
//             passwordInput.type = 'text'
//         } else {
//             passwordInput.type = 'password'
//         }
//     })
// })

// document.querySelectorAll(".password-form").forEach(form => {
//   const input = form.querySelector(".password-input");
//   const placeholder = form.querySelector(".placeholder");
//   const checkboxes = form.querySelectorAll(".vowels-area input[type='checkbox']");

//   const render = () => {
//     const value = input.value;
//     if (!value) {
//       placeholder.textContent = "здесь будет пароль";
//       return;
//     }


//     const selected = [...checkboxes]
//       .filter(cb => cb.checked)
//       .map(cb => cb.dataset.vowel.toLowerCase());


//     const result = [...value]
//       .map(ch => selected.includes(ch.toLowerCase()) ? "*" : ch)
//       .join("");

//     placeholder.textContent = result;
//   };

//   input.addEventListener("input", render);
//   checkboxes.forEach(cb => cb.addEventListener("change", render));
// });

const addBtn = document.querySelector('.btn-add')
const firstForm = document.querySelector('.password-form')

function renderForm(form){
    const input = form.querySelector('.password-input')
    const placeholder = form.querySelector('.placeholder')
    const checkboxes = form.querySelectorAll(".vowels-area input[type='checkbox']"); 
    const togBtn = form.querySelector(".btn-toggle")
    const delBtn = form.querySelector(".btn-delete")

    function update(){
        let text = input.value
        if (!text){
            placeholder.textContent = 'здесь будет пароль'
            return
        }
        const selected = [...checkboxes]
            .filter(cb => cb.checked)
            .map(cb => cb.dataset.vowel.toLowerCase());
        
        placeholder.textContent = [...text]
            .map(ch => selected.includes(ch.toLowerCase()) ? '*' : ch)
            .join('');
    }



    


    input.addEventListener('input', update)
    checkboxes.forEach(cb => cb.addEventListener('change', update));
    togBtn.addEventListener('click', () => {
        if (input.type == 'password'){
            input.type = 'text'
        } else if (input.type == 'text'){
            input.type = 'password'
        }
    })
    delBtn.addEventListener('click', () => {
        form.remove()
    })
}

renderForm(firstForm)


addBtn.addEventListener('click', () => {
    const cloneForm = firstForm.cloneNode(true);   

    const input = cloneForm.querySelector('.password-input');
    input.value = '';
    input.type = 'password';                   

    cloneForm.querySelector('.placeholder').textContent = 'здесь будет пароль';

    cloneForm.querySelectorAll(".vowels-area input[type='checkbox']")
        .forEach(cb => cb.checked = false);

    firstForm.parentElement.append(cloneForm);

    renderForm(cloneForm);
});