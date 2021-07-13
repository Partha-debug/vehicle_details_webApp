const btn = document.getElementById("btn");
const inputField = document.getElementById("inp");
const outputDiv = document.getElementById("output");
const opUl = document.createElement("ul");
opUl.style.listStyleType = "none";
opUl.style.borderRadius = "5%";
opUl.style.padding = "2em";

btn.addEventListener("click", () => {
  opUl.innerHTML = "";
  outputDiv.innerHTML = "";
  let liLoading = document.createElement("li");
  liLoading.innerHTML = `<b>Loading...</b>`;
  opUl.appendChild(liLoading);
  opUl.style.backgroundColor = "rgba(20, 100, 200, 0.3)";
  outputDiv.appendChild(opUl);

  fetch(`./server.py?num=${inputField.value}`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(res.status);
    })
    .then((data) => {
      opUl.innerHTML = "";
      outputDiv.innerHTML = "";
      for (const item of Object.keys(data)) {
        if (data[item] === 0) {
          throw new Error(
            "Please check your searched number and internet connection and try again!"
          );
        } else {
          if (data[item].trim().length === 1) data[item] = "  Not found!  ";
          let li = document.createElement("li");
          li.innerHTML = `<b><i>${item}</i></b> :  ${data[item]}`;
          opUl.appendChild(li);
        }
      }
      opUl.style.backgroundColor = "rgba(20, 250, 100, 0.3)";
      outputDiv.appendChild(opUl);
    })
    .catch((err) => {
      opUl.innerHTML = "";
      outputDiv.innerHTML = "";
      let liError1 = document.createElement("li");
      let liError2 = document.createElement("li");
      liError1.innerHTML = `<b>Some error occured:</b>`;
      liError2.innerHTML = err;
      opUl.style.backgroundColor = "rgba(250, 50, 70, 0.3)";
      opUl.appendChild(liError1);
      opUl.appendChild(liError2);
      outputDiv.appendChild(opUl);
    });
});
