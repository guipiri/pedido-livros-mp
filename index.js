let formValues = {};
const valoresLivros = [
  [0, 91, 86, 83, 79, 78, 78, 78, 78, 78, 78],
  [0, 112, 108, 105, 103, 103, 103, 103, 103, 103, 103],
  [0, 123, 117, 113, 109, 109, 109, 109, 109, 109, 109],
];

const relation = {
  primeiroAno: valoresLivros[0],
  segundoAno: valoresLivros[1],
  terceiroAno: valoresLivros[1],
  quartoAno: valoresLivros[2],
  quintoAno: valoresLivros[2],
};

function handleChange(e) {
  formValues = {
    ...formValues,
    email: e.target.form[0].value || "",
    aluno: e.target.form[1].value || "",
    turma: e.target.form[2].value || "",
    qty: e.target.form[3].value || "",
  };
  if (formValues.turma) {
    const precoUnitario = relation[formValues.turma][
      formValues.qty
    ].toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const precoTotal =
      relation[formValues.turma][formValues.qty] * formValues.qty;
    formValues = { ...formValues, total: precoTotal };

    document.getElementById("subtotal").innerHTML =
      precoUnitario.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    document.getElementById("total").innerHTML = precoTotal.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

    document.getElementById("qtyPedido").innerHTML = `X ${formValues.qty}`;

    const select = document.getElementById("turma");
    const turmaPedido = select[select.options.selectedIndex].innerHTML;

    document.getElementById("turmaPedido").innerHTML = `Livro ${turmaPedido}`;
  } else {
    document.getElementById("qtyPedido").innerHTML = "X";
    document.getElementById("turmaPedido").innerHTML = "";
    document.getElementById("subtotal").innerHTML = "R$ 0,00";
    cod;
    document.getElementById("total").innerHTML = "R$ 0,00";
  }
}

let fileObj;

function handleImageChange(e) {
  let fr = new FileReader();
  fr.addEventListener("loadend", () => {
    let res = fr.result;
    let spt = res.split("base64,")[1];
    fileObj = {
      base64: spt,
      type: file.files[0].type,
      name: file.files[0].name,
    };
  });
  fr.readAsDataURL(file.files[0]);
}

function handleSubmit(e) {
  e.preventDefault();

  const url =
    "https://script.google.com/macros/s/AKfycbySSdr69bL_JW9i8jXX9bR59hiBWW0DTOp0NTVOfFoDPETBlOYTvNs1DHBGvlOwR4E/exec";
  document.getElementById("loading").classList.toggle("none");
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...fileObj, ...formValues }),
    mode: "no-cors",
  })
    .then((r) => {
      r.text();
      document.getElementById("loading").classList.toggle("none");
      document.getElementsByClassName("divForm")[0].classList.toggle("none");
      document.getElementsByClassName("success")[0].classList.toggle("none");
    })
    .then((r) => {})
    .catch((err) => {
      document.getElementsByClassName("divForm")[0].classList.toggle("none");
      document.getElementsByClassName("error")[0].classList.toggle("none");
    });

  console.log({ ...fileObj, ...formValues });
}

document.getElementById("form").addEventListener("submit", handleSubmit);
document.getElementById("file").addEventListener("change", handleImageChange);
document.getElementById("form").addEventListener("change", handleChange);
