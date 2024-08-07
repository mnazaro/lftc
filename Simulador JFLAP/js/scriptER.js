const testStringInput = document.getElementById('test-string'); //faz a função de pegar o elemento pelo id

testStringInput.addEventListener('input', function() {
    const regexInput = document.getElementById('regex').value;
    const testString = testStringInput.value;
    
   if(regexInput.trim() === "") { 
        testStringInput.classList.remove('input-true', 'input-false');
        return;
    } //verifica se o vazio pertence ou não a expressão regular | verde para true e vermelho para false

    try {
        const regex = new RegExp(regexInput);
        const isMatch = regex.test(testString);

        testStringInput.classList.remove('input-true', 'input-false');
        if (isMatch) {
            testStringInput.classList.add('input-true');
        } else {
            testStringInput.classList.add('input-false');
        }
    } catch (error) {
        testStringInput.classList.remove('input-true', 'input-false');
    } //o try-catch serve para verificar se a expressão é válida ou não | verde para true e vermelho para false
}
);
