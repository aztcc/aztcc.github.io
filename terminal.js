// --- Datos de la Terminal ---
        const terminalSteps = [
            {
                prompt: "setoolkit@laboratory-node:~$ ",
                input: "sudo setoolkit",
                output: `
[sudo] password for setoolkit: *******

                  ___________ _____ 
                 /  ___|  ___|_   _|
                 \\ \`--.| |__   | |  
                  \`--. \\  __|  | |  
                 /\\__/ / |____ | |  
                 \\____/\\____/  \\_/  
                                    
         The Social-Engineer Toolkit (SET)
         Version: 8.5.8
         Codename: "Black Rose"

         Written by: David Kennedy (ReL1K)
         Website: https://www.trustedsec.com

   Welcome to the Social-Engineer Toolkit (SET). Your one-stop shop
   for all things social engineering. Please read the disclaimer before
   proceeding.

   Select from the menu:

   1) Social-Engineering Attacks
   2) Penetration Testing (Fast-Track)
   3) Third-Party Modules
   4) Update the Social-Engineer Toolkit
   5) Update SET Configuration
   6) Help, Credits, and About

set> `
            },
            {
                prompt: "set> ",
                input: "1",
                output: `
   Select from the menu:

   1) Spear-Phishing Attack Vectors
   2) Website Attack Vectors
   3) Infectious Media Generator
   4) Create a Payload and Listener
   5) Mass Mailer Attack
   6) Arduino-Based Attack Vector
   7) Wireless Access Point Attack Vector
   8) QRCode Generator Attack Vector
   9) Powershell Attack Vectors
  10) Third-Party Modules

set> `
            },
            {
                prompt: "set> ",
                input: "5",
                output: `
   Social-Engineer Toolkit Mass Mailer Attack Menu:

   1) E-Mail Attack Single Email Address
   2) E-Mail Attack Mass Mailer

set> `
            },
            {
                prompt: "set> ",
                input: "1",
                output: `
[+] Preparing single e-mail campaign...
[-] You can choose to use a Gmail account or your own SMTP.
[+] Select your choice:
   1) Use a Gmail Account
   2) Use a Custom SMTP Server

set> `
            },
            {
                prompt: "set> ",
                input: "2",
                output: `
set:mailer> SMTP Server Address: 127.0.0.1
set:mailer> Port: 25
set:mailer> From Address: alertas@soporte-academico.net
set:mailer> From Name: Seguridad Universitaria
set:mailer> Subject: NOTIFICACIÓN DE SEGURIDAD
set:mailer> Send email to: target_student@alumno.upslp.edu.mx
set:mailer> Do you want to attach a file? [y/n]: n
set:mailer> Send message as: 1) HTML or 2) Plain Text
set:mailer> Option: 1
set:mailer> Enter email body, type 'EOF' on a new line when done:
(Loaded template campaign_template.html...)
set:mailer> EOF
`
            },
            {
                prompt: "set:mailer> ",
                input: "Send",
                output: `
[+] Connect to SMTP server 127.0.0.1 on port 25...
[+] Connected. Authenticating...
[+] Sending simulated email to: target_student@alumno.upslp.edu.mx
[+] Email has been sent successfully.
[+] Mass Mailer finished. Exiting...
setoolkit@laboratory-node:~$ `
            }
        ];

        let currentTerminalStep = 0;

        function renderTerminal() {
            const consoleEl = document.getElementById("terminalConsole");
            let html = "";
            for (let i = 0; i <= currentTerminalStep; i++) {
                const step = terminalSteps[i];
                html += `<div><span class="terminal__prompt">${step.prompt}</span><span class="terminal__input">${step.input}</span></div>`;
                if (i < currentTerminalStep || currentTerminalStep === terminalSteps.length - 1) {
                    html += `<div style="white-space: pre-wrap; color: #a1a1aa; margin-bottom: 10px;">${step.output}</div>`;
                }
            }
            consoleEl.innerHTML = html;
            consoleEl.scrollTop = consoleEl.scrollHeight;

            document.getElementById("btnPrevStep").disabled = currentTerminalStep === 0;
            document.getElementById("btnNextStep").disabled = currentTerminalStep === terminalSteps.length - 1;
            document.getElementById("terminalStepText").textContent = `Paso ${currentTerminalStep + 1} de ${terminalSteps.length}`;
        }

        document.getElementById("btnNextStep").addEventListener("click", () => {
            if (currentTerminalStep < terminalSteps.length - 1) {
                currentTerminalStep++;
                renderTerminal();
            }
        });

        document.getElementById("btnPrevStep").addEventListener("click", () => {
            if (currentTerminalStep > 0) {
                currentTerminalStep--;
                renderTerminal();
            }
        });

        // --- Datos del Inspector de Correos ---
        const emailData = {
            seguridad: {
                fromName: "Seguridad Universitaria",
                fromAddress: "alertas@soporte-academico.net",
                to: "target_student@alumno.upslp.edu.mx",
                subject: "NOTIFICACIÓN DE SEGURIDAD",
                body: `
                    <p>Estimado alumno:</p>
                    <p>Se ha detectado una actividad de inicio de sesión inusual en su cuenta institucional desde una dirección IP fuera de la región. Para evitar la <span class="phish-spot" data-id="urgency">suspensión temporal</span> de sus servicios y cuentas académicas, es obligatorio que vincule su cuenta con nuestro nuevo sistema de verificación en un plazo no mayor a <span class="phish-spot" data-id="deadline">24 horas</span>.</p>
                    <p>Vincule sus servicios haciendo clic en el siguiente enlace:</p>
                    <p style="text-align: center;"><a href="#" class="email-btn-link phish-spot" data-id="link">VALIDAR MI IDENTIDAD Y SERVICIOS</a></p>
                    <p>Si no realiza este procedimiento, su cuenta será desactivada temporalmente de acuerdo con el protocolo de seguridad institucional.</p>
                    <p>Atentamente,<br><span class="phish-spot" data-id="signature">Servicio de Soporte y Seguridad UPSLP</span></p>
                `
            },
            faltas: {
                fromName: "Control Escolar UPSLP",
                fromAddress: "avisos@control-escolar-adm.org",
                to: "target_student@alumno.upslp.edu.mx",
                subject: "ALERTA DE INASISTENCIAS - LÍMITE EXCEDIDO",
                body: `
                    <p>Aviso de Urgencia Académica:</p>
                    <p>Se le notifica que ha superado el porcentaje permitido de inasistencias en una o más asignaturas del presente ciclo escolar. De acuerdo con el reglamento de la Universidad Politécnica de San Luis Potosí, esto conlleva la <span class="phish-spot" data-id="threat">pérdida del derecho a examen ordinario</span>.</p>
                    <p>Usted cuenta con un plazo de <span class="phish-spot" data-id="urgency_time">12 horas</span> para ingresar al portal de aclaraciones y regularizar su situación o agendar una cita con su tutor académico.</p>
                    <p>Ingrese al portal para registrar su justificación:</p>
                    <p style="text-align: center;"><a href="#" class="email-btn-link phish-spot" data-id="link_faltas">ACCEDER AL PORTAL DE ACLARACIONES</a></p>
                    <p>La falta de respuesta en el plazo indicado consolidará el estatus de 'Sin Derecho'.</p>
                    <p>Dirección de Servicios Escolares</p>
                `
            },
            reinscripcion: {
                fromName: "Servicios Escolares UPSLP",
                fromAddress: "reinscripciones@upslp-portal.com",
                to: "target_student@alumno.upslp.edu.mx",
                subject: "NOTIFICACIÓN - IRREGULARIDAD EN REINSCRIPCIÓN",
                body: `
                    <p>Notificación urgente de reinscripción:</p>
                    <p>Hemos detectado una inconsistencia en el registro de su inscripción para el ciclo escolar actual, lo que podría resultar en la <span class="phish-spot" data-id="threat_reinscripcion">suspensión definitiva de sus materias</span> registradas en la plataforma académica.</p>
                    <p>Para validar su estatus e impedir la baja de sus asignaturas, ingrese de manera inmediata a la plataforma oficial de confirmación de datos:</p>
                    <p style="text-align: center;"><a href="#" class="email-btn-link phish-spot" data-id="link_reinscripcion">CONFIRMAR DATOS DE ACCESO Y MATERIAS</a></p>
                    <p>Tiene un plazo límite de <span class="phish-spot" data-id="deadline_reinscripcion">24 horas</span> a partir del recibo de esta comunicación.</p>
                    <p>Departamento de Control Escolar</p>
                `
            }
        };

        const phishIndicators = {
            urgency: {
                title: "Lenguaje de Urgencia",
                desc: "Uso de amenazas como 'suspensión de servicios' diseñado para alterar el estado emocional del receptor y anular su sentido de precaución."
            },
            deadline: {
                title: "Plazo Artificial Ajustado",
                desc: "Establecer límites estrictos de tiempo ('24 horas') incita a tomar decisiones rápidas sin pararse a corroborar el contenido del mensaje."
            },
            link: {
                title: "Enlace Externo / Acortado",
                desc: "El botón redirige a 'bit.ly/upslp-auth'. Los acortadores de URL ocultan el servidor final (ej. un portal clonado en AWS o Azure)."
            },
            signature: {
                title: "Firma Genérica Incompleta",
                desc: "Aunque utiliza siglas conocidas, la firma no contiene un departamento o responsable directo verificable dentro de la estructura de la UPSLP."
            },
            threat: {
                title: "Temor / Amenaza Grave",
                desc: "Amenazar con la 'pérdida de derecho a examen' asusta a cualquier estudiante universitario, facilitando la caída en el engaño."
            },
            urgency_time: {
                title: "Urgencia Extrema",
                desc: "Dar solo '12 horas' genera pánico, impidiendo que el estudiante consulte de manera adecuada con su tutor o en ventanillas."
            },
            link_faltas: {
                title: "Enlace Sospechoso",
                desc: "Direcciona a 'bit.ly/upslp-justifica'. Los trámites de justificación siempre se realizan en persona o dentro de la intranet segura oficial."
            },
            threat_reinscripcion: {
                title: "Consecuencia Desproporcionada",
                desc: "La baja de materias por un supuesto error técnico es una consecuencia demasiado severa para comunicarse informalmente por correo electrónico."
            },
            link_reinscripcion: {
                title: "Redirección SOSPECHOSA",
                desc: "El botón lleva a 'bit.ly/upslp-reinscripcion'. Las confirmaciones de materias nunca solicitan logearse desde ligas de correos."
            },
            deadline_reinscripcion: {
                title: "Límite Operativo Corto",
                desc: "Presión innecesaria basada en el temor de verse afectado administrativamente."
            }
        };

        function switchEmail(type) {
            const data = emailData[type];
            
            // Cambiar botones activos
            document.querySelectorAll(".inspector__tab").forEach(tab => tab.classList.remove("active"));
            
            if (type === "seguridad") document.getElementById("tabEmailSeguridad").classList.add("active");
            if (type === "faltas") document.getElementById("tabEmailFaltas").classList.add("active");
            if (type === "reinscripcion") document.getElementById("tabEmailReinscripcion").classList.add("active");

            // Cabeceras
            const headersHtml = `
                <div><strong>De:</strong> <span class="phish-spot" data-id="sender_${type}">${data.fromName}</span> &lt;${data.fromAddress}&gt;</div>
                <div><strong>Para:</strong> ${data.to}</div>
                <div><strong>Asunto:</strong> ${data.subject}</div>
            `;
            document.getElementById("emailHeadersArea").innerHTML = headersHtml;

            // Cuerpo
            document.getElementById("emailBodyArea").innerHTML = data.body;

            // Restablecer análisis
            resetAnalysisPanel();

            // Configurar listeners para las zonas interactivas
            setupSpotListeners();
        }

        function resetAnalysisPanel() {
            document.getElementById("analysisPlaceholder").style.display = "block";
            document.getElementById("analysisHeader").style.display = "none";
            document.getElementById("analysisContent").style.display = "none";
        }

        function showAnalysis(indicatorId) {
            let indicator = phishIndicators[indicatorId];
            
            // Caso especial para remitentes dinámicos
            if (indicatorId.startsWith("sender_")) {
                const type = indicatorId.split("_")[1];
                let domain = "";
                if (type === "seguridad") domain = "soporte-academico.net";
                if (type === "faltas") domain = "control-escolar-adm.org";
                if (type === "reinscripcion") domain = "upslp-portal.com";

                indicator = {
                    title: "Remitente Externo no UPSLP",
                    desc: `El dominio '${domain}' NO es oficial. Los correos legítimos de la universidad provienen únicamente del dominio institucional '@upslp.edu.mx'.`
                };
            }

            if (!indicator) return;

            document.getElementById("analysisPlaceholder").style.display = "none";
            document.getElementById("analysisHeader").style.display = "flex";
            document.getElementById("analysisContent").style.display = "block";
            
            document.getElementById("analysisTitle").textContent = indicator.title;
            document.getElementById("analysisDescription").textContent = indicator.desc;
        }

        function setupSpotListeners() {
            const spots = document.querySelectorAll(".phish-spot");
            spots.forEach(spot => {
                spot.addEventListener("click", (e) => {
                    e.preventDefault();
                    spots.forEach(s => s.classList.remove("active"));
                    spot.classList.add("active");
                    const id = spot.getAttribute("data-id");
                    showAnalysis(id);
                });

                spot.addEventListener("mouseenter", () => {
                    const id = spot.getAttribute("data-id");
                    showAnalysis(id);
                });
            });
        }



        // --- Inicialización ---
        window.addEventListener("DOMContentLoaded", () => {
            renderTerminal();
            switchEmail("seguridad");
        });