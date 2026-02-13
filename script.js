const phrases = [
"Hola baby",
"Sabes, hay cosas que siento muy presentes en mi corazón pero suelen ser difíciles de expresar con palabras, en esta ocasión quiero intentarlo de todos modos",
"Cuando estoy contigo, siento que todo se vuelve más bonito",
"No importa que estemos comiendo, viendo una película o solo sentados en el sillón",
"Si es contigo, siento que es el mejor momento del mundo y quisiera que fuera eterno",
"Me enamora cada cosa que haces, tus gestos de cariño, tu forma tan tierna de actuar cuando estás en confianza, incluso tu forma de molestarme",
"Pienso en tí cada día que no nos vemos y cuando nos vemos, añoro que  el momento sea eterno",
"Y es que contigo aprendí que el verdadero amor no solo se trata de sentir mariposas",
"Sino también de hallar paz, complicidad, alegría y buenos momentos juntos",
"Y por sobre todo escogernos el uno al otro tanto en las buenas como en las malas",
"Yo te elijo hoy y siempre baby, y por ese motivo es quisiera preguntarte...",
"¿Quieres ser mi San Valentín?"
];

const gifs = [
"gif1.gif",
"gif2.gif",
"gif3.gif",
"gif4.gif",
"gif5.gif",
"gif6.gif",
"gif7.gif",
"gif8.gif",
"gif9.gif",
"gif10.gif",
"gif11.gif",
"gif12.gif"
];

let index = 0;
let yesSize = 18;

let isTyping = false;
let typingTimeout;

const textElement = document.getElementById("text");
const buttonsDiv = document.getElementById("buttons");
const gif = document.getElementById("gif");

function typeWriter(text, element, speed = 35, callback = null) {

    clearTimeout(typingTimeout);
    element.textContent = "";
    isTyping = true;

    let i = 0;

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(typing, speed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }

    typing();
}


function showPhrase() {

    buttonsDiv.innerHTML = "";

    gif.style.opacity = 0;

    setTimeout(() => {
        gif.src = gifs[index];
        gif.style.opacity = 1;
    }, 200);

    typeWriter(phrases[index], textElement, 35, () => {

        if (index < phrases.length - 1) {
            const nextBtn = document.createElement("button");
            nextBtn.textContent = "...";
            nextBtn.className = "next-btn";
            nextBtn.onclick = () => {
                if (!isTyping) {
                    index++;
                    showPhrase();
                }
            };
            buttonsDiv.appendChild(nextBtn);
        } else {
            createFinalButtons();
        }

    });
}


const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function startConfetti() {

    const pieces = [];
    const colors = ["#ff4d6d", "#28a745", "#87cefa", "#ffd700", "#ffffff"];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += 5;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
        });

        requestAnimationFrame(update);
    }

    update();
}



function createFinalButtons() {

    const finalContainer = document.createElement("div");
    finalContainer.className = "final-buttons";

    const yesBtn = document.createElement("button");
    yesBtn.textContent = "Sí";
    yesBtn.className = "yes-btn";
    yesBtn.style.fontSize = yesSize + "px";

    yesBtn.onclick = () => {
        textElement.textContent = "Gracias baby, sabría que dirías que sí";
        gif.src = "goma_happy.gif";
        buttonsDiv.innerHTML = "";
        startConfetti();
    };

    const noBtn = document.createElement("button");
    noBtn.textContent = "No";
    noBtn.className = "no-btn";

    noBtn.addEventListener("mouseover", () => {

        yesSize += 20;
        yesBtn.style.fontSize = yesSize + "px";

        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 100;

        noBtn.style.position = "relative";
        noBtn.style.left = moveX + "px";
        noBtn.style.top = moveY + "px";
    });

    noBtn.onClick = () => {

        yesSize += 20;
        yesBtn.style.fontSize = yesSize + "px";

        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 100;

        noBtn.style.position = "relative";
        noBtn.style.left = moveX + "px";
        noBtn.style.top = moveY + "px";
    };

    finalContainer.appendChild(yesBtn);
    finalContainer.appendChild(noBtn);

    buttonsDiv.appendChild(finalContainer);
}


showPhrase();

