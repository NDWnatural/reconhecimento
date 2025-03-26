async function startCamera() {
  const video = document.getElementById('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  return video;
}

async function runFaceRecognition() {
  const video = await startCamera();
  const model = await blazeface.load();
  console.log("Modelo BlazeFace carregado!");

  setInterval(async () => {
    const predictions = await model.estimateFaces(video, false);
    if (predictions.length > 0) {
      console.log("Rosto detectado:", predictions[0].topLeft, predictions[0].bottomRight);
    }
  }, 100);
}

document.getElementById('registerBtn').addEventListener('click', async () => {
  const cpf = document.getElementById('cpf').value;
  const name = document.getElementById('name').value;

  if (cpf && name) {
    // Envia os dados para o servidor
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, nome: name })
    });

    if (response.ok) {
      alert('Usuário registrado com sucesso!');
      await runFaceRecognition(); // Inicia o reconhecimento facial
    } else {
      alert('Erro ao registrar usuário.');
    }
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

