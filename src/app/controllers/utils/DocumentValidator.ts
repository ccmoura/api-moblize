

export default {
  cpf(cpf: string) {
  var numbers, digits, sum, i, result, equal_digits;
  equal_digits = 1;
  if (!cpf || cpf.length < 11)
        return false;
  for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1))
              {
              equal_digits = 0;
              break;
              }
  if (!equal_digits)
        {
        numbers = cpf.substring(0,9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--)
              sum += Number(numbers.charAt(10 - i)) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != Number(digits.charAt(0)))
              return false;
        numbers = cpf.substring(0,10);
        sum = 0;
        for (i = 11; i > 1; i--)
              sum += Number(numbers.charAt(11 - i)) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != Number(digits.charAt(1)))
              return false;
        return true;
        }
    else
          return false;
  },
  cnpj(cnpj: string) {

    if(!cnpj) return false;

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    let size = cnpj.length - 2
    let numbers = cnpj.substring(0,size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != Number(digits.charAt(0)))
        return false;

    size = size + 1;
    numbers = cnpj.substring(0,size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != Number(digits.charAt(1)))
          return false;

    return true;

  }
}
